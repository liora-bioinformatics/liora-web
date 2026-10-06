/* =========================================================
   Liora Bioinformatics — PhyloTrace release version
   Fills #repo-version with the latest GitHub release tag.
   Runs after the DOM is ready and tolerates the element
   being absent.

   The tag is NOT fetched from api.github.com in the browser:
   that would send every visitor's IP address to GitHub, Inc.
   (USA) on page load. It is collected by
   tools/update-release-version.py and committed, so the
   request here is same-origin.
   ========================================================= */
(function () {
  "use strict";

  var SOURCE = "assets/data/phylotrace-release.json";

  // i18n.js sets <html lang> on load and on every switch, including when the
  // language was detected from the browser rather than stored.
  function lang() {
    return document.documentElement.getAttribute("lang") === "de" ? "de" : "en";
  }

  var T = {
    en: { loading: "loading…", unavailable: "unavailable", failed: "could not be loaded" },
    de: { loading: "wird geladen…", unavailable: "nicht verfügbar", failed: "konnte nicht geladen werden" }
  };
  function t(key) { return (T[lang()] || T.en)[key]; }

  function init() {
    var el = document.getElementById("repo-version");
    if (!el) return;

    // This element deliberately carries no data-i18n attribute: i18n.js would
    // overwrite the fetched version number on load and on every language switch.
    el.textContent = t("loading");

    fetch(SOURCE)
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
