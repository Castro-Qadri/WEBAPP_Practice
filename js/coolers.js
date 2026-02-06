/* ============================================
   GFC - Coolers Page JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initialize all modules
    CoolerPreloader.init();
    CoolerNavigation.init();
    Cooler3DViewer.init();
    CoolingProcessDemo.init();
    CoolerMotorAnimation.init();
    PadsComparison.init();
    CoolerPartsAnimation.init();
    CoolerProductFilter.init();
    CoolerScrollAnimations.init();
    CoolerCustomCursor.init();
});

/* ============================================
   PRELOADER MODULE
   ============================================ */
const CoolerPreloader = {
    init() {
        const preloader = document.querySelector('.preloader');
        const fan = document.querySelector('.grill-fan');
        const waves = document.querySelectorAll('.cool-waves span');
        
        if (!preloader) return;
        
        // Add spinning class
        if (fan) fan.classList.add('spinning');
        
        // Animate waves
        gsap.fromTo(waves, {
            scaleX: 0.3,
            opacity: 0.5
        }, {
            scaleX: 1.5,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            repeat: -1,
            yoyo: true
        });
        
        // Hide preloader after loading
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                delay: 1,
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    CoolerPreloader.animateHero();
                }
            });
        });
    },
    
    animateHero() {
        const heroContent = document.querySelector('.hero-content');
        const cooler3D = document.querySelector('.cooler-3d');
        
        // Animate hero content
        gsap.from(heroContent, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate 3D cooler
        if (cooler3D) {
            gsap.from(cooler3D, {
                x: 100,
                opacity: 0,
                rotationY: -30,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3
            });
        }
    }
};

/* ============================================
   NAVIGATION MODULE
   ============================================ */
const CoolerNavigation = {
    init() {
        const nav = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        // Scroll behavior for navbar
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
        
        // Mobile menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
        
        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: target, offsetY: 80 },
                            ease: 'power3.inOut'
                        });
                    }
                }
            });
        });
    }
};

/* ============================================
   COOLER 3D VIEWER
   ============================================ */
