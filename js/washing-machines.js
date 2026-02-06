/* ============================================
   GFC - Washing Machines Page JavaScript
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    WasherPreloader.init();
    WashCycleDemo.init();
    MotorVisualization.init();
    ProductFilterWasher.init();
    WasherScrollAnimations.init();
    SmartFeaturesAnimation.init();
});

/* ============================================
   PRELOADER
   ============================================ */
const WasherPreloader = {
    init() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = '';
                        this.triggerEntranceAnimations();
                    }
                });
            }, 1500);
        });
    },

    triggerEntranceAnimations() {
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
            .from('.washer-3d-container', {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.5)'
            }, '-=0.4');
    }
};

/* ============================================
   WASH CYCLE DEMO
   ============================================ */
const WashCycleDemo = {
    currentStage: 'soak',
    stages: ['soak', 'wash', 'rinse', 'spin'],
    
    init() {
        const section = document.querySelector('.wash-cycle-section');
        if (!section) return;

        this.drum = document.getElementById('animatedDrum');
        this.waterLevel = document.getElementById('waterLevel');
        this.waterContainer = document.querySelector('.water-container');
        
        this.setupStageButtons();
        this.setupScrollTrigger(section);
    },

    setupStageButtons() {
        const stages = document.querySelectorAll('.wash-stage');
        stages.forEach(stage => {
            stage.addEventListener('click', () => {
                const stageType = stage.dataset.stage;
                this.setStage(stageType);
                
                // Update active state
                stages.forEach(s => s.classList.remove('active'));
                stage.classList.add('active');
            });
        });
    },

    setupScrollTrigger(section) {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => this.startAnimation()
        });
    },

    startAnimation() {
        this.setStage('soak');
        
        // Auto-cycle through stages
        let stageIndex = 0;
        this.cycleInterval = setInterval(() => {
            stageIndex = (stageIndex + 1) % this.stages.length;
            this.setStage(this.stages[stageIndex]);
            
            // Update UI
            const stages = document.querySelectorAll('.wash-stage');
            stages.forEach(s => s.classList.remove('active'));
            stages[stageIndex].classList.add('active');
        }, 4000);
    },

    setStage(stage) {
        this.currentStage = stage;
        
        switch(stage) {
            case 'soak':
                this.soakAnimation();
                break;
            case 'wash':
                this.washAnimation();
                break;
            case 'rinse':
                this.rinseAnimation();
                break;
            case 'spin':
                this.spinAnimation();
                break;
        }
    },

    soakAnimation() {
        // Slow fill, no rotation
        gsap.killTweensOf(this.drum);
        gsap.to(this.drum, { rotation: 0, duration: 0.5 });
        gsap.to(this.waterContainer, { height: '50%', duration: 2, ease: 'power1.out' });
        
        // Gentle bubble animation
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.animationDuration = '3s';
        });
    },

    washAnimation() {
        // Full water, alternating rotation
        gsap.to(this.waterContainer, { height: '60%', duration: 1 });
        
        // Agitation animation
        gsap.to(this.drum, {
            rotation: '+=180',
            duration: 1,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
        
        // Active bubbles
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.animationDuration = '1.5s';
        });
    },

    rinseAnimation() {
        // Water draining and refilling
        gsap.killTweensOf(this.drum);
        
        // Gentle rotation
        gsap.to(this.drum, {
            rotation: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
        
        // Water level changes
        gsap.timeline({ repeat: -1 })
            .to(this.waterContainer, { height: '20%', duration: 1.5 })
            .to(this.waterContainer, { height: '50%', duration: 1.5 });
    },

    spinAnimation() {
        // No water, fast spin
        gsap.to(this.waterContainer, { height: '5%', duration: 1, ease: 'power2.out' });
        
        gsap.killTweensOf(this.drum);
        gsap.to(this.drum, {
            rotation: '+=3600',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
        
        // Hide bubbles
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.opacity = '0';
        });
    },

    destroy() {
        if (this.cycleInterval) {
            clearInterval(this.cycleInterval);
        }
        gsap.killTweensOf(this.drum);
    }
};

/* ============================================
   MOTOR VISUALIZATION
   ============================================ */
const MotorVisualization = {
    init() {
        const motorSection = document.querySelector('.washer-motor-section');
        if (!motorSection) return;

        this.setupScrollTrigger(motorSection);
        this.setupFeatureAnimations();
    },

    setupScrollTrigger(section) {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => this.animateMotor()
        });

        // Header animation
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

        // Motor assembly appearing
        tl.from('.direct-drive-motor', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        })
        // Coils lighting up
        .to('.copper-coils .coil', {
            boxShadow: '0 0 25px rgba(205, 127, 50, 0.8)',
            duration: 0.3,
            stagger: 0.1
        }, '-=0.3')
        // Rotor spinning
        .to('.rotor-body', {
            rotation: 360,
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1
        }, '-=0.5')
        // Labels appearing
        .to('.motor-label', {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2
        }, '-=1');
    },

    setupFeatureAnimations() {
        gsap.utils.toArray('.motor-feature').forEach((feature, i) => {
            gsap.from(feature, {
                x: -50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 85%'
                }
            });
        });
    }
};

