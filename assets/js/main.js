// ReFresh Cleaning Pros - Shared Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (menuBtn && nav) {
        function toggleMenu() {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
            menuBtn.setAttribute('aria-expanded', nav.classList.contains('active'));
        }

        menuBtn.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) toggleMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // Smooth scroll for same-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hero slider (only on pages that have it)
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dot');

    if (slider && slides.length && prevBtn && nextBtn) {
        let currentSlide = 0;

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
                dot.setAttribute('aria-selected', i === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = (index + slides.length) % slides.length;
            slider.scrollTo({ left: slides[currentSlide].offsetLeft, behavior: 'smooth' });
            updateDots();
        }

        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('revealed');
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Contact form (only on contact page)
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form && formMessage) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            formMessage.style.display = 'block';
            formMessage.textContent = 'Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    form.reset();
                    setTimeout(() => formMessage.style.display = 'none', 3000);
                } else {
                    formMessage.textContent = 'Error sending message. Please try again.';
                }
            } catch (error) {
                formMessage.textContent = 'Error sending message. Please try again.';
            }
        });
    }
});
