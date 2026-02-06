/* ============================================
   GFC - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    ScrollAnimations.init();
    CounterAnimation.init();
    FormHandler.init();
    SmoothScroll.init();
});

/* ============================================
   PRELOADER
   ============================================ */
const Preloader = {
    init: function() {
        const preloader = document.getElementById('preloader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'visible';
                
                // Trigger initial animations after preloader
                setTimeout(() => {
                    this.triggerInitialAnimations();
                }, 300);
            }, 2000);
        });
    },
    
    triggerInitialAnimations: function() {
        // Animate hero content
        gsap.fromTo('.hero-badge', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero-description', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
    }
};

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const CustomCursor = {
    init: function() {
        // Only enable on desktop
        if (window.innerWidth < 768) return;
        
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (!cursor || !follower) return;
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .product-card, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        });
    }
};

/* ============================================
   NAVIGATION
   ============================================ */
const Navigation = {
    init: function() {
        const nav = document.querySelector('.main-nav');
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        // Hamburger menu with accessibility
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu(hamburger, mobileMenu);
            });
            
            // Keyboard support for hamburger
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu(hamburger, mobileMenu);
                }
            });
        }
        
        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(hamburger, mobileMenu);
            });
        });
        
        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                this.closeMobileMenu(hamburger, mobileMenu);
                hamburger?.focus();
            }
        });
        
        // Active link highlighting
        this.highlightActiveLink();
    },
    
    toggleMobileMenu: function(hamburger, mobileMenu) {
        const isOpen = hamburger.classList.toggle('active');
        mobileMenu?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', isOpen);
        
        // Focus management
        if (isOpen) {
            const firstLink = mobileMenu?.querySelector('.mobile-link');
            firstLink?.focus();
        }
    },
    
    closeMobileMenu: function(hamburger, mobileMenu) {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger?.setAttribute('aria-expanded', 'false');
    },
    
    highlightActiveLink: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
};

/* ============================================
   SCROLL ANIMATIONS (GSAP)
   ============================================ */
const ScrollAnimations = {
    init: function() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        this.animateBrandStatement();
        this.animateProducts();
        this.animateInnovation();
        this.animateStats();
        this.animateAbout();
        this.animateTestimonials();
        this.animateContact();
        this.parallaxEffects();
        this.scrollProgress();
    },
    
    animateBrandStatement: function() {
        // Animate description items
        gsap.utils.toArray('.desc-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.brand-statement',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Animate letters
        gsap.utils.toArray('.statement-text .letter').forEach((letter, index) => {
            gsap.fromTo(letter,
                { opacity: 0, y: 100, rotationX: -90 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.brand-statement',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    },
    
    animateProducts: function() {
        // Section header animation
        gsap.fromTo('.products-section .section-header',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.products-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Product cards animation
        gsap.utils.toArray('.product-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 80, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.products-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    },
    
    animateInnovation: function() {
        // Section header
        gsap.fromTo('.innovation-section .section-header',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.innovation-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Innovation items
        gsap.utils.toArray('.innovation-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.innovation-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Motor visualization
        gsap.fromTo('.motor-visualization',
            { opacity: 0, scale: 0.5, rotation: -180 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.innovation-section',
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },
    
    animateStats: function() {
        gsap.utils.toArray('.stat-item').forEach((stat, index) => {
            gsap.fromTo(stat,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.stats-section',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    },
    
    animateAbout: function() {
        // Text content
        gsap.fromTo('.about-text',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Visual content
        gsap.fromTo('.about-visual',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },
    
    animateTestimonials: function() {
        // Section header
        gsap.fromTo('.testimonials-section .section-header',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.testimonials-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Testimonial cards
        gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60, rotationY: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.testimonials-slider',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    },
    
    animateContact: function() {
        // Contact info
        gsap.fromTo('.contact-info',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Contact form
        gsap.fromTo('.contact-form-container',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },
    
    parallaxEffects: function() {
        // Hero orbs parallax
        gsap.utils.toArray('.gradient-orb').forEach((orb, index) => {
            gsap.to(orb, {
                y: -100 * (index + 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
        
        // Floating fan parallax
        gsap.to('.floating-fan', {
            y: 100,
            rotation: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    },
    
    scrollProgress: function() {
        // Add scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
};

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const CounterAnimation = {
    init: function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => this.animateCounter(counter, target),
                once: true
            });
        });
    },
    
    animateCounter: function(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
};

/* ============================================
   FORM HANDLER
   ============================================ */
const FormHandler = {
    init: function() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        }
    },
    
    handleSubmit: function(form) {
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<span>Sending...</span><div class="spinner" style="width:18px;height:18px;border-width:2px;"></div>';
        btn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
            btn.style.background = '#22c55e';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 2000);
    }
};

/* ============================================
   SMOOTH SCROLL
   ============================================ */
const SmoothScroll = {
    init: function() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 100
                        },
                        ease: 'power3.inOut'
                    });
                }
            });
        });
    }
};

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
const MagneticEffect = {
    init: function() {
        if (window.innerWidth < 768) return;
        
        const buttons = document.querySelectorAll('.btn-primary, .btn-explore');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
};

// Initialize magnetic effect after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    MagneticEffect.init();
});

/* ============================================
   3D TILT EFFECT FOR CARDS
   ============================================ */
const TiltEffect = {
    init: function() {
        if (window.innerWidth < 992) return;
        
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
};

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', () => {
    TiltEffect.init();
});
