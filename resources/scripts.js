document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar toggle ---
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const svgPath = document.querySelector('.menu-button path');

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
        const animationClass = targetElement.dataset.animationClass || "is-visible";
        const delay = targetElement.dataset.delay || "0s";
        targetElement.style.animationDelay = delay;
        targetElement.classList.add(animationClass);
        observer.unobserve(targetElement);
      }
    });
  }, {
    threshold: 0.1
  });

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
      this.glitchColors = options.glitchColors || ['#2b4539', '#61dca3', '#61b3dc'];
      this.glitchSpeed = options.glitchSpeed || 50;
      this.centerVignette = options.centerVignette || false;
      this.outerVignette = options.outerVignette !== false;
      this.smooth = options.smooth !== false;
      this.fontSize = 16;
      this.charWidth = 10;
      this.charHeight = 20;
      this.letters = [];
      this.grid = { columns: 0, rows: 0 };
      this.animationId = null;
      this.lastGlitchTime = Date.now();
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
      let resizeTimeout;
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
      if (!container) return;
      const existingVignettes = container.querySelectorAll('.outer-vignette, .center-vignette');
      existingVignettes.forEach(el => el.remove());
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
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
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
      const { width, height } = this.canvas;
      this.context.clearRect(0, 0, width, height);
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
      window.removeEventListener('resize', this.boundResizeHandler);
    }
  }

  const glitch1 = new LetterGlitch('letterGlitchCanvas', {
    glitchSpeed: 50,
    centerVignette: true,
    outerVignette: false,
    smooth: true
  });

  if (glitch1.canvas) {
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
  if (carouselContainers.length > 0) {
    carouselContainers.forEach((container) => {
      const carouselItems = container.querySelectorAll('.pipelines-carousel');
      const numItems = carouselItems.length;
      if (numItems > 0) {
        const intervalTime = parseInt(container.getAttribute('data-interval')) || 4000;
        const animationType = container.getAttribute('data-animation') || 'fade';
        let currentIndex = 0;
        let intervalId;
        if (animationType === 'fade') {
          if (!carouselItems[0].classList.contains('active')) {
            carouselItems[0].classList.add('active');
          }
          function showNextItem() {
            carouselItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % numItems;
            carouselItems[currentIndex].classList.add('active');
          }
          if (numItems > 1) {
            intervalId = setInterval(showNextItem, intervalTime);
          }
        } else if (animationType === 'slide') {
          let inner = container.querySelector('.carousel-inner');
          if (!inner) {
            inner = document.createElement('div');
            inner.classList.add('carousel-inner');
            container.appendChild(inner);
            Array.from(carouselItems).forEach(item => inner.appendChild(item));
          }
          const itemsArray = Array.from(inner.children);
          if (numItems > 1) {
            const firstClone = itemsArray[0].cloneNode(true);
            const lastClone = itemsArray[numItems - 1].cloneNode(true);
            inner.insertBefore(lastClone, itemsArray[0]);
            inner.appendChild(firstClone);
            let currentPos = 1;
            inner.style.transform = `translateX(-${currentPos * 100}%)`;
            function showNextItem() {
              currentPos++;
              inner.style.transition = 'transform 0.5s ease';
              inner.style.transform = `translateX(-${currentPos * 100}%)`;
              if (currentPos === numItems + 1) {
                setTimeout(() => {
                  inner.style.transition = 'none';
                  currentPos = 1;
                  inner.style.transform = `translateX(-${currentPos * 100}%)`;
                }, 500);
              }
            }
            intervalId = setInterval(showNextItem, intervalTime);
          } else {
            inner.style.transform = `translateX(0%)`;
          }
        } else {
          console.warn(`Unsupported animation type "${animationType}" for carousel.`);
        }
      } else {
        console.warn("No carousel items found in a container.");
      }
    });
  } else {
    console.warn("No carousel containers found.");
  }

  // --- Genome Plots ---
  const scrollStart = 0;
  const scrollEnd = 2000;
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
      console.warn(`Element with ID '${elementId}' not found.`);
    }
  };

  setupGenomeRotation('genomeThree', -50, 50, 3.2);

  const genomeTwo = document.getElementById('genomeTwo');
  if (genomeTwo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      genomeTwo.style.transform = `rotate(${(scrollY * 0.2) % 360}deg)`;
    });
  } else {
    console.warn("Element with ID 'genomeTwo' not found.");
  }

  const genomeFour = document.getElementById('genomeFour');
  const genomeFive = document.getElementById('genomeFive');
  if (genomeFour && genomeFive) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      genomeFour.style.transform = `rotate(${(scrollY * 0.15) % 360}deg)`;
      genomeFive.style.transform = `rotate(${(scrollY * 0.15) % 360}deg)`;
    });
  } else {
    console.warn("One or both elements (genomeFour, genomeFive) not found.");
  }

  // --- Decrypted text animation ---
  function decryptText(element, fullText, duration) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = fullText.length;
    let frame = 0;
    const totalFrames = Math.floor(duration / 40);
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
    const duration = parseInt(el.dataset.duration, 10) || 2000;
    if (fullText) {
      decryptText(el, fullText, duration);
    } else {
      console.warn(`Element ${el.id || el.className} has class 'decrypted' but no 'data-text' attribute.`);
    }
  });

  // --- Project Carousel ---
  const prevBtn = document.querySelector('.project-carousel-prev');
  const nextBtn = document.querySelector('.project-carousel-next');
  const imgWrap = document.querySelector('.project-carousel-img-wrap');
  if (prevBtn && nextBtn && imgWrap) {
    const originalImages = document.querySelectorAll('.project-carousel-img-wrap img');
    const originalN = originalImages.length;
    let currentIndex = 1;
    let autoInterval = null;
    let restartTimeout = null;

    const firstClone = originalImages[0].cloneNode(true);
    const lastClone = originalImages[originalN - 1].cloneNode(true);
    imgWrap.prepend(lastClone);
    imgWrap.appendChild(firstClone);

    function showImage() {
      imgWrap.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

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
      }, 10000);
    }

    nextBtn.addEventListener('click', () => {
      scheduleRestart();
      nextSlide();
    });

    prevBtn.addEventListener('click', () => {
      scheduleRestart();
      prevSlide();
    });

    autoInterval = setInterval(nextSlide, 3000);
    showImage();
  } else {
    console.warn("Project carousel elements not found.");
  }

  // --- Contact Form ---
  const form = document.querySelector('.contact-form');
  const submitButton = document.querySelector('.submit-button');
  const recaptchaContainer = document.querySelector('.g-recaptcha');

  if (!form || !submitButton) return;

  // Global variable to store reCAPTCHA widget ID
  let recaptchaWidgetId = null;

  // Initialize reCAPTCHA with explicit render to get widget ID
  function initRecaptcha() {
    if (recaptchaContainer && typeof grecaptcha !== 'undefined') {
      recaptchaWidgetId = grecaptcha.render(recaptchaContainer, {
        sitekey: '6Ld2qtErAAAAACOhAtfj8KooUpj3zL_E9ZRHVB5R', // Your Site Key
        callback: window.recaptchaSuccess,
        'expired-callback': window.recaptchaError,
        'error-callback': window.recaptchaError
      });
      console.log('reCAPTCHA initialized with widget ID:', recaptchaWidgetId);
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }

  // Wait for reCAPTCHA API to load
  function waitForRecaptcha() {
    if (typeof grecaptcha === 'undefined') {
      setTimeout(waitForRecaptcha, 100);
    } else {
      initRecaptcha();
    }
  }
  waitForRecaptcha();

  // reCAPTCHA Callback Functions
  window.recaptchaSuccess = function (token) {
    console.log('reCAPTCHA verified successfully');
    submitButton.disabled = false;
    submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    const recaptchaError = document.getElementById('recaptcha-error');
    if (recaptchaError) {
      recaptchaError.textContent = '';
      recaptchaError.classList.remove('show');
    }
  };

  window.recaptchaError = function () {
    console.log('reCAPTCHA error occurred');
    submitButton.disabled = true;
    submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    const recaptchaError = document.getElementById('recaptcha-error');
    if (recaptchaError) {
      recaptchaError.textContent = 'Please complete the security check';
      recaptchaError.classList.add('show');
    }
  };

  // Real-time validation
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

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!recaptchaWidgetId && typeof grecaptcha === 'undefined') {
      showErrorMessage('Security check is still loading. Please wait a moment.');
      return;
    }

    const recaptchaResponse = recaptchaWidgetId ? grecaptcha.getResponse(recaptchaWidgetId) : '';
    if (!recaptchaResponse) {
      showRecaptchaError('Please complete the "I\'m not a robot" verification below.');
      return;
    }

    if (!validateForm(form)) {
      return;
    }

    submitButton.classList.add('loading');
    submitButton.disabled = true;

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
        form.innerHTML = `
          <div class="success-message">
            <div style="margin: 0 auto; display: flex; align-items: center; justify-content: center; height: 3rem; width: 3rem; border-radius: 50%; background: #dcfce7; margin-bottom: 1rem;">
              <svg style="height: 1.5rem; width: 1.5rem; color: #16a34a;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Message Sent Successfully!</h3>
            <p style="color: #15803d; margin-bottom: 1.5rem; line-height: 1.5;">
              Thank you for reaching out! We've received your message and will get back to you within 24 hours.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center; align-items: center;">
              <a href="mailto:info@liora-bioinformatics.com" 
                 style="padding: 0.5rem 1rem; background: #f3f4f6; color: #374151; border-radius: 0.5rem; text-decoration: none; font-size: 0.875rem;">
                Email Us Directly
              </a>
              <button onclick="location.reload()" 
                      style="padding: 0.5rem 1rem; background: #2563eb; color: white; border-radius: 0.5rem; border: none; cursor: pointer;">
                Send Another Message
              </button>
            </div>
          </div>
        `;
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'contact_form',
            'event_label': 'successful_submission'
          });
        }
      } else {
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
      if (!form.querySelector('.success-message')) {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        if (recaptchaWidgetId) {
          grecaptcha.reset(recaptchaWidgetId); // Reset reCAPTCHA on failure
        }
      }
    }
  });

  function validateForm(form) {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.classList.remove('show');
    });
    document.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
      el.style.border = '';
      el.style.background = '';
    });

    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      topic: document.getElementById('topic'),
      message: document.getElementById('message')
    };

    let isValid = true;

    Object.entries(fields).forEach(([fieldId, field]) => {
      if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(fieldId, `${getFieldName(fieldId)} is required`);
        isValid = false;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email.value && !emailRegex.test(fields.email.value)) {
      showFieldError('email', 'Please enter a valid email address');
      isValid = false;
    }

    if (fields.message.value.length < 10) {
      showFieldError('message', 'Message must be at least 10 characters long');
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
      showFieldError(field.id, errorMessage);
    } else {
      const errorEl = document.getElementById(`${field.id}-error`);
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
      }
      field.classList.remove('error');
      field.style.border = '';
      field.style.background = '';
    }
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('error');
    field.style.border = '1px solid #ef4444';
    field.style.background = '#fef2f2';
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
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

  function showRecaptchaError(message) {
    const errorEl = document.getElementById('recaptcha-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
    submitButton.disabled = true;
    submitButton.classList.add('opacity-50', 'cursor-not-allowed');
  }

  function showErrorMessage(message) {
    const existingErrors = form.parentNode.querySelectorAll('.error-message');
    existingErrors.forEach(el => el.remove());
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <div style="display: flex; align-items: start;">
        <div style="flex-shrink: 0;">
          <svg style="height: 1.25rem; width: 1.25rem; color: #dc2626; margin-top: 0.125rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div style="margin-left: 0.75rem; flex: 1;">
          <p style="font-size: 0.875rem; color: #b91c1c;">${message}</p>
        </div>
        <div style="margin-left: 1rem; flex-shrink: 0;">
          <button type="button" style="color: #dc2626;" onclick="this.parentElement.parentElement.parentElement.remove()">
            <svg style="height: 1.25rem; width: 1.25rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    form.parentNode.insertBefore(errorDiv, form);
  }
});