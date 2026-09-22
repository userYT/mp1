const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar__link');
const sections = Array.from(navLinks).map((link) =>
    document.getElementById(link.dataset.section)
);

// Req #4: Navbar resizing on scroll
function updateNavbarSize() {
    if (window.scrollY > 40) {
        navbar.classList.add('is-scrolled');
    } else {
        navbar.classList.remove('is-scrolled');
    }
}

// Req #3: Position indicator
function updateActiveSection() {
    const navbarBottom = navbar.getBoundingClientRect().bottom;
    const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

    let activeIndex = 0;
    if (atBottom) {
        activeIndex = sections.length - 1;
    } else {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= navbarBottom) {
                activeIndex = index;
            }
        });
    }

    navLinks.forEach((link, index) => {
        link.classList.toggle('is-active', index === activeIndex);
    });
}

function onScroll() {
    updateNavbarSize();
    updateActiveSection();
}

window.addEventListener('scroll', onScroll);
onScroll();

// Req #5: Smooth scrolling from nav clicks
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.getElementById(link.dataset.section);
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Req #14: Trigger the fade-in animation when its section scrolls into view
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    },
    { threshold: 0.3 }
);
fadeElements.forEach((el) => fadeObserver.observe(el));

// Req #6: Carousel
const carouselSlides = document.querySelectorAll('.carousel__slide');
let currentSlide = 0;

function showSlide(index) {
    currentSlide = (index + carouselSlides.length) % carouselSlides.length;
    carouselSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === currentSlide);
    });
}

document.getElementById('carouselPrev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.getElementById('carouselNext').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Req #11: Modal
document.querySelectorAll('.carousel__caption-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modalTarget);
        if (modal) {
            modal.classList.add('is-open');
        }
    });
});

document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.hasAttribute('data-modal-close')) {
            modal.classList.remove('is-open');
        }
    });
});
