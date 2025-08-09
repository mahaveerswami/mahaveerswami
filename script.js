document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------
     Auto-adjust body padding to match nav height
  ------------------------- */
  function setBodyPadding() {
    const nav = document.querySelector("nav");
    if (nav) {
      document.body.style.paddingTop = nav.offsetHeight + "px";
    }
  }
  window.addEventListener("resize", setBodyPadding);
  setBodyPadding();

  /* -------------------------
     Toggle Mobile Menu
  ------------------------- */
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  /* -------------------------
     Navbar Dropdown Handling (Mobile Only)
  ------------------------- */
  const dropdownParents = document.querySelectorAll(".has-dropdown > a");

  dropdownParents.forEach(link => {
    link.addEventListener("click", function (e) {
      const isMobile = window.innerWidth <= 768;
      const dropdown = this.nextElementSibling;

      if (isMobile && dropdown && dropdown.classList.contains("dropdown")) {
        e.preventDefault();
        dropdown.classList.toggle("show");
      }
    });
  });

  /* -------------------------
     Lightbox Gallery (works on .myGallery and .grid)
  ------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = lightbox.querySelector(".close");
  const nextBtn = lightbox.querySelector(".next");
  const prevBtn = lightbox.querySelector(".prev");

  let currentGalleryImages = [];
  let currentIndex = 0;

  function showImage(index) {
    if (index < 0 || index >= currentGalleryImages.length) return;
    currentIndex = index;
    const img = currentGalleryImages[currentIndex];

    lightboxImg.src = img.src;

    const caption =
      img.closest("figure")?.querySelector("figcaption")?.innerText ||
      img.alt ||
      "";
    lightboxCaption.textContent = caption;

    lightbox.classList.add("lightbox-show");
  }

  // Select all galleries with .myGallery or .grid classes
  const galleries = document.querySelectorAll(".myGallery, .grid");
  galleries.forEach(gallery => {
    const galleryImages = gallery.querySelectorAll(".lightbox-img");

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentGalleryImages = Array.from(galleryImages);
        showImage(index);
      });
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("lightbox-show");
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("lightbox-show");
    }
  });

  /* -------------------------
     Swipe Support for Mobile
  ------------------------- */
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
      } else {
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      }
      showImage(currentIndex);
    }
  });

  /* -------------------------
     Scroll Effect (Optional)
  ------------------------- */
  window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 20);
  });
});

/* -------------------------
   Force repaint/reflow on window load to fix initial overflow
------------------------- */
window.addEventListener('load', () => {
  // Force repaint by toggling a transform property
  document.body.style.transform = 'translateZ(0)';
  setTimeout(() => {
    document.body.style.transform = '';
  }, 50);

  // Recalculate body padding after everything loads (with slight delay)
  setTimeout(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      document.body.style.paddingTop = nav.offsetHeight + "px";
    }
  }, 100);
});
