/* ============================================
   GFC - Fans Page JavaScript
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    FansPagePreloader.init();
    Fan3DViewer.init();
    AirflowDemo.init();
    MotorAnimation.init();
    CircuitAnimation.init();
    ProductFilter.init();
    FansScrollAnimations.init();
    PartsAnimation.init();
});

/* ============================================
   PRELOADER
   ============================================ */
const FansPagePreloader = {
    init() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        // Animate out after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = '';
                        
                        // Trigger entrance animations
                        this.triggerEntranceAnimations();
                    }
                });
            }, 1500);
        });
    },

    triggerEntranceAnimations() {
        // Animate hero content
        gsap.timeline()
            .from('.breadcrumb', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            })
            .from('.product-hero-subtitle', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-stats .hero-stat', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.scroll-cta', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.2');
    }
};

/* ============================================
   3D FAN VIEWER
   ============================================ */
const Fan3DViewer = {
    isDragging: false,
    startX: 0,
    currentRotation: 0,
    targetRotation: 0,
    
    init() {
        const container = document.querySelector('.fan-3d-container');
        if (!container) return;

        this.fan = container.querySelector('.fan-3d');
        this.setupDragControls(container);
        this.animate();
    },

    setupDragControls(container) {
        // Mouse events
        container.addEventListener('mousedown', (e) => this.onDragStart(e));
        document.addEventListener('mousemove', (e) => this.onDragMove(e));
        document.addEventListener('mouseup', () => this.onDragEnd());

        // Touch events
        container.addEventListener('touchstart', (e) => this.onDragStart(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.onDragMove(e.touches[0]));
        document.addEventListener('touchend', () => this.onDragEnd());
    },

    onDragStart(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.fan.style.cursor = 'grabbing';
        
        // Stop any spinning animation
        gsap.killTweensOf('.fan-blade-assembly');
    },

    onDragMove(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        this.targetRotation = this.currentRotation + deltaX * 0.5;
        
        gsap.to(this.fan, {
            rotateY: this.targetRotation,
            duration: 0.1,
            ease: 'power1.out'
        });
    },

    onDragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.currentRotation = this.targetRotation;
        this.fan.style.cursor = 'grab';
    },

    animate() {
        // Auto-rotate when not dragging
        gsap.to('.fan-blade-assembly', {
            rotation: '+=360',
            duration: 4,
            ease: 'none',
            repeat: -1
        });
    }
};

/* ============================================
   AIRFLOW DEMO
   ============================================ */
const AirflowDemo = {
    init() {
        const container = document.querySelector('.airflow-container');
        if (!container) return;

        this.createParticles(container);
        this.setupScrollTrigger(container);
    },

    createParticles(container) {
        const airParticles = container.querySelector('.air-particles');
        if (!airParticles) return;

        // Create additional particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'air-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 5}px;
                height: ${3 + Math.random() * 5}px;
                background: rgba(212, 175, 55, ${0.2 + Math.random() * 0.4});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;
            airParticles.appendChild(particle);
        }
    },

    setupScrollTrigger(container) {
        ScrollTrigger.create({
            trigger: container,
            start: 'top center',
            onEnter: () => this.startAnimation(),
            onLeaveBack: () => this.stopAnimation()
        });
    },

    startAnimation() {
        // Animate particles
        gsap.utils.toArray('.air-particle').forEach((particle, i) => {
            gsap.to(particle, {
                opacity: 1,
                y: 100 + Math.random() * 100,
                x: (Math.random() - 0.5) * 200,
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: -1,
                ease: 'power1.out',
                onRepeat: function() {
                    gsap.set(particle, {
                        y: 0,
                        x: 0,
                        left: Math.random() * 100 + '%'
                    });
                }
            });
        });

        // Animate fan blades
        gsap.to('.demo-blades', {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: 'none'
        });
    },

    stopAnimation() {
        gsap.killTweensOf('.air-particle');
        gsap.killTweensOf('.demo-blades');
    }
};

/* ============================================
   MOTOR ANIMATION
   ============================================ */
