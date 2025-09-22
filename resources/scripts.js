document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar toggle ---
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const svgPath = document.querySelector('.menu-button path'); // This assumes the path is a direct child of .menu-button

  // Check if elements exist before adding event listeners
  if (menuButton && mobileMenu && svgPath) {
    menuButton.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
      svgPath.setAttribute('d', mobileMenu.style.display === 'block'
        ? 'M6 18L18 6M6 6l12 12'
        : 'M4 6h16M4 12h16M4 18h16');
    });
  } else {
    console.warn("Navbar elements (menu-button, mobile-menu, or SVG path) not found. Navbar toggle will not work.");
  }

  // --- Fading Animations ---
  const sections_fade = document.querySelectorAll(".fade");
  const observer_fade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer_fade.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  sections_fade.forEach(section_fade => {
    observer_fade.observe(section_fade);
  });

  const sectionsToAnimate = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;

        // Get the animation class and delay from data attributes
        const animationClass = targetElement.dataset.animationClass || "is-visible"; // Default to 'is-visible'
        const delay = targetElement.dataset.delay || "0s"; // Default to 0s if no data-delay

        // Set the animation-delay dynamically
        targetElement.style.animationDelay = delay;

        // Add the animation class
        targetElement.classList.add(animationClass);

        // Stop observing this element once it's visible
        observer.unobserve(targetElement);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe each element
  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });

  // --- Letter Glitch Element ---
  class LetterGlitch {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.error(`Canvas element with ID '${canvasId}' not found.`);
        return;
      }
      this.context = this.canvas.getContext('2d');

      // Configuration options
      this.glitchColors = options.glitchColors || ['#2b4539', '#61dca3', '#61b3dc'];
      this.glitchSpeed = options.glitchSpeed || 50;
      this.centerVignette = options.centerVignette || false;
      this.outerVignette = options.outerVignette !== false;
      this.smooth = options.smooth !== false;

      // Canvas properties
      this.fontSize = 16;
      this.charWidth = 10;
      this.charHeight = 20;

      // Animation state
      this.letters = [];
      this.grid = { columns: 0, rows: 0 };
      this.animationId = null;
      this.lastGlitchTime = Date.now();

      // Character set
      this.lettersAndSymbols = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
        '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9'
      ];

      this.init();
    }

    init() {
      this.resizeCanvas();
      this.setupVignettes();
      this.animate();

      // Handle window resize
      let resizeTimeout;
      // Store the bound function to remove it later
      this.boundResizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          cancelAnimationFrame(this.animationId);
          this.resizeCanvas();
          this.animate();
        }, 100);
      };
      window.addEventListener('resize', this.boundResizeHandler);
    }

    setupVignettes() {
      const container = this.canvas.parentElement;
      if (!container) return; // Add null check for parent

      // Remove existing vignettes
      const existingVignettes = container.querySelectorAll('.outer-vignette, .center-vignette');
      existingVignettes.forEach(el => el.remove());

      // Add vignettes based on options
      if (this.outerVignette) {
        const outerVignette = document.createElement('div');
        outerVignette.className = 'outer-vignette';
        container.appendChild(outerVignette);
      }

      if (this.centerVignette) {
        const centerVignette = document.createElement('div');
        centerVignette.className = 'center-vignette';
        container.appendChild(centerVignette);
      }
    }

    getRandomChar() {
      return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
    }

    getRandomColor() {
      return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
    }

    hexToRgb(hex) {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    interpolateColor(start, end, factor) {
      const result = {
        r: Math.round(start.r + (end.r - start.r) * factor),
        g: Math.round(start.g + (end.g - start.g) * factor),
        b: Math.round(start.b + (end.b - start.b) * factor),
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    }

    calculateGrid(width, height) {
      const columns = Math.ceil(width / this.charWidth);
      const rows = Math.ceil(height / this.charHeight);
      return { columns, rows };
    }

    initializeLetters(columns, rows) {
      this.grid = { columns, rows };
      const totalLetters = columns * rows;
      this.letters = Array.from({ length: totalLetters }, () => ({
        char: this.getRandomChar(),
        color: this.getRandomColor(),
        targetColor: this.getRandomColor(),
        colorProgress: 1,
      }));
    }

    resizeCanvas() {
      const parent = this.canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;

      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;

      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { columns, rows } = this.calculateGrid(rect.width, rect.height);
      this.initializeLetters(columns, rows);

      this.drawLetters();
    }

    drawLetters() {
      if (!this.context || this.letters.length === 0) return;

      // Get current dimensions from the canvas itself, not parent's rect after initial resize
      const { width, height } = this.canvas;
      this.context.clearRect(0, 0, width, height); // Use canvas.width/height directly
      this.context.font = `${this.fontSize}px monospace`;
      this.context.textBaseline = 'top';

      this.letters.forEach((letter, index) => {
        const x = (index % this.grid.columns) * this.charWidth;
        const y = Math.floor(index / this.grid.columns) * this.charHeight;
        this.context.fillStyle = letter.color;
        this.context.fillText(letter.char, x, y);
      });
    }

    updateLetters() {
      if (!this.letters || this.letters.length === 0) return;

      const updateCount = Math.max(1, Math.floor(this.letters.length * 0.05));

      for (let i = 0; i < updateCount; i++) {
        const index = Math.floor(Math.random() * this.letters.length);
        if (!this.letters[index]) continue;

        this.letters[index].char = this.getRandomChar();
        this.letters[index].targetColor = this.getRandomColor();

        if (!this.smooth) {
          this.letters[index].color = this.letters[index].targetColor;
          this.letters[index].colorProgress = 1;
        } else {
          this.letters[index].colorProgress = 0;
        }
      }
    }

    handleSmoothTransitions() {
      let needsRedraw = false;
      this.letters.forEach((letter) => {
        if (letter.colorProgress < 1) {
          letter.colorProgress += 0.05;
          if (letter.colorProgress > 1) letter.colorProgress = 1;

          const startRgb = this.hexToRgb(letter.color);
          const endRgb = this.hexToRgb(letter.targetColor);
          if (startRgb && endRgb) {
            letter.color = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
            needsRedraw = true;
          }
        }
      });

      if (needsRedraw) {
        this.drawLetters();
      }
    }

    animate() {
      const now = Date.now();
      if (now - this.lastGlitchTime >= this.glitchSpeed) {
        this.updateLetters();
        this.drawLetters();
        this.lastGlitchTime = now;
      }

      if (this.smooth) {
        this.handleSmoothTransitions();
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.boundResizeHandler); // Use the stored bound function
    }
  }

  // Initialize the glitch effect when the page loads
  const glitch1 = new LetterGlitch('letterGlitchCanvas', {
    glitchSpeed: 50,
    centerVignette: true,
    outerVignette: false,
    smooth: true
  });

  // Check if glitch1 was successfully initialized (if canvas was found)
  if (glitch1.canvas) {
    // Additional examples with different settings
    const glitch2 = new LetterGlitch('letterGlitchCanvas2', {
      glitchSpeed: 30,
      centerVignette: false,
      outerVignette: true,
      smooth: false,
      glitchColors: ['#ff0066', '#00ff66', '#6600ff']
    });

    const glitch3 = new LetterGlitch('letterGlitchCanvas3', {
      glitchSpeed: 80,
      centerVignette: false,
      outerVignette: false,
      smooth: true,
      glitchColors: ['#ff4444', '#44ff44', '#4444ff']
    });
  }


  // --- Carousel Box ---
  const carouselContainers = document.querySelectorAll('.carousel-container');

  // Only proceed if carousel containers exist
  if (carouselContainers.length > 0) {
    carouselContainers.forEach((container) => {
      const carouselItems = container.querySelectorAll('.pipelines-carousel');
      const numItems = carouselItems.length;

      // Only set up if this container has items
      if (numItems > 0) {
        // Get the interval from data-attribute, default to 4000
        const intervalTime = parseInt(container.getAttribute('data-interval')) || 4000;

        // Get the animation type, default to 'fade'
        const animationType = container.getAttribute('data-animation') || 'fade';

        let currentIndex = 0;
        let intervalId;

        if (animationType === 'fade') {
          // Fade setup: Ensure first is active
          if (!carouselItems[0].classList.contains('active')) {
            carouselItems[0].classList.add('active');
          }

          function showNextItem() {
            // Remove 'active' from current
            carouselItems[currentIndex].classList.remove('active');

            // Next index
            currentIndex = (currentIndex + 1) % numItems;

            // Add 'active' to next
            carouselItems[currentIndex].classList.add('active');
          }

          // If only one item, no interval
          if (numItems > 1) {
            intervalId = setInterval(showNextItem, intervalTime);
          }
        } else if (animationType === 'slide') {
          // Slide setup: Create inner wrapper if not present
          let inner = container.querySelector('.carousel-inner');
          if (!inner) {
            inner = document.createElement('div');
            inner.classList.add('carousel-inner');
            container.appendChild(inner);

            // Move items to inner
            Array.from(carouselItems).forEach(item => inner.appendChild(item));
          }

          const itemsArray = Array.from(inner.children); // Now the originals are in inner

          if (numItems > 1) {
            // Add clones for infinite loop: clone last at beginning, clone first at end
            const firstClone = itemsArray[0].cloneNode(true);
            const lastClone = itemsArray[numItems - 1].cloneNode(true);
            inner.insertBefore(lastClone, itemsArray[0]);
            inner.appendChild(firstClone);

            // Update to include clones
            const totalSlides = numItems + 2;

            // Start at position 1 (first original)
            let currentPos = 1;
            inner.style.transform = `translateX(-${currentPos * 100}%)`;

            function showNextItem() {
              currentPos++;
              inner.style.transition = 'transform 0.5s ease';
              inner.style.transform = `translateX(-${currentPos * 100}%)`;

              // If reached the end clone, reset after transition
              if (currentPos === numItems + 1) {
                setTimeout(() => {
                  inner.style.transition = 'none';
                  currentPos = 1;
                  inner.style.transform = `translateX(-${currentPos * 100}%)`;
                }, 500); // Match transition duration in ms
              }
            }

            intervalId = setInterval(showNextItem, intervalTime);
          } else {
            // Single item: No transform needed
            inner.style.transform = `translateX(0%)`;
          }
        } else {
          console.warn(`Unsupported animation type "${animationType}" for carousel. Defaulting to no animation.`);
        }
      } else {
        console.warn("No carousel items found in a container. Carousel will not function for this container.");
      }
    });
  } else {
    console.warn("No carousel containers found. Carousels will not function.");
  }


  // --- Genome Plots ---
  // Define common scroll range and rotation range once
  const scrollStart = 0;
  const scrollEnd = 2000;

  // Helper function to handle rotation
  const setupGenomeRotation = (elementId, minRot, maxRot, boost) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));
        const rotation = minRot + (maxRot - minRot) * progress * boost;
        element.style.transform = `rotate(${rotation}deg)`;
      });
    } else {
      console.warn(`Element with ID '${elementId}' not found. Rotation animation will not work.`);
    }
  };

  setupGenomeRotation('genomeThree', -50, 50, 3.2);

  // Specific scroll handler for genomeTwo (different logic)
  const genomeTwo = document.getElementById('genomeTwo');
  if (genomeTwo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      genomeTwo.style.transform = `rotate(${(scrollY * 0.2) % 360}deg)`;
    });
  } else {
    console.warn("Element with ID 'genomeTwo' not found. Scroll animation will not work.");
  }

  // Specific scroll handler for genomeFour and genomeFive (same logic)
  const genomeFour = document.getElementById('genomeFour');
  const genomeFive = document.getElementById('genomeFive');
  if (genomeFour && genomeFive) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      genomeFour.style.transform = `rotate(${(scrollY * 0.15) % 360}deg)`;
      genomeFive.style.transform = `rotate(${(scrollY * 0.15) % 360}deg)`;
    });
  } else {
    console.warn("One or both elements (genomeFour, genomeFive) not found. Scroll animation will not work.");
  }


  // --- Decrypted text animation ---
  // This was already inside a DOMContentLoaded, now it's just part of the main one.
  function decryptText(element, fullText, duration) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = fullText.length;
    let frame = 0;
    const totalFrames = Math.floor(duration / 40); // Adjusted frame rate to match interval

    const interval = setInterval(() => {
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * length);
      let displayText = "";

      for (let i = 0; i < length; i++) {
        if (i < revealCount) {
          displayText += fullText[i];
        } else {
          displayText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = displayText;

      if (frame >= totalFrames) {
        clearInterval(interval);
        element.textContent = fullText;
      }

      frame++;
    }, 40);
  }

  const elements = document.querySelectorAll(".decrypted");
  elements.forEach(el => {
    const fullText = el.dataset.text;
    const duration = parseInt(el.dataset.duration, 10) || 2000; // Default 2 seconds
    if (fullText) { // Ensure data-text attribute exists
      decryptText(el, fullText, duration);
    } else {
      console.warn(`Element ${el.id || el.className} has class 'decrypted' but no 'data-text' attribute.`);
    }
  });

});

