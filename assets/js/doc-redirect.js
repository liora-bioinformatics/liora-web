/* Short links printed in the PhyloTrace PDFs (e.g. /phylotrace-application-note).
   Sends the visitor to the PDF in the language of the site: the stored choice
   (same key as i18n.js), else the browser language. Reads local settings only. */
(function () {
  var body = document.body;
  var lang = null;
  try { lang = localStorage.getItem("liora-lang"); } catch (e) { }
  if (lang !== "de" && lang !== "en") {
    var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "en"];
    lang = "en";
    for (var i = 0; i < prefs.length; i++) { if (/^de\b/i.test(prefs[i])) { lang = "de"; break; } }
  }
  var target = body.getAttribute("data-" + lang) || body.getAttribute("data-en");
  if (target) window.location.replace(target);
})();