const MotorAnimation = {
    init() {
        const motorSection = document.querySelector('.motor-section');
        if (!motorSection) return;

        this.setupScrollTrigger(motorSection);
        this.setupHoverEffects();
    },

    setupScrollTrigger(section) {
        // Animate motor components on scroll
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => this.animateMotor()
        });

        // Section header animation
        gsap.from(section.querySelector('.section-header'), {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%'
            }
        });
    },

    animateMotor() {
        const tl = gsap.timeline();

        // Animate shell appearing
        tl.from('.motor-outer-shell', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        })
        // Animate copper windings glowing
        .to('.winding', {
            boxShadow: '0 0 20px rgba(205, 127, 50, 0.8)',
            duration: 0.5,
            stagger: 0.1,
            yoyo: true,
            repeat: 1
        }, '-=0.3')
        // Animate rotor spinning
        .to('.motor-rotor-display', {
            rotation: 360,
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1
        }, '-=0.5')
        // Show labels
        .to('.motor-label', {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2
        }, '-=1');
    },

    setupHoverEffects() {
        // Feature cards hover
        const features = document.querySelectorAll('.motor-feature');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                gsap.to(feature, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            feature.addEventListener('mouseleave', () => {
                gsap.to(feature, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
};

/* ============================================
   CIRCUIT ANIMATION
   ============================================ */
const CircuitAnimation = {
    init() {
        const circuitSection = document.querySelector('.circuit-section');
        if (!circuitSection) return;

        this.setupScrollTrigger(circuitSection);
        this.createPowerFlowParticles();
    },

    setupScrollTrigger(section) {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => this.animateCircuit()
        });
    },

    animateCircuit() {
        const tl = gsap.timeline();

        // Animate PCB appearing
        tl.from('.pcb-base', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        // Animate traces drawing
        .from('.trace', {
            scaleX: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        })
        // Animate components appearing
        .from('.component', {
            y: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.5)'
        })
        // Animate IC chip glowing
        .to('.chip-body', {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
    },

    createPowerFlowParticles() {
        const powerFlow = document.querySelector('.power-flow');
        if (!powerFlow) return;

        // Clear existing particles
        powerFlow.innerHTML = '';

        // Create new particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'flow-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--primary);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--primary);
                top: 48px;
                left: 30px;
                opacity: 0;
            `;
            powerFlow.appendChild(particle);

            // Animate each particle
            gsap.to(particle, {
                left: 180,
                opacity: 1,
                duration: 2,
                delay: i * 0.4,
                repeat: -1,
                ease: 'power1.inOut',
                onRepeat: function() {
                    gsap.set(particle, { left: 30, opacity: 0 });
                }
            });
        }
    }
};

/* ============================================
   PRODUCT FILTER
   ============================================ */
const ProductFilter = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const products = document.querySelectorAll('.product-item');

        if (!filterBtns.length || !products.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                this.filterProducts(filter, products);
            });
        });
    },

    filterProducts(filter, products) {
        products.forEach(product => {
            const category = product.dataset.category;
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                gsap.to(product, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    onStart: () => {
                        product.style.display = 'block';
                    }
                });
            } else {
                gsap.to(product, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.4,
                    ease: 'power2.out',
                    onComplete: () => {
                        product.style.display = 'none';
                    }
                });
            }
        });
    }
};

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
const FansScrollAnimations = {
    init() {
        this.animateSectionHeaders();
        this.animateProductCards();
        this.animateFeaturedProduct();
        this.animateInfoItems();
        this.animatePartsSection();
        this.setupSmoothScroll();
    },

    animateSectionHeaders() {
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    animateProductCards() {
        gsap.utils.toArray('.product-item').forEach((card, i) => {
            gsap.from(card, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    animateFeaturedProduct() {
        const featured = document.querySelector('.featured-product');
        if (!featured) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: featured,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from('.product-badge', {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        })
        .from('.featured-fan', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        }, '-=0.3')
        .from('.featured-name > *', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.featured-description', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.spec-row', {
            x: -30,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.featured-price', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.featured-actions button', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');

        // Animate spotlight rings continuously
        gsap.to('.spotlight-ring', {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            stagger: 0.5,
            repeat: -1,
            ease: 'power1.out'
        });

        // Rotate featured fan blades slowly
        gsap.to('.lux-blades', {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: 'none'
        });
    },

    animateInfoItems() {
        gsap.utils.toArray('.info-item').forEach((item, i) => {
            gsap.from(item, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    animatePartsSection() {
        gsap.utils.toArray('.part-item').forEach((item, i) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }
};

/* ============================================
   PARTS ANIMATION
   ============================================ */
const PartsAnimation = {
    init() {
        const partsSection = document.querySelector('.parts-section');
        if (!partsSection) return;

        this.setupExplodedView();
    },

    setupExplodedView() {
        const parts = document.querySelectorAll('.part-item');
        
        ScrollTrigger.create({
            trigger: '.parts-section',
            start: 'top center',
            onEnter: () => {
                gsap.from(parts, {
                    y: (i) => (i - 2) * -50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.2)'
                });
            }
        });
    }
};

/* ============================================
   NAVIGATION SCROLL EFFECT
   ============================================ */
const NavScrollEffect = {
    init() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
};

// Initialize navigation
NavScrollEffect.init();

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
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

/* ============================================
   PRODUCT CARD TILT EFFECT
   ============================================ */
document.querySelectorAll('.product-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
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

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const CounterAnimation = {
    init() {
        const stats = document.querySelectorAll('.hero-stat .stat-value');
        
        stats.forEach(stat => {
            const target = stat.textContent;
            const numMatch = target.match(/[\d.]+/);
            if (numMatch) {
                const num = parseFloat(numMatch[0]);
                const suffix = target.replace(numMatch[0], '');
                
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 90%'
                    },
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].textContent) + suffix;
                    }
                });
            }
        });
    }
};

CounterAnimation.init();

console.log('🌀 GFC Fans Page Loaded Successfully!');
