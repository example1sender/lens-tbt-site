/* =====================================================================
   The Lens Perspective Photography — lightweight admin auth (demo-grade)
   ---------------------------------------------------------------------
   This is a CLIENT-SIDE gate for the demo only. The password is stored
   as a SHA-256 hash (not plain text), but anyone technical can bypass a
   front-end-only check. For real protection use your host's password
   protection (e.g. Netlify "Visitor access" / Identity) or a backend.

   DEFAULT LOGIN  ->  username: admin   password: LensePerspective@2026
   To change the password:
     1. Pick a new password.
     2. Get its SHA-256 hash (e.g. run in any terminal:
          printf '%s' 'YOUR_NEW_PASSWORD' | sha256sum )
     3. Paste the hex into PASS_HASH below. (Optionally change USER too.)
   ===================================================================== */
(function () {
  "use strict";

  var USER = "admin";
  // SHA-256 of "LensePerspective@2026"
  var PASS_HASH = "5ca14ced415baa24328bf71c03c336437b188d8e2c69a8b3a8dfedbe501e8057";
  var SKEY = "tlp_admin_auth";

  async function sha256(str) {
    if (!(window.crypto && window.crypto.subtle)) {
      throw new Error("insecure-context");
    }
    var data = new TextEncoder().encode(str);
    var buf = await window.crypto.subtle.digest("SHA-256", data);
    return Array.prototype.map.call(new Uint8Array(buf), function (b) {
      return ("0" + b.toString(16)).slice(-2);
    }).join("");
  }

  window.TLP_AUTH = {
    isAuthed: function () {
      try { return sessionStorage.getItem(SKEY) === "1"; } catch (e) { return false; }
    },
    // Call at the top of any protected page.
    requireAuth: function () {
      if (!this.isAuthed()) { location.replace("login.html"); }
    },
    // Returns a Promise<boolean>.
    login: function (user, pass) {
      var self = this;
      return sha256(String(pass)).then(function (hash) {
        if (user === USER && hash === PASS_HASH) {
          try { sessionStorage.setItem(SKEY, "1"); sessionStorage.setItem("tlp_admin_key", String(pass)); } catch (e) {}
          return true;
        }
        return false;
      });
    },
    logout: function () {
      try { sessionStorage.removeItem(SKEY); sessionStorage.removeItem("tlp_admin_key"); } catch (e) {}
      location.replace("login.html");
    }
  };
})();
