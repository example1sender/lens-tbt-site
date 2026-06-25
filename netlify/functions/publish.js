/* =====================================================================
   Netlify Function — Publish site settings (Netlify Blobs)
   --------------------------------------------------------------------
   POST /.netlify/functions/publish   { key, images, text }  -> { ok:true }
        Saves the live settings (image URLs + text) so every visitor on
        every device sees them. Stored in Netlify Blobs — no Netlify API
        token, no Forms, no redeploy.

   Protection: if ADMIN_KEY is set, the posted "key" must match it.
   (If ADMIN_KEY is unset, publishing is open — zero-setup mode.)

   Read back by /.netlify/functions/settings (GET).
   ===================================================================== */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-admin-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") return json(405, { error: "method_not_allowed" });

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }

  const ADMIN_KEY = process.env.ADMIN_KEY;
  const sent = body.key || event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
  if (ADMIN_KEY && sent !== ADMIN_KEY) return json(401, { error: "unauthorized", message: "Invalid admin key." });

  let getStore;
  try { ({ getStore } = await import("@netlify/blobs")); }
  catch (e) { return json(500, { error: "blobs_unavailable" }); }

  const payload = {
    images: (body.images && typeof body.images === "object") ? body.images : {},
    text: (body.text && typeof body.text === "object") ? body.text : {},
    galleries: (body.galleries && typeof body.galleries === "object") ? body.galleries : {},
    updated: new Date().toISOString()
  };

  var SITE_ID = process.env.SITE_ID, BLOB_TOKEN = process.env.NETLIFY_API_TOKEN, mode = "auto";
  async function save() {
    try { await getStore("tlp-settings").setJSON("current", payload); }
    catch (e1) {
      mode = "manual";
      await getStore({ name: "tlp-settings", siteID: SITE_ID, token: BLOB_TOKEN }).setJSON("current", payload);
    }
  }
  try {
    await save();
  } catch (e) {
    return json(500, { error: "store_failed", v: "creds3", hasSite: !!SITE_ID, hasToken: !!BLOB_TOKEN, message: String(e && e.message || e) });
  }
  return json(200, { ok: true, v: "creds3", mode: mode, updated: payload.updated });
};

function json(statusCode, obj) {
  return { statusCode, headers: Object.assign({}, CORS, { "Content-Type": "application/json" }), body: JSON.stringify(obj) };
}
