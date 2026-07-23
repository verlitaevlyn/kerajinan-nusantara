document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. RESPONSIVE MOBILE MENU
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  /* ==========================================================================
     2. DARK MODE TOGGLE
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️ Mode Terang';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');

      if (isDarkMode) {
        themeToggle.textContent = '☀️ Mode Terang';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.textContent = '🌙 Mode Gelap';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  /* ==========================================================================
     3. PRODUCT FILTERING (PRODUK PAGE)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        productCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     4. GALLERY LIGHTBOX MODAL (GALERI PAGE)
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalClose = document.querySelector('.modal-close');

  if (galleryItems.length > 0 && modal && modalImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = item.src;
        modalImg.alt = item.alt;
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  /* ==========================================================================
     5. FORM VALIDATION & CHARACTER COUNTER (KONTAK PAGE)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const pesanInput = document.getElementById('pesan');
  const charCounter = document.getElementById('charCounter');
  const alertSuccess = document.getElementById('alertSuccess');

  if (pesanInput && charCounter) {
    const maxChars = pesanInput.getAttribute('maxlength') || 200;
    pesanInput.addEventListener('input', () => {
      const remaining = pesanInput.value.length;
      charCounter.textContent = `${remaining}/${maxChars} karakter`;
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nama = document.getElementById('nama').value.trim();
      const email = document.getElementById('email').value.trim();
      const pesan = document.getElementById('pesan').value.trim();

      if (nama === '' || email === '' || pesan === '') {
        alert('Harap isi semua kolom formulir.');
        return;
      }

      if (alertSuccess) {
        alertSuccess.style.display = 'block';
        alertSuccess.textContent = `Terima kasih, ${nama}! Pesan Anda telah berhasil dikirim.`;
      }

      contactForm.reset();
      if (charCounter) charCounter.textContent = '0/200 karakter';

      setTimeout(() => {
        if (alertSuccess) alertSuccess.style.display = 'none';
      }, 5000);
    });
  }

  /* ==========================================================================
     6. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});