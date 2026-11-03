/* =========================================================
   PhyloTrace page: highlight the section being read in the floating
   table of contents (desktop) and in the mobile menu's PhyloTrace
   sub-list. The floating contents are always visible. Everything works as plain
   anchor links without this script; it only adds the highlighting.
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toc = document.querySelector(".pt-toc");
    var links = [].slice.call(document.querySelectorAll(".pt-toc a[href^='#'], .nav-sub a[href^='#']"));
    if (!links.length) return;

    // Sections in document order, one per distinct target id.
    var ids = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id && ids.indexOf(id) === -1 && document.getElementById(id)) ids.push(id);
    });
    ids.sort(function (a, b) {
      return document.getElementById(a).compareDocumentPosition(document.getElementById(b)) & 4 ? -1 : 1;
    });

    var current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      });
    }

    // The current section is the last one whose top has passed a reading line
    // about a third of the way down the viewport.
    function update() {
      var line = window.innerHeight * 0.33;
      var found = null;
      for (var i = 0; i < ids.length; i++) {
        if (document.getElementById(ids[i]).getBoundingClientRect().top <= line) found = ids[i];
      }
      setActive(found);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; update(); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  });
})();
