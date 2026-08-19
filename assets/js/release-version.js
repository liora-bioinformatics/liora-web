/* =========================================================
   Liora Bioinformatics — PhyloTrace release version
   Fills #repo-version with the latest GitHub release tag.
   Runs after the DOM is ready and tolerates the element
   being absent. Unauthenticated api.github.com is limited
   to 60 requests/hour per IP, so failure is expected on
   shared networks and must degrade quietly.
   ========================================================= */
(function () {
  "use strict";

  var ENDPOINT = "https://api.github.com/repos/liora-bioinformatics/PhyloTrace/releases/latest";

  function lang() {
    try { return localStorage.getItem("liora-lang") || "en"; } catch (e) { return "en"; }
  }

  var T = {
    en: { loading: "loading\u2026", unavailable: "unavailable", failed: "could not be loaded" },
    de: { loading: "wird geladen\u2026", unavailable: "nicht verfügbar", failed: "konnte nicht geladen werden" }
  };
  function t(key) { return (T[lang()] || T.en)[key]; }

  function init() {
    var el = document.getElementById("repo-version");
    if (!el) return;

    // This element deliberately carries no data-i18n attribute: i18n.js would
    // overwrite the fetched version number on load and on every language switch.
    el.textContent = t("loading");

    fetch(ENDPOINT, { headers: { "Accept": "application/vnd.github+json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then(function (data) {
        el.textContent = (data && data.tag_name) || t("unavailable");
      })
      .catch(function () {
        el.textContent = t("failed");
      });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
