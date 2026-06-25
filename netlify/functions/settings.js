/* =====================================================================
   Netlify Function — Live site settings (Netlify Blobs)
   GET /.netlify/functions/settings -> { images:{...}, text:{...} }

   Returns the most recently PUBLISHED settings (written by publish.js
   into Netlify Blobs) so every page, on every device, shows the same
   content. No Netlify API token, no Forms — just Blobs.

   Backwards compatible: if no Blob has been published yet, returns an
   empty object and the site falls back to assets/js/published.json.
   ===================================================================== */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };

  const empty = JSON.stringify({ images: {}, text: {} });

  let getStore;
  try { ({ getStore } = await import("@netlify/blobs")); }
  catch (e) { return { statusCode: 200, headers: CORS, body: empty }; }

  try {
    const store = getStore("tlp-settings", { siteID: process.env.SITE_ID, token: process.env.NETLIFY_API_TOKEN });
    const data = await store.get("current", { type: "json" });
    if (!data || typeof data !== "object") return { statusCode: 200, headers: CORS, body: empty };
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ images: data.images || {}, text: data.text || {}, galleries: data.galleries || {} }) };
  } catch (e) {
    return { statusCode: 200, headers: CORS, body: empty };
  }
};
