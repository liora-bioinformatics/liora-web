/* =========================================================
   Liora Bioinformatics — contact form handler
   Submits to the existing Formcarry endpoint (AJAX) and
   gates submission behind Google reCAPTCHA v2. Falls back
   to a normal POST if JavaScript is unavailable.
   ========================================================= */
(function () {
  "use strict";

  var ENDPOINT = "https://formcarry.com/s/0R8D2qqyRrw";

  function lang() {
    try { return localStorage.getItem("liora-lang") || "en"; } catch (e) { return "en"; }
  }

  var T = {
    en: {
      captcha: "Please complete the “I’m not a robot” verification.",
      sending: "Sending…",
      okTitle: "Message sent",
      okBody: "Thank you for reaching out. We’ll get back to you within 24 hours.",
      again: "Send another message",
      err: "Something went wrong. Please try again, or email us directly at info@liora-bioinformatics.com."
    },
    de: {
      captcha: "Bitte bestätigen Sie die „Ich bin kein Roboter“-Abfrage.",
      sending: "Wird gesendet…",
      okTitle: "Nachricht gesendet",
      okBody: "Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 24 Stunden.",
      again: "Weitere Nachricht senden",
      err: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns an info@liora-bioinformatics.com."
    }
  };
  function t(key) { return (T[lang()] || T.en)[key]; }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var submitBtn = document.getElementById("submit-btn");
    var statusEl = document.getElementById("form-status");
    var recaptchaReady = false;

    // reCAPTCHA callbacks (referenced by data-callback in the HTML)
    window.lioraRecaptchaOk = function () {
      recaptchaReady = true;
      if (submitBtn) submitBtn.disabled = false;
      showStatus("", null);
    };
    window.lioraRecaptchaExpired = function () {
      recaptchaReady = false;
      if (submitBtn) submitBtn.disabled = true;
    };

    function showStatus(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "form-status" + (msg ? " show " + (kind || "") : "");
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Honeypot: if the hidden field is filled, silently drop.
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      if (typeof grecaptcha !== "undefined" && !recaptchaReady) {
        showStatus(t("captcha"), "err");
        return;
      }

      showStatus(t("sending"), "ok");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = t("sending"); }

      try {
        var res = await fetch(ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });
        var data = await res.json();

        if (data.code === 200 || data.status === "success") {
          form.reset();
          var wrap = form.parentNode;
          wrap.innerHTML =
            '<div class="center" style="padding:8px 0;">' +
            '<div style="width:56px;height:56px;border-radius:50%;background:#eaf7f0;display:grid;place-items:center;margin:0 auto 16px;">' +
            '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1f9d6b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
            '<h3 style="margin-bottom:6px;">' + t("okTitle") + '</h3>' +
            '<p style="max-width:44ch;margin:0 auto 20px;">' + t("okBody") + '</p>' +
            '<button type="button" class="btn btn-ghost" onclick="location.reload()">' + t("again") + '</button>' +
            '</div>';
        } else {
          throw new Error(data.message || "submit failed");
        }
      } catch (err) {
        showStatus(t("err"), "err");
        if (submitBtn) { submitBtn.disabled = false; if (submitBtn.dataset.label) submitBtn.textContent = submitBtn.dataset.label; }
        if (typeof grecaptcha !== "undefined") { try { grecaptcha.reset(); } catch (e) {} recaptchaReady = false; if (submitBtn) submitBtn.disabled = true; }
      }
    });
  });
})();
