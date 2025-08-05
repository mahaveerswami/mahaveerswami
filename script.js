// Toggle mobile menu
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------
     Navbar Dropdown Handling
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
     Lightbox Gallery
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

    // Update image
    lightboxImg.src = img.src;

    // Update caption (figcaption > alt > blank)
    const caption =
      img.closest("figure")?.querySelector("figcaption")?.innerText ||
      img.alt ||
      "";
    lightboxCaption.textContent = caption;

    lightbox.style.display = "flex";
  }

  // Attach click handlers to all gallery images
  const galleries = document.querySelectorAll(".myGallery");
  galleries.forEach(gallery => {
    const galleryImages = gallery.querySelectorAll(".lightbox-img");

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentGalleryImages = Array.from(galleryImages);
        showImage(index);
      });
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Next / Prev buttons
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  // Click outside image closes lightbox
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
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
        // Swipe left → next
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
      } else {
        // Swipe right → prev
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
