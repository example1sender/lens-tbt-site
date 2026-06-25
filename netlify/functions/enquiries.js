/* =====================================================================
   Netlify Function — Enquiries API for the in-admin dashboard
   GET    /.netlify/functions/enquiries        → list all form submissions
   DELETE /.netlify/functions/enquiries?id=ID  → delete one submission

   Security: requires header  x-admin-key  to equal the ADMIN_KEY env var.
   Uses NETLIFY_API_TOKEN (a Netlify personal access token) server-side
   only — it is never exposed to the browser. SITE_ID is provided by
   Netlify automatically at runtime.

   Required environment variables (Site configuration → Environment variables):
     NETLIFY_API_TOKEN = your Netlify personal access token
     ADMIN_KEY         = a secret you choose (use your admin password)
   ===================================================================== */
exports.handler = async function (event) {
  var cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "x-admin-key, content-type",
    "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };

  var TOKEN = process.env.NETLIFY_API_TOKEN;
  var ADMIN_KEY = process.env.ADMIN_KEY;
  var SITE_ID = process.env.SITE_ID;

  if (!TOKEN || !ADMIN_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "not_configured",
      message: "Set NETLIFY_API_TOKEN and ADMIN_KEY in Site configuration → Environment variables, then redeploy." }) };
  }

  var key = event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
  if (key !== ADMIN_KEY) {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "unauthorized", message: "Invalid admin key." }) };
  }

  var API = "https://api.netlify.com/api/v1";
  var auth = { Authorization: "Bearer " + TOKEN };

  try {
    if (event.httpMethod === "DELETE") {
      var id = (event.queryStringParameters || {}).id;
      if (!id) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "missing_id" }) };
      var del = await fetch(API + "/submissions/" + encodeURIComponent(id), { method: "DELETE", headers: auth });
      return { statusCode: del.ok ? 200 : del.status, headers: cors, body: JSON.stringify({ ok: del.ok }) };
    }

    var res = await fetch(API + "/sites/" + SITE_ID + "/submissions?per_page=200", { headers: auth });
    if (!res.ok) {
      return { statusCode: res.status, headers: cors, body: JSON.stringify({ error: "netlify_api", status: res.status,
        message: res.status === 401 ? "Token rejected — check NETLIFY_API_TOKEN." : "Netlify API error." }) };
    }
    var subs = await res.json();
    var out = (subs || []).map(function (s) {
      var d = s.data || {};
      return {
        id: s.id,
        form: s.form_name,
        date: s.created_at,
        name: s.name || d.name || "",
        email: s.email || d.email || "",
        phone: d.phone || "",
        service: d.service || "",
        eventDate: d.date || "",
        studio: d.studio || "",
        message: d.message || ""
      };
    });
    return { statusCode: 200, headers: cors, body: JSON.stringify(out) };
  } catch (e) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "exception", message: String(e) }) };
  }
};
