(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".site-header__toggle");
  var links = document.querySelector(".site-nav");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Homepage hero slideshow ---------- */
  var slides = document.querySelectorAll("[data-slide]");
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 5000);
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var imageEl = document.getElementById("lightbox-image");
  var captionEl = document.getElementById("lightbox-caption");
  var closeBtn = document.getElementById("lightbox-close");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");

  // Read each gallery's data (title/image/caption) from the JSON blocks
  // rendered by index.njk, keyed by category slug.
  var groups = {};
  document.querySelectorAll(".gallery-data").forEach(function (script) {
    try {
      groups[script.dataset.group] = JSON.parse(script.textContent);
    } catch (e) {
      groups[script.dataset.group] = [];
    }
  });

  var currentGroup = null;
  var currentIndex = 0;

  function open(group, index) {
    currentGroup = group;
    currentIndex = index;
    render();
    lightbox.hidden = false;
	void lightbox.offsetWidth;
	lightbox.classList.add("is-visible");
	document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
	lightbox.classList.remove("is-visible")
	lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function render() {
    var items = groups[currentGroup] || [];
    if (!items.length) return;
    var piece = items[currentIndex];
    imageEl.src = piece.image;
    imageEl.alt = piece.title || "";
    captionEl.textContent = [piece.title, piece.caption].filter(Boolean).join(" — ");
  }

  function step(delta) {
	var items = groups[currentGroup] || [];
	if (!items.length) return;
	currentIndex = (currentIndex + delta + items.length) % items.length;
	imageEl.style.transition = "none";
	imageEl.classList.add("is-fading");
	render();
	void imageEl.offsetWidth; // force reflow so "transition: none" actually registers
	imageEl.style.transition = "";
	imageEl.classList.remove("is-fading");
  }

  document.querySelectorAll("[data-lightbox-group]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.dataset.lightboxGroup;
      var index = parseInt(btn.dataset.lightboxIndex, 10) || 0;
      open(group, index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { step(-1); });
  nextBtn.addEventListener("click", function () { step(1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
