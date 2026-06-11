// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  siteNav.classList.toggle('open');
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    siteNav.classList.remove('open');
  });
});

// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxName = document.getElementById('lightbox-name');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImages = [];
let currentIndex = 0;
let currentName = '';

function showImage() {
  lightboxImg.src = currentImages[currentIndex];
  lightboxImg.alt = `${currentName} label artwork ${currentIndex + 1}`;
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  lightboxName.textContent = currentName;
  lightbox.dataset.count = currentImages.length;
}

document.querySelectorAll('.view-label').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentImages = btn.dataset.labels.split(',').map((s) => s.trim());
    currentName = btn.dataset.name;
    currentIndex = 0;
    showImage();
    lightbox.classList.add('active');
  });
});

lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage();
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage();
});

function closeLightbox() {
  lightbox.classList.remove('active');
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
