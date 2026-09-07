/* =====================================================
   PRIORITY SUCCESS ASSOCIATES — main.js
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Current Year ----
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Announcement Bar Close ----
    const announcementBar = document.getElementById('announcement-bar');
    const announceClose = document.getElementById('announcement-close');
    if (announceClose && announcementBar) {
        announceClose.addEventListener('click', function () {
            announcementBar.classList.add('hidden');
        });
    }

    // ---- Header Scroll Effect ----
    const header = document.getElementById('site-header');
    function onScroll() {
        if (window.scrollY > 60) {
            header && header.classList.add('scrolled');
        } else {
            header && header.classList.remove('scrolled');
        }
        // Back to top visibility
        const btt = document.getElementById('back-to-top');
        if (btt) {
            if (window.scrollY > 400) {
                btt.classList.add('visible');
            } else {
                btt.classList.remove('visible');
            }
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- Back to Top ----
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Mobile Navigation (Hamburger) ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen.toString());
        });

        // Close nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Mobile dropdown toggle
        const dropdownParents = navLinks.querySelectorAll('.has-dropdown');
        dropdownParents.forEach(function (parent) {
            const link = parent.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function (e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        parent.classList.toggle('open');
                    }
                });
            }
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerH = header ? header.offsetHeight : 110;
                const offset = headerH + 10;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll Reveal Animations ----
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---- Contact Form Handling ----
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(function (field) {
                field.style.borderColor = '';
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.style.borderColor = '#ef4444';
                    isValid = false;
                }
            }

            if (!isValid) {
                return;
            }

            // Simulate form submission
            const submitBtn = document.getElementById('form-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            setTimeout(function () {
                contactForm.style.display = 'none';
                formSuccess.hidden = false;
            }, 800);
        });

        // Clear error styling on input
        contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                this.style.borderColor = '';
            });
        });
    }

    // ---- Testimonials — simple fade-in ----
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, i * 80);
                testimonialsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    testimonialCards.forEach(function (card) {
        testimonialsObserver.observe(card);
    });

    // ---- Close dropdown on outside click ----
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown').forEach(function (el) {
                el.classList.remove('open');
            });
        }
    });

    // ---- Service cards staggered entrance ----
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }, i * 80);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        serviceObserver.observe(card);
    });

    // ---- Pillar cards stagger ----
    const pillarCards = document.querySelectorAll('.pillar-card');
    const pillarObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }, i * 100);
                pillarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    pillarCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        pillarObserver.observe(card);
    });

    // ---- Why feature items stagger ----
    const whyItems = document.querySelectorAll('.why-feature-item');
    const whyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }, i * 80);
                whyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    whyItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        whyObserver.observe(item);
    });

    // ---- Navbar active link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    const activeSectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinkEls.forEach(function (link) {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(function (section) {
        activeSectionObserver.observe(section);
    });

});