// --- Project Carousel ---
const prevBtn = document.querySelector('.project-carousel-prev');
const nextBtn = document.querySelector('.project-carousel-next');
const imgWrap = document.querySelector('.project-carousel-img-wrap');
const originalImages = document.querySelectorAll('.project-carousel-img-wrap img');
const originalN = originalImages.length;
let currentIndex = 1;
let autoInterval = null;
let restartTimeout = null;

// Clone last image and prepend it, clone first and append it
const firstClone = originalImages[0].cloneNode(true);
const lastClone = originalImages[originalN - 1].cloneNode(true);
imgWrap.prepend(lastClone);
imgWrap.appendChild(firstClone);

function showImage() {
  imgWrap.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Handle seamless reset on transition end
imgWrap.addEventListener('transitionend', () => {
  if (currentIndex === originalN + 1) {
    imgWrap.style.transition = 'none';
    currentIndex = 1;
    showImage();
    requestAnimationFrame(() => {
      imgWrap.style.transition = 'transform 0.5s ease';
    });
  } else if (currentIndex === 0) {
    imgWrap.style.transition = 'none';
    currentIndex = originalN;
    showImage();
    requestAnimationFrame(() => {
      imgWrap.style.transition = 'transform 0.5s ease';
    });
  }
});

function nextSlide() {
  currentIndex++;
  showImage();
}

function prevSlide() {
  currentIndex--;
  showImage();
}

function stopAuto() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

function scheduleRestart() {
  stopAuto();
  if (restartTimeout) {
    clearTimeout(restartTimeout);
  }
  restartTimeout = setTimeout(() => {
    autoInterval = setInterval(nextSlide, 3000);
  }, 10000); // 10-second delay before restarting auto-advance
}

nextBtn.addEventListener('click', () => {
  scheduleRestart();
  nextSlide();
});

prevBtn.addEventListener('click', () => {
  scheduleRestart();
  prevSlide();
});

// Initial auto-advance every 3 seconds
autoInterval = setInterval(nextSlide, 3000);

showImage();

// Enhanced AJAX Contact Form Submission
// Complete Enhanced Contact Form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const submitButton = document.querySelector('.submit-button');

  if (!form || !submitButton) return;

  // reCAPTCHA callback function
  window.onRecaptchaSuccess = function () {
    console.log('reCAPTCHA verified');
    // Enable submit button when reCAPTCHA is completed
    submitButton.disabled = false;
  };

  // Reset reCAPTCHA on form reset
  window.resetRecaptcha = function () {
    if (typeof grecaptcha !== 'undefined' && recaptchaContainer) {
      grecaptcha.reset(recaptchaContainer);
    }
  };

  // Add honeypot field dynamically (in case you forget to add it to HTML)
  if (!form.querySelector('#website')) {
    const honeypot = document.createElement('div');
    honeypot.innerHTML = `
            <div style="position: absolute; left: -9999px; opacity: 0;">
                <label for="website">Website (leave blank):</label>
                <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
            </div>
        `;
    form.insertBefore(honeypot.firstChild, form.firstChild);
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    // Check reCAPTCHA
    if (recaptchaContainer && typeof grecaptcha === 'undefined') {
      showErrorMessage('Please wait for the security check to complete.');
      return;
    }

    const recaptchaResponse = grecaptcha ? grecaptcha.getResponse(recaptchaContainer) : '';
    if (!recaptchaResponse) {
      showErrorMessage('Please complete the security check below.');
      return;
    }

    // Validate form fields
    if (!validateForm(form)) {
      return;
    }

    // Show loading state
    const originalButtonText = submitButton.textContent;
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formcarry.com/s/0R8D2qqyRrw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (result.code === 200) {
        // Success - replace form with beautiful success message
        form.innerHTML = `
                    <div class="success-message bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                        <p class="text-green-700 mb-6 leading-relaxed">
                            Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <button onclick="window.location.href='mailto:info@liora-bioinformatics.com'" 
                                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm">
                                Email Us Directly
                            </button>
                            <button onclick="window.location.reload()" 
                                    class="submit-button">
                                Send Another Message
                            </button>
                        </div>
                    </div>
                `;

        // Optional: Track success with Google Analytics if you have it
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'contact_form',
            'event_label': 'successful_submission'
          });
        }
      } else {
        // Formcarry-specific error handling
        let errorMessage = 'Submission failed. Please try again.';
        if (result.message) {
          if (result.message.includes('spam')) {
            errorMessage = 'This appears to be spam. Please try again.';
          } else if (result.message.includes('limit')) {
            errorMessage = 'Submission limit reached. Please try again later.';
          }
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage('Oops! Something went wrong. Please try again or email us directly at info@liora-bioinformatics.com');
    } finally {
      // Only reset button if form wasn't replaced with success message
      if (!form.querySelector('.success-message')) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });

  // Enhanced validation with real-time feedback
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function () {
      validateField(this);
    });

    input.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  function validateForm(form) {
    // Clear all previous errors
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error', 'border-red-500', 'bg-red-50');
    });

    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      topic: document.getElementById('topic'),
      message: document.getElementById('message')
    };

    let isValid = true;

    // Check required fields
    Object.values(fields).forEach(field => {
      if (!field.value.trim()) {
        showFieldError(field, `${getFieldName(field.id)} is required`);
        isValid = false;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email.value && !emailRegex.test(fields.email.value)) {
      showFieldError(fields.email, 'Please enter a valid email address');
      isValid = false;
    }

    // Message length validation
    if (fields.message.value.length < 10) {
      showFieldError(fields.message, 'Message must be at least 10 characters long');
      isValid = false;
    }

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${getFieldName(field.id)} is required`;
    } else if (field.id === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    } else if (field.id === 'message' && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long';
    }

    if (!isValid) {
      showFieldError(field, errorMessage);
    } else {
      // Remove error state if valid
      const existingError = field.parentNode.querySelector('.field-error');
      if (existingError) existingError.remove();
      field.classList.remove('error', 'border-red-500', 'bg-red-50');
    }
  }

  function getFieldName(fieldId) {
    const names = {
      name: 'Name',
      email: 'Email',
      topic: 'Topic',
      message: 'Message'
    };
    return names[fieldId] || fieldId;
  }

  function showFieldError(field, message) {
    field.classList.add('error', 'border-red-500', 'bg-red-50');

    // Remove existing error for this field
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<span>${message}</span>`;
    field.parentNode.appendChild(errorDiv);
  }

  function showErrorMessage(message) {
    // Remove existing error message
    const existingError = form.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-50 border border-red-200 rounded-lg p-4 mb-4 mx-4 sm:mx-0';
    errorDiv.innerHTML = `
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Submission Error</h3>
                    <p class="text-sm text-red-700 mt-1">${message}</p>
                </div>
                <div class="ml-auto pl-3">
                    <button type="button" class="inline-flex text-red-800 hover:text-red-900" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

    // Insert before the form
    form.parentNode.insertBefore(errorDiv, form);
  }
});