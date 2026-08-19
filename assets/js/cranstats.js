/* =========================================================
   Liora Bioinformatics — CRAN download statistics
   Reads pre-fetched figures from assets/data/cran-stats.json
   and renders them into any element with class "cran-stats"
   and a data-package attribute.

   The figures are NOT fetched from cranlogs in the browser:
   cranlogs.r-pkg.org sends no Access-Control-Allow-Origin
   header, so a cross-origin read is blocked and the panel
   would always fall back to its error state. They are
   collected by tools/update-cran-stats.py and committed, so
   the request here is same-origin. Figures reflect the
   RStudio/Posit CRAN mirror.
   ========================================================= */
(function () {
  "use strict";

  var SOURCE = "assets/data/cran-stats.json";

  function lang() {
    try { return localStorage.getItem("liora-lang") || "en"; } catch (e) { return "en"; }
  }

  function asOf(iso) {
    var label = lang() === "de" ? "Stand: " : "As of ";
    try {
      var d = new Date(iso + "T00:00:00");
      return label + d.toLocaleDateString(lang() === "de" ? "de-DE" : "en-GB",
        { year: "numeric", month: "long", day: "numeric" });
    } catch (e) { return label + iso; }
  }

  function fmt(n) {
    try { return Number(n).toLocaleString(lang() === "de" ? "de-DE" : "en-US"); }
    catch (e) { return String(n); }
  }

  // One request per page, shared by every panel on it.
  var pending = null;
  function loadAll() {
    if (!pending) {
      pending = fetch(SOURCE)
        .then(function (r) {
          if (!r.ok) throw new Error("http " + r.status);
          return r.json();
        })
        .catch(function (err) {
          pending = null; // allow a retry rather than caching the failure
          throw err;
        });
    }
    return pending;
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
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="spark-area" d="' + area + '"/>' +
      '<path class="spark-line" d="' + line + '"/></svg>';
  }

  function render(root, stats, generated) {
    var set = function (k, v) {
      var el = root.querySelector('[data-stat="' + k + '"]');
      if (el) el.textContent = v;
    };
    set("total", fmt(stats.total));
    set("m", fmt(stats.last30));
    set("w", fmt(stats.last7));
    var sp = root.querySelector('[data-stat="spark"]');
    if (sp) sp.innerHTML = sparkline(stats.months || []);
    var as = root.querySelector('[data-stat="asof"]');
    if (as) as.textContent = generated ? asOf(generated) : "";
    root.classList.remove("is-error");
    root.classList.add("is-loaded");
  }

  function fail(root) {
    root.classList.add("is-error");
    var note = root.querySelector(".cran-err");
    if (!note) {
      note = document.createElement("div");
      note.className = "cran-err";
      root.appendChild(note);
    }
    note.textContent = lang() === "de"
      ? "Download-Zahlen sind derzeit nicht verfügbar."
      : "Download figures are currently unavailable.";
  }

  function init() {
    var roots = document.querySelectorAll(".cran-stats");
    if (!roots.length) return;

    loadAll().then(function (data) {
      roots.forEach(function (root) {
        var pkg = root.getAttribute("data-package");
        var stats = pkg && data.packages && data.packages[pkg];
        if (stats) render(root, stats, data.generated);
        else fail(root);
      });
    }).catch(function () {
      roots.forEach(fail);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);

  // Numbers and the date are locale-formatted, so redraw them when the
  // visitor switches language. i18n.js cannot do this itself: these elements
  // hold generated content rather than translatable source text.
  document.addEventListener("liora:langchange", function () {
    if (document.querySelector(".cran-stats")) init();
  });
})();
