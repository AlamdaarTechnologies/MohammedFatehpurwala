window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.classList.add('fade-out');
        // Restore scrolling after a slight delay for smooth transition
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';
        }, 1000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItemsList = document.querySelectorAll('.nav-item a');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-active');
    });

    // Close menu when clicking a link (on mobile)
    navItemsList.forEach(item => {
        item.addEventListener('click', () => {
            sidebar.classList.remove('mobile-active');
        });
    });

    // 2. Intersection Observer for Active Nav Highlighting
    const sections = document.querySelectorAll('section');

    const navObserverOptions = {
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItemsList.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href').substring(1) === entry.target.id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth Scroll with Offset for Mobile
    navItemsList.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offset = window.innerWidth <= 768 ? 70 : 0;
                const offsetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. 3D Projects Carousel Logic
    const carouselCards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 1; // Start with the second card active as in the reference
    let autoPlayInterval;

    function updateCarousel() {
        carouselCards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'hidden-prev', 'hidden-next');

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + carouselCards.length) % carouselCards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % carouselCards.length) {
                card.classList.add('next');
            } else {
                if (index < currentIndex) {
                    card.classList.add('hidden-prev');
                } else {
                    card.classList.add('hidden-next');
                }
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselCards.length;
            updateCarousel();
        }, 5000);
    }

    function resetAutoPlay() {
        startAutoPlay();
    }

    // Arrow Navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselCards.length) % carouselCards.length;
            updateCarousel();
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselCards.length;
            updateCarousel();
            resetAutoPlay();
        });
    }

    // Indicator Click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
            resetAutoPlay();
        });
    });

    // Card Click to navigate
    carouselCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            if (card.classList.contains('prev') || card.classList.contains('next')) {
                currentIndex = index;
                updateCarousel();
                resetAutoPlay();
            }
        });
    });

    // Initialize
    updateCarousel();
    startAutoPlay();

    const container = document.querySelector('.projects-carousel-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        container.addEventListener('mouseleave', () => startAutoPlay());
    }

    console.log('Elite Portfolio | Alex Rivera - Initialized');
});
