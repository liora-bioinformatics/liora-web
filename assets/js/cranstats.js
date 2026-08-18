/* =========================================================
   Liora Bioinformatics — CRAN download statistics
   Pulls public download counts from the cranlogs service
   (cranlogs.r-pkg.org) client-side and renders them into
   any element with class "cran-stats" and a data-package
   attribute. Figures reflect the RStudio/Posit CRAN mirror.
   ========================================================= */
(function () {
  "use strict";

  var BASE = "https://cranlogs.r-pkg.org/downloads";
  var CACHE = "cranlogs:";

  function iso(d) { return d.toISOString().slice(0, 10); }
  function today() { return iso(new Date()); }
  function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return iso(d); }

  function lang() {
    try { return localStorage.getItem("liora-lang") || "en"; } catch (e) { return "en"; }
  }
  function fmt(n) {
    try { return Number(n).toLocaleString(lang() === "de" ? "de-DE" : "en-US"); }
    catch (e) { return String(n); }
  }

  function getJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); });
  }

  function load(pkg) {
    var key = CACHE + pkg + ":" + today();
    try { var c = localStorage.getItem(key); if (c) return Promise.resolve(JSON.parse(c)); } catch (e) {}
    var end = today();
    return Promise.all([
      getJSON(BASE + "/total/2013-01-01:" + end + "/" + pkg),
      getJSON(BASE + "/daily/" + daysAgo(365) + ":" + end + "/" + pkg)
    ]).then(function (res) {
      var total = (res[0] && res[0][0] && res[0][0].downloads) || 0;
      var days = (res[1] && res[1][0] && res[1][0].downloads) || [];
      var data = { total: total, days: days };
      try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
      return data;
    });
  }

  function tail(days, n) {
    var s = 0;
    for (var i = Math.max(0, days.length - n); i < days.length; i++) s += days[i].downloads || 0;
    return s;
  }

  function byMonth(days) {
    var m = {};
    days.forEach(function (d) { var k = (d.day || "").slice(0, 7); if (k) m[k] = (m[k] || 0) + (d.downloads || 0); });
    return Object.keys(m).sort().map(function (k) { return m[k]; });
  }

  function sparkline(vals) {
    if (!vals.length) return "";
    var w = 300, h = 50, pad = 3;
    var max = Math.max.apply(null, vals) || 1;
    var step = (w - pad * 2) / Math.max(1, vals.length - 1);
    var pts = vals.map(function (v, i) {
      var x = pad + i * step;
      var y = h - pad - (v / max) * (h - pad * 2);
      return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    });
    var line = pts.join(" ");
    var lastX = (pad + (vals.length - 1) * step).toFixed(1);
    var area = line + " L" + lastX + " " + (h - pad) + " L" + pad + " " + (h - pad) + " Z";
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
      '<path class="spark-area" d="' + area + '"/>' +
      '<path class="spark-line" d="' + line + '"/></svg>';
  }

  function render(root, data) {
    var days = data.days || [];
    var set = function (k, v) { var el = root.querySelector('[data-stat="' + k + '"]'); if (el) el.textContent = v; };
    set("total", fmt(data.total));
    set("m", fmt(tail(days, 30)));
    set("w", fmt(tail(days, 7)));
    var sp = root.querySelector('[data-stat="spark"]');
    if (sp) sp.innerHTML = sparkline(byMonth(days));
    root.classList.add("is-loaded");
  }

  function fail(root) {
    root.classList.add("is-error");
    var note = root.querySelector(".cran-err");
    if (!note) { note = document.createElement("div"); note.className = "cran-err"; root.appendChild(note); }
    note.textContent = lang() === "de"
      ? "Live-Download-Daten sind derzeit nicht verfügbar."
      : "Live download data is currently unavailable.";
  }

  function init() {
    document.querySelectorAll(".cran-stats").forEach(function (root) {
      var pkg = root.getAttribute("data-package");
      if (!pkg) return;
      load(pkg).then(function (d) { render(root, d); }).catch(function () { fail(root); });
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
