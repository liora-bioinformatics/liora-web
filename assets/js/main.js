// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    // Close menu when a link is clicked (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // Set current year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const slidesContainer = carousel.querySelector('.carousel-slides');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');
    const prevBtn = carousel.querySelector('[data-carousel-btn="prev"]');
    const nextBtn = carousel.querySelector('[data-carousel-btn="next"]');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoRotationStopped = false;
    let isCarouselVisible = false;
    const intervalTime = 3000; // 3 seconds per slide

    // Track which slide indices have been viewed
    const seenSlides = new Set([0]);

    // Update active slide, dots, and accessibility attributes
    const updateCarousel = (index) => {
      slides.forEach((slide, i) => {
        const isActive = i === index;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', !isActive);
      });

      dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      currentIndex = index;
      seenSlides.add(index);

      // Stop auto-rotation permanently once every image in this carousel has been displayed
      if (seenSlides.size >= slides.length) {
        stopAutoSlidePermanently();
      }
    };

    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    };

    const prevSlide = () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(prevIndex);
    };

    // Auto-advance timer management
    const startAutoSlide = () => {
      if (autoRotationStopped || !isCarouselVisible) return;
      stopAutoSlideTimer();
      autoSlideTimer = setInterval(nextSlide, intervalTime);
    };

    const stopAutoSlideTimer = () => {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    };

    const stopAutoSlidePermanently = () => {
      autoRotationStopped = true;
      stopAutoSlideTimer();
    };

    // Disable auto-rotation if the user manually interacts with controls
    const handleManualInteraction = (action) => {
      stopAutoSlidePermanently();
      action();
    };

    // Button controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => handleManualInteraction(nextSlide));
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => handleManualInteraction(prevSlide));
    }

    // Dot indicators
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => handleManualInteraction(() => updateCarousel(i)));
    });

    // Mobile touch / swipe support
    if (slidesContainer) {
      slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlideTimer();
      }, { passive: true });

      slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (diff > swipeThreshold) {
        handleManualInteraction(nextSlide);
      } else if (diff < -swipeThreshold) {
        handleManualInteraction(prevSlide);
      } else if (!autoRotationStopped) {
        startAutoSlide();
      }
    };

    // Keyboard navigation (Arrow keys)
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        handleManualInteraction(nextSlide);
      } else if (e.key === 'ArrowLeft') {
        handleManualInteraction(prevSlide);
      }
    });

    // Pause on hover or focus
    carousel.addEventListener('mouseenter', stopAutoSlideTimer);
    carousel.addEventListener('mouseleave', () => {
      if (!autoRotationStopped) startAutoSlide();
    });
    carousel.addEventListener('focusin', stopAutoSlideTimer);
    carousel.addEventListener('focusout', () => {
      if (!autoRotationStopped) startAutoSlide();
    });

    // Visibility Observer: Only trigger auto-rotation when element is on screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isCarouselVisible = true;
          startAutoSlide();
        } else {
          isCarouselVisible = false;
          stopAutoSlideTimer();
        }
      });
    }, { threshold: 0.35 }); // Carousel must be at least 35% visible to start

    observer.observe(carousel);

    // Initialize initial active slide state
    updateCarousel(0);
  });
});
