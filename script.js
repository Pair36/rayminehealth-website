// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== Smooth Scrolling (used by buttons in hero) =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
window.scrollToSection = scrollToSection; // ensure global access for inline onclick

// ===== Appointment Form Submission =====
const appointmentForm = document.querySelector('.appointment-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data if you later want to send via API / backend
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // For now, just show a success message
        alert(
            'Appointment request submitted successfully! Our team will contact you within 24 hours to confirm your appointment.'
        );

        // Reset form
        this.reset();
    });

    // Simple validation for appointment form
    document
        .querySelectorAll(
            '.appointment-form input, .appointment-form select, .appointment-form textarea'
        )
        .forEach(field => {
            field.addEventListener('blur', function () {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444'; // red for error
                } else {
                    this.style.borderColor = '#e5e7eb';
                }
            });
        });
}

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
}

// ===== Animate cards on scroll =====
const cards = document.querySelectorAll('.service-card, .doctor-card');

if ('IntersectionObserver' in window && cards.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
} else {
    // Fallback: ensure cards are visible if IntersectionObserver is not supported
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
}

// ===== Page Load Fade-in =====
const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}