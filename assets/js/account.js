/* =========================================================
   Liora Bioinformatics — downloads page handler
   Talks to the liora-accounts API (separate repo) with a
   session cookie. There are no stored accounts: the server
   keeps the email only for the session (max 30 days). Sign-in is by email link: the link opens
   /downloads#token=…, which is in the fragment so it never
   reaches a server log, and is redeemed here with a POST so
   email link scanners can't use it up.
   ========================================================= */
(function () {
  "use strict";

  // GitHub Pages can't send frame-ancestors, so refuse to run framed
  // (clickjacking).
  if (window.top !== window.self) {
    document.documentElement.innerHTML = "";
    return;
  }

  var host = location.hostname;
  var API = (host === "127.0.0.1" || host === "localhost")
    ? "http://127.0.0.1:5000"
    : "https://account.liora-bioinformatics.com";

  function lang() {
    return document.documentElement.getAttribute("lang") === "de" ? "de" : "en";
  }

  var T = {
    en: {
      sending: "Sending…",
      required: "Please fill in this field.",
      email: "Please enter a valid email address, e.g. jane.doe@example.com.",
      tooMany: "Too many attempts. Please wait a minute and try again.",
      err: "Something went wrong. Please try again, or email us at info@liora-bioinformatics.com.",
      offline: "The download server can't be reached right now. Please try again later.",
      badLink: "This sign-in link has expired or was already used. Enter your email to get a new one.",
      none: "There are no downloads for you yet.",
      groupAll: "Downloads",
      groupOther: "Exclusive: ",
      download: "Download",
      checksum: "SHA-256"
    },
    de: {
      sending: "Wird gesendet…",
      required: "Bitte füllen Sie dieses Feld aus.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. max.mustermann@example.com.",
      tooMany: "Zu viele Versuche. Bitte warten Sie eine Minute und versuchen Sie es erneut.",
      err: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns an info@liora-bioinformatics.com.",
      offline: "Der Download-Server ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.",
      badLink: "Dieser Anmeldelink ist abgelaufen oder wurde bereits verwendet. Geben Sie Ihre E-Mail-Adresse ein, um einen neuen zu erhalten.",
      none: "Für Sie gibt es noch keine Downloads.",
      groupAll: "Downloads",
      groupOther: "Exklusiv: ",
      download: "Herunterladen",
      checksum: "SHA-256"
    }
  };
  function t(key) { return (T[lang()] || T.en)[key]; }

  function api(method, path, body) {
    var opts = { method: method, credentials: "include", headers: { "Accept": "application/json" } };
    if (body !== undefined) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
    return fetch(API + path, opts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        return { status: res.status, data: data };
      });
    });
  }

  function formatSize(bytes) {
    var units = ["B", "KB", "MB", "GB"];
    var i = 0;
    while (bytes >= 1024 && i < units.length - 1) { bytes /= 1024; i++; }
    return (i ? bytes.toFixed(1) : bytes) + " " + units[i];
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var $ = function (id) { return document.getElementById(id); };
    var views = { signin: $("dl-signin"), sent: $("dl-sent"), account: $("dl-account"), offline: $("dl-offline") };
    var retry = $("dl-retry");
    var form = $("login-form");
    var loginBtn = $("login-btn");
    var filesData = null;

    function show(name) {
      Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    }

    function status(id, msg, kind) {
      var s = $(id);
      s.textContent = msg || "";
      s.className = "form-status" + (msg ? " show " + (kind || "") : "");
    }

    function signin(msg, kind) {
      show("signin");
      status("login-status", msg, kind);
    }

    // Server down (network error, or nginx answering 502/503/504 because the
    // app is stopped): hide the sign-in form rather than let people fill it in.
    function offline() {
      show("offline");
      retry.disabled = false;
    }

    // ---- file list (rebuilt on language switch) ----
    function renderFiles() {
      var box = $("dl-files");
      box.textContent = "";
      if (!filesData) return;
      if (!filesData.length) {
        box.appendChild(el("p", "dl-empty", t("none")));
        return;
      }
      filesData.forEach(function (group) {
        var card = el("div", "form-card dl-group");
        card.appendChild(el("h3", null, group.group === "all" ? t("groupAll") : t("groupOther") + group.group));
        var list = el("ul", "dl-list");
        group.files.forEach(function (f) {
          var li = el("li");
          var info = el("div", "dl-info");
          info.appendChild(el("span", "dl-name", f.path));
          info.appendChild(el("span", "dl-meta",
            formatSize(f.size) + " · " + new Date(f.modified * 1000).toLocaleDateString(lang())));
          if (f.sha256) {
            var sum = el("code", "dl-sum", t("checksum") + " " + f.sha256);
            info.appendChild(sum);
          }
          var a = el("a", "btn btn-primary", t("download"));
          a.href = API + f.url;
          a.setAttribute("download", "");
          li.appendChild(info);
          li.appendChild(a);
          list.appendChild(li);
        });
        card.appendChild(list);
        box.appendChild(card);
      });
    }
    document.addEventListener("liora:langchange", renderFiles);

    function showAccount(user) {
      $("dl-user").textContent = user.email;
      status("account-status", "");
      show("account");
      api("GET", "/api/files").then(function (r) {
        if (r.status === 401) return signin();
        filesData = r.data.groups || [];
        renderFiles();
      }).catch(function () { status("account-status", t("offline"), "err"); });
    }

    // ---- start: redeem a link, or check for an existing session ----
    function redeem() {
      var m = location.hash.match(/token=([A-Za-z0-9_-]+)/);
      if (!m) return false;
      api("POST", "/api/verify", { token: m[1] }).then(function (r) {
        // Server down: keep the token in the URL so "Try again" can still use it.
        if (r.status >= 500) return offline();
        history.replaceState(null, "", location.pathname + location.search);
        if (r.status === 200) return showAccount(r.data);
        // A used or expired link is only an error if there's no session
        // either; clicking the link again while signed in just shows the files.
        return api("GET", "/api/me").then(function (me) {
          if (me.status === 200) showAccount(me.data);
          else signin(t("badLink"), "err");
        });
      }).catch(offline);
      return true;
    }

    function start() {
      retry.disabled = true;
      if (redeem()) return;
      api("GET", "/api/me").then(function (r) {
        if (r.status >= 500) offline();
        else if (r.status === 200) showAccount(r.data);
        else signin();
      }).catch(offline);
    }

    // The link pasted into a tab already showing /downloads only changes the
    // fragment, which doesn't reload the page.
    window.addEventListener("hashchange", redeem);
    retry.addEventListener("click", start);
    start();

    // ---- sign-in form ----
    // Validation messages in the page language, as on the contact form.
    form.addEventListener("invalid", function (e) {
      var f = e.target;
      f.setCustomValidity("");
      if (f.validity.valueMissing) f.setCustomValidity(t("required"));
      else if (f.validity.typeMismatch) f.setCustomValidity(t("email"));
    }, true);
    form.addEventListener("input", function (e) { e.target.setCustomValidity(""); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var email = $("dl-email").value.trim();
      loginBtn.disabled = true;
      status("login-status", t("sending"), "ok");
      api("POST", "/api/login", { email: email, lang: lang() }).then(function (r) {
        if (r.status === 200) {
          $("dl-sent-email").textContent = email;
          status("login-status", "");
          show("sent");
        } else if (r.status === 400) {
          status("login-status", t("email"), "err");
        } else if (r.status === 429) {
          status("login-status", t("tooMany"), "err");
        } else if (r.status >= 500) {
          offline();
        } else {
          status("login-status", t("err"), "err");
        }
      }).catch(offline).then(function () { loginBtn.disabled = false; });
    });

    $("dl-restart").addEventListener("click", function () {
      form.reset();
      signin();
      $("dl-email").focus();
    });

    // ---- sign out: deletes the session, and with it the email, on the server ----
    $("dl-logout").addEventListener("click", function () {
      api("POST", "/api/logout", {}).then(function () {
        filesData = null;
        renderFiles();
        signin();
      }).catch(function () { status("account-status", t("offline"), "err"); });
    });
  });
})();
