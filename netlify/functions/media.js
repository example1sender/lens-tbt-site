/* =====================================================================
   Netlify Function — Media store (Netlify Blobs)
   --------------------------------------------------------------------
   POST /.netlify/functions/media        { dataUrl, name? }  -> { url, id }
        Stores an image server-side in Netlify Blobs and returns a stable
        URL that works on EVERY device. No external account, no API token,
        no setup. (Netlify Blobs is built in and auto-configured.)

   GET  /.netlify/functions/media?id=ID  -> the image bytes (cached 1y)

   Optional protection: if ADMIN_KEY is set in the environment, POST must
   send header  x-admin-key: <ADMIN_KEY>.  If ADMIN_KEY is unset, uploads
   are open (zero-setup mode) — matching the previous behaviour.
   ===================================================================== */
const crypto = require("crypto");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-admin-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };

  let getStore;
  try { ({ getStore } = await import("@netlify/blobs")); }
  catch (e) { return json(500, { error: "blobs_unavailable", message: "Netlify Blobs not available in this context." }); }

  let store;
  try { store = getStore("tlp-media", { siteID: process.env.SITE_ID, token: process.env.NETLIFY_API_TOKEN }); }
  catch (e) { return json(500, { error: "blobs_init", message: String(e && e.message || e) }); }

  /* ---- list all uploaded images (for the admin Media Library) ---- */
  if (event.httpMethod === "GET" && (event.queryStringParameters || {}).list) {
    try {
      const res = await store.list();
      const items = (res && res.blobs ? res.blobs : []).map(function (b) {
        return { id: b.key, url: "/.netlify/functions/media?id=" + encodeURIComponent(b.key) };
      });
      return json(200, { items: items });
    } catch (e) { return json(200, { items: [] }); }
  }

  /* ---- serve an image ---- */
  if (event.httpMethod === "GET") {
    const id = (event.queryStringParameters || {}).id;
    if (!id) return json(400, { error: "missing_id" });
    try {
      const res = await store.getWithMetadata(id, { type: "arrayBuffer" });
      if (!res || !res.data) return { statusCode: 404, headers: CORS, body: "Not found" };
      const ct = (res.metadata && res.metadata.contentType) || "image/jpeg";
      return {
        statusCode: 200,
        headers: Object.assign({}, CORS, {
          "Content-Type": ct,
          "Cache-Control": "public, max-age=31536000, immutable"
        }),
        body: Buffer.from(res.data).toString("base64"),
        isBase64Encoded: true
      };
    } catch (e) { return { statusCode: 404, headers: CORS, body: "Not found" }; }
  }

  /* ---- store an image ---- */
  if (event.httpMethod === "POST") {
    const ADMIN_KEY = process.env.ADMIN_KEY;
    if (ADMIN_KEY) {
      const key = event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
      if (key !== ADMIN_KEY) return json(401, { error: "unauthorized", message: "Invalid admin key." });
    }
    let body;
    try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }
    const m = /^data:([^;]+);base64,(.*)$/.exec(body.dataUrl || "");
    if (!m) return json(400, { error: "bad_data_url", message: "Expected a base64 data URL." });
    const contentType = m[1];
    let buf;
    try { buf = Buffer.from(m[2], "base64"); } catch (e) { return json(400, { error: "decode_failed" }); }
    if (!buf.length) return json(400, { error: "empty" });
    if (buf.length > 9 * 1024 * 1024) return json(413, { error: "too_large", message: "Image exceeds 9 MB after processing." });

    const ext = ((contentType.split("/")[1] || "jpg").replace("+xml", "").replace("jpeg", "jpg")).slice(0, 5);
    const id = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 20) + "." + ext;
    try { await store.set(id, buf, { metadata: { contentType } }); }
    catch (e) { return json(500, { error: "store_failed", message: String(e && e.message || e) }); }
    return json(200, { url: "/.netlify/functions/media?id=" + encodeURIComponent(id), id });
  }

  return json(405, { error: "method_not_allowed" });
};

function json(statusCode, obj) {
  return { statusCode, headers: Object.assign({}, CORS, { "Content-Type": "application/json" }), body: JSON.stringify(obj) };
}