/* ============================================
   PRODUCT FILTER
   ============================================ */
const ProductFilterWasher = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const products = document.querySelectorAll('.product-item');

        if (!filterBtns.length || !products.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
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
const WasherScrollAnimations = {
    init() {
        this.animateSectionHeaders();
        this.animateProductCards();
        this.animateFeaturedWasher();
        this.animatePartsSection();
        this.setupSmoothScroll();
        this.setupNavScroll();
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
                delay: (i % 3) * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    animateFeaturedWasher() {
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
            duration: 0.6
        })
        .from('.featured-washer', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        }, '-=0.3')
        .from('.featured-name > *', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.5')
        .from('.featured-description', {
            y: 30,
            opacity: 0,
            duration: 0.5
        }, '-=0.3')
        .from('.spec-row', {
            x: -30,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1
        }, '-=0.3');

        // Continuous animations
        gsap.to('.spotlight-ring', {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            stagger: 0.5,
            repeat: -1,
            ease: 'power1.out'
        });

        gsap.to('.lux-drum', {
            rotation: 360,
            duration: 6,
            repeat: -1,
            ease: 'none'
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
                    start: 'top 85%'
                }
            });
        });
    },

    setupSmoothScroll() {
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
    },

    setupNavScroll() {
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

/* ============================================
   SMART FEATURES ANIMATION
   ============================================ */
const SmartFeaturesAnimation = {
    init() {
        const section = document.querySelector('.smart-features-section');
        if (!section) return;

        this.animateFeatures();
    },

    animateFeatures() {
        gsap.utils.toArray('.smart-feature').forEach((feature, i) => {
            gsap.from(feature, {
                y: 60,
                opacity: 0,
                duration: 0.6,
                delay: (i % 3) * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 85%'
                }
            });
        });
    }
};

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
   PRODUCT CARD EFFECTS
   ============================================ */
document.querySelectorAll('.product-item').forEach(card => {
    // Hover drum spin
    card.addEventListener('mouseenter', () => {
        const drum = card.querySelector('.pw-drum');
        if (drum) {
            gsap.to(drum, {
                rotation: '+=360',
                duration: 1.5,
                ease: 'none',
                repeat: -1
            });
        }
    });

    card.addEventListener('mouseleave', () => {
        const drum = card.querySelector('.pw-drum');
        if (drum) {
            gsap.killTweensOf(drum);
        }
    });

    // Tilt effect
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
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5
        });
    });
});

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const CounterAnimationWasher = {
    init() {
        const stats = document.querySelectorAll('.hero-stat .stat-value');
        
        stats.forEach(stat => {
            const target = stat.textContent;
            const numMatch = target.match(/[\d.]+/);
            if (numMatch) {
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

CounterAnimationWasher.init();

/* ============================================
   WATER WAVE EFFECT ON HERO
   ============================================ */
const HeroWaterEffect = {
    init() {
        // Animate the water wave in the hero washer
        const waterWave = document.querySelector('.water-wave');
        if (waterWave) {
            gsap.to(waterWave, {
                x: 300,
                duration: 3,
                ease: 'none',
                repeat: -1
            });
        }
    }
};

HeroWaterEffect.init();

console.log('🧺 GFC Washing Machines Page Loaded Successfully!');
