window.addEventListener("load", function () { setTimeout(function () {
  var r = document.getElementById("features").getBoundingClientRect();
  var pre = document.createElement("pre"); pre.id = "probe"; pre.textContent = JSON.stringify([Math.round(r.top + scrollY), Math.round(r.height)]); document.body.appendChild(pre); }, 1200); });
