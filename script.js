// ==========================================================================
// ATUAL CONFECÇÕES - JAVASCRIPT INTERACTIONS, 3D TILT & WHATSAPP
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      const icon = menuToggle.querySelector('svg');
      if (icon) {
        if (isExpanded) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header shadow on scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // 3. Hero Video (Sempre mudo)
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
  }

  // 4. Instagram Post Carousel Controller
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dots = document.querySelectorAll('.carousel-dot');
  const currentSlideNum = document.getElementById('currentSlideNum');
  
  if (carouselTrack && dots.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
      if (currentSlideNum) {
        currentSlideNum.textContent = (currentSlide + 1);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => goToSlide(idx));
    });

    // Auto rotate every 5 seconds
    let autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

    const stage = document.getElementById('igCarousel');
    if (stage) {
      stage.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      stage.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
      });
    }
  }

  // 5. Instagram Like Button Interaction
  const igLikeBtn = document.getElementById('igLikeBtn');
  const igLikeCounter = document.getElementById('igLikeCounter');

  if (igLikeBtn && igLikeCounter) {
    let isLiked = false;
    let baseCount = 1482;

    igLikeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      igLikeBtn.classList.toggle('liked', isLiked);
      const newCount = isLiked ? (baseCount + 1) : baseCount;
      igLikeCounter.textContent = newCount.toLocaleString('pt-BR');
    });
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. Scroll Reveal Observer with 3D Depth
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 8. Dynamic 3D Card Tilt Effect (Smooth Non-Exaggerated Perspective)
  const tiltCards = document.querySelectorAll('[data-tilt]');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && tiltCards.length > 0) {
    tiltCards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        // Calculate cursor position from center (-1 to 1)
        const xPos = (e.clientX - rect.left) / cardWidth - 0.5;
        const yPos = (e.clientY - rect.top) / cardHeight - 0.5;

        // Smooth non-exaggerated tilt angles (max 7-8 deg)
        const maxRotation = 7;
        const rotateY = (xPos * maxRotation * 2).toFixed(2);
        const rotateX = (-yPos * maxRotation * 2).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 9. WhatsApp Direct Form Lead Generator
  const contactForm = document.getElementById('leadForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('leadName')?.value.trim();
      const phone = document.getElementById('leadPhone')?.value.trim();
      const interest = document.getElementById('leadInterest')?.value;
      const city = document.getElementById('leadCity')?.value.trim() || 'Não informada';
      const consent = document.getElementById('leadConsent')?.checked;

      if (!consent) {
        alert('Por favor, marque a caixa concordando em receber contato via WhatsApp.');
        return;
      }

      // Build message text
      let text = `Olá, Atual Confecções! Vim pelo site oficial.\n\n`;
      text += `*Nome:* ${name}\n`;
      text += `*WhatsApp:* ${phone}\n`;
      text += `*Cidade:* ${city}\n`;
      text += `*Interesse:* ${interest}\n\n`;
      text += `Gostaria de mais informações sobre o mostruário e revenda!`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/5567992386878?text=${encodedText}`;

      // Open official WhatsApp window
      window.open(whatsappUrl, '_blank');
      
      // Feedback to user
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Redirecionando para WhatsApp...';
        submitBtn.style.backgroundColor = '#1ebe57';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3500);
      }
    });
  }
});