const Cooler3DViewer = {
    init() {
        const container = document.querySelector('.cooler-3d-container');
        const cooler = document.querySelector('.cooler-3d');
        
        if (!container || !cooler) return;
        
        // Interactive rotation on mouse move
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(cooler, {
                rotationY: x * 20,
                rotationX: -y * 15,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        container.addEventListener('mouseleave', () => {
            gsap.to(cooler, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        
        // Speed control simulation
        const speedBtns = document.querySelectorAll('.speed-btn');
        const innerFan = document.querySelector('.inner-fan');
        
        speedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                speedBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const speed = btn.dataset.speed;
                let duration;
                
                switch(speed) {
                    case '1': duration = 4; break;
                    case '2': duration = 2; break;
                    case '3': duration = 0.8; break;
                    default: duration = 2;
                }
                
                if (innerFan) {
                    gsap.to(innerFan, {
                        rotation: '+=360',
                        duration: duration,
                        ease: 'none',
                        repeat: -1
                    });
                }
            });
        });
        
        // Auto-animate air output waves
        this.animateAirWaves();
        
        // Animate water tank
        this.animateWaterTank();
    },
    
    animateAirWaves() {
        const waves = document.querySelectorAll('.air-wave');
        
        waves.forEach((wave, i) => {
            gsap.to(wave, {
                x: 40,
                scaleX: 2,
                opacity: 0,
                duration: 1.5,
                delay: i * 0.3,
                repeat: -1,
                ease: 'power2.out'
            });
        });
    },
    
    animateWaterTank() {
        const waterFill = document.querySelector('.water-fill-hero');
        
        if (waterFill) {
            gsap.to(waterFill, {
                height: '65%',
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }
    }
};

/* ============================================
   COOLING PROCESS DEMO
   ============================================ */
const CoolingProcessDemo = {
    init() {
        const section = document.querySelector('.cooling-tech-section');
        if (!section) return;
        
        // Animate particles
        this.animateParticles();
        
        // Animate water drops
        this.animateWaterDrops();
        
        // Animate blower wheel
        this.animateBlower();
        
        // Scroll-triggered animations
        ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            onEnter: () => this.playProcessAnimation()
        });
    },
    
    animateParticles() {
        const particles = document.querySelectorAll('.air-particles .particle');
        
        particles.forEach((particle, i) => {
            gsap.to(particle, {
                x: 'random(-15, 15)',
                y: 'random(-15, 15)',
                duration: 'random(1, 2)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2
            });
        });
    },
    
    animateWaterDrops() {
        const drops = document.querySelectorAll('.drop');
        
        drops.forEach((drop, i) => {
            gsap.to(drop, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                delay: i * 0.5,
                ease: 'power1.in'
            });
        });
    },
    
    animateBlower() {
        const blowerWheel = document.querySelector('.blower-wheel');
        if (blowerWheel) {
            blowerWheel.classList.add('spinning');
        }
    },
    
    playProcessAnimation() {
        const steps = document.querySelectorAll('.process-step');
        
        gsap.from(steps, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Animate temperature displays
        const hotTemp = document.querySelector('.temp-display.hot');
        const coolTemp = document.querySelector('.temp-display.cool');
        
        if (hotTemp) {
            gsap.from(hotTemp, {
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }
        
        if (coolTemp) {
            gsap.from(coolTemp, {
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                delay: 0.8,
                ease: 'back.out(1.7)'
            });
        }
    }
};

/* ============================================
   MOTOR ANIMATION
   ============================================ */
const CoolerMotorAnimation = {
    init() {
        const motorSection = document.querySelector('.motor-section');
        if (!motorSection) return;
        
        // Start motor animations on scroll
        ScrollTrigger.create({
            trigger: motorSection,
            start: 'top 60%',
            onEnter: () => this.startMotorAnimation()
        });
        
        // Animate feature icons
        this.animateFeatureIcons();
    },
    
    startMotorAnimation() {
        const rotor = document.querySelector('.motor-rotor-c');
        const cageBlades = document.querySelector('.cage-blades');
        const windings = document.querySelectorAll('.winding-c');
        
        // Add spinning classes
        if (rotor) rotor.classList.add('spinning');
        if (cageBlades) cageBlades.classList.add('spinning');
        
        // Animate copper windings glow
        if (windings.length) {
            gsap.to(windings, {
                boxShadow: '0 0 20px rgba(205, 127, 50, 0.8)',
                duration: 0.5,
                stagger: 0.1,
                repeat: -1,
                yoyo: true
            });
        }
        
        // Animate labels
        const labels = document.querySelectorAll('.motor-label');
        gsap.from(labels, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
    },
    
    animateFeatureIcons() {
        // Air arrows animation
        const airArrows = document.querySelectorAll('.air-arrow span');
        airArrows.forEach((arrow, i) => {
            gsap.to(arrow, {
                x: 20,
                opacity: 0,
                duration: 1,
                delay: i * 0.2,
                repeat: -1,
                ease: 'power2.out'
            });
        });
        
        // Pump drop animation
        const pumpDrop = document.querySelector('.pump-drop');
        if (pumpDrop) {
            gsap.to(pumpDrop, {
                y: 25,
                opacity: 0,
                duration: 1,
                repeat: -1,
                ease: 'power2.in'
            });
        }
    }
};

/* ============================================
   PADS COMPARISON
   ============================================ */
const PadsComparison = {
    init() {
        const padsSection = document.querySelector('.pads-section');
        if (!padsSection) return;
        
        // Animate on scroll
        ScrollTrigger.create({
            trigger: padsSection,
            start: 'top 60%',
            onEnter: () => this.animatePads()
        });
    },
    
    animatePads() {
        const padTypes = document.querySelectorAll('.pad-type');
        const vsBadge = document.querySelector('.vs-badge');
        const benefits = document.querySelectorAll('.benefit');
        
        // Animate pad comparison
        gsap.from(padTypes, {
            x: (i) => i === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        if (vsBadge) {
            gsap.from(vsBadge, {
                scale: 0,
                rotation: 180,
                duration: 0.6,
                delay: 0.4,
                ease: 'back.out(1.7)'
            });
        }
        
        // Animate benefits
        gsap.from(benefits, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        // Animate honeycomb hexes
        const hexes = document.querySelectorAll('.hex, .hex-3d');
        gsap.from(hexes, {
            scale: 0,
            rotation: 30,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.8,
            ease: 'back.out(1.7)'
        });
    }
};

/* ============================================
   PARTS ANIMATION
   ============================================ */
const CoolerPartsAnimation = {
    init() {
        const partsSection = document.querySelector('.parts-section');
        if (!partsSection) return;
        
        // Animated fan parts
        const blowerFan = document.querySelector('.blower-fan');
        if (blowerFan) blowerFan.classList.add('spinning');
        
        // Water tank wave
        this.animateTankWave();
        
        // Scroll animation for parts
        ScrollTrigger.create({
            trigger: partsSection,
            start: 'top 60%',
            onEnter: () => this.animateParts()
        });
    },
    
    animateTankWave() {
        const tankWave = document.querySelector('.tank-wave');
        if (tankWave) {
            gsap.to(tankWave, {
                x: '-50%',
                duration: 2,
                repeat: -1,
                ease: 'none'
            });
        }
    },
    
    animateParts() {
        const partItems = document.querySelectorAll('.part-item');
        
        gsap.from(partItems, {
            y: 80,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
        
        // Hover effect for parts
        partItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -20,
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                    duration: 0.3
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.3
                });
            });
        });
    }
};

/* ============================================
   PRODUCT FILTER
   ============================================ */
const CoolerProductFilter = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        if (!filterBtns.length || !productCards.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter products
                productCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        gsap.to(card, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.4,
                            display: 'block',
                            ease: 'power2.out'
                        });
                    } else {
                        gsap.to(card, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.4,
                            display: 'none',
                            ease: 'power2.in'
                        });
                    }
                });
            });
        });
        
        // Hover animations for product cards
        productCards.forEach(card => {
            const fan = card.querySelector('.pc-fan, .pp-fan, .rc-fan, .eco-fan');
            
            card.addEventListener('mouseenter', () => {
                if (fan) {
                    gsap.to(fan, {
                        rotation: 360,
                        duration: 1,
                        repeat: -1,
                        ease: 'none'
                    });
                }
                
                gsap.to(card, {
                    y: -15,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                if (fan) {
                    gsap.killTweensOf(fan);
                    gsap.to(fan, {
                        rotation: 0,
                        duration: 0.5
                    });
                }
                
                gsap.to(card, {
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.3
                });
            });
        });
    }
};

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
const CoolerScrollAnimations = {
    init() {
        // Section headers
        this.animateSectionHeaders();
        
        // Feature stats
        this.animateStats();
        
        // Parallax effects
        this.initParallax();
        
        // CTA section
        this.animateCTA();
    },
    
    animateSectionHeaders() {
        const headers = document.querySelectorAll('.section-header');
        
        headers.forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    },
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number, .feature-value');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (isNaN(target)) return;
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(stat, {
                        textContent: 0,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            stat.textContent = Math.round(this.targets()[0].textContent);
                        }
                    });
                },
                once: true
            });
        });
    },
    
    initParallax() {
        // Background parallax
        gsap.utils.toArray('.parallax-bg').forEach(bg => {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -100,
                ease: 'none'
            });
        });
    },
    
    animateCTA() {
        const cta = document.querySelector('.cta');
        if (!cta) return;
        
        gsap.from(cta, {
            scrollTrigger: {
                trigger: cta,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Button hover effects
        const buttons = cta.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }
};

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const CoolerCustomCursor = {
    init() {
        // Check for touch device
        if ('ontouchstart' in window) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <div class="cursor-dot"></div>
            <div class="cursor-ring"></div>
        `;
        document.body.appendChild(cursor);
        
        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                pointer-events: none;
                z-index: 10000;
            }
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
            }
            .cursor-ring {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(212, 175, 55, 0.5);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: width 0.3s, height 0.3s, border-color 0.3s;
            }
            .cursor-hover .cursor-ring {
                width: 60px;
                height: 60px;
                border-color: #3b82f6;
            }
            .cursor-hover .cursor-dot {
                background: #3b82f6;
            }
        `;
        document.head.appendChild(style);
        
        // Track cursor
        document.addEventListener('mousemove', (e) => {
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .product-card, .part-item, .benefit');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }
};

/* ============================================
   UTILITIES
   ============================================ */
// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Smooth scroll to top
function scrollToTop() {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: 0 },
        ease: 'power3.inOut'
    });
}
