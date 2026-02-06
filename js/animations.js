/* ============================================
   GFC - Advanced Animations
   Product Page Specific Animations
   ============================================ */

/* ============================================
   SCROLL SEQUENCE ANIMATION
   For Product Detail Pages
   ============================================ */
const ScrollSequence = {
    init: function(config) {
        this.container = document.querySelector(config.container);
        this.frames = config.frames || 60;
        this.currentFrame = 0;
        this.images = [];
        this.loaded = false;
        
        if (!this.container) return;
        
        this.preloadImages(config.imagePath, config.imagePrefix);
        this.setupScrollTrigger();
    },
    
    preloadImages: function(path, prefix) {
        for (let i = 1; i <= this.frames; i++) {
            const img = new Image();
            img.src = `${path}/${prefix}${i.toString().padStart(4, '0')}.webp`;
            this.images.push(img);
        }
        
        // Check if all images loaded
        Promise.all(this.images.map(img => {
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })).then(() => {
            this.loaded = true;
            this.render();
        });
    },
    
    setupScrollTrigger: function() {
        const self = this;
        
        ScrollTrigger.create({
            trigger: this.container,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            onUpdate: function(self) {
                const frame = Math.floor(self.progress * (self.frames - 1));
                if (frame !== self.currentFrame) {
                    self.currentFrame = frame;
                    self.render();
                }
            }.bind(this)
        });
    },
    
    render: function() {
        if (!this.loaded || !this.images[this.currentFrame]) return;
        
        const canvas = this.container.querySelector('canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.images[this.currentFrame], 0, 0, canvas.width, canvas.height);
    }
};

/* ============================================
   3D PRODUCT VIEWER
   ============================================ */
const ProductViewer3D = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.isDragging = false;
        this.previousX = 0;
        this.rotationY = 0;
        
        this.setupEventListeners();
        this.animate();
    },
    
    setupEventListeners: function() {
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousX = e.clientX;
            this.container.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.clientX - this.previousX;
            this.rotationY += deltaX * 0.5;
            this.previousX = e.clientX;
            
            this.updateRotation();
        });
        
        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.previousX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', () => {
            this.isDragging = false;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.touches[0].clientX - this.previousX;
            this.rotationY += deltaX * 0.5;
            this.previousX = e.touches[0].clientX;
            
            this.updateRotation();
        });
    },
    
    updateRotation: function() {
        const product = this.container.querySelector('.product-3d');
        if (product) {
            product.style.transform = `rotateY(${this.rotationY}deg)`;
        }
    },
    
    animate: function() {
        if (!this.isDragging) {
            this.rotationY += 0.2;
            this.updateRotation();
        }
        requestAnimationFrame(() => this.animate());
    }
};

/* ============================================
   EXPLODED VIEW ANIMATION
   Shows product parts separating
   ============================================ */
const ExplodedView = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.parts = this.container.querySelectorAll('.explode-part');
        this.isExploded = false;
        
        this.setupScrollAnimation();
    },
    
    setupScrollAnimation: function() {
        const parts = this.parts;
        
        ScrollTrigger.create({
            trigger: this.container,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                
                parts.forEach((part, index) => {
                    const direction = part.dataset.direction || 'up';
                    const distance = (part.dataset.distance || 100) * progress;
                    
                    let transform = '';
                    
                    switch(direction) {
                        case 'up':
                            transform = `translateY(-${distance}px)`;
                            break;
                        case 'down':
                            transform = `translateY(${distance}px)`;
                            break;
                        case 'left':
                            transform = `translateX(-${distance}px)`;
                            break;
                        case 'right':
                            transform = `translateX(${distance}px)`;
                            break;
                        case 'out':
                            const angle = (index / parts.length) * 360;
                            const x = Math.cos(angle * Math.PI / 180) * distance;
                            const y = Math.sin(angle * Math.PI / 180) * distance;
                            transform = `translate(${x}px, ${y}px)`;
                            break;
                    }
                    
                    part.style.transform = transform;
                    part.style.opacity = 1 - (progress * 0.3);
                });
            }
        });
    }
};

/* ============================================
   MOTOR CUTAWAY ANIMATION
   ============================================ */
const MotorCutaway = {
    init: function() {
        this.setupAnimation();
    },
    
    setupAnimation: function() {
        const motor = document.querySelector('.motor-cutaway');
        if (!motor) return;
        
        // Animate copper windings
        gsap.to('.copper-winding', {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'none',
            scrollTrigger: {
                trigger: motor,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });
        
        // Animate rotor spin
        gsap.to('.motor-rotor-detail', {
            rotation: 360,
            duration: 2,
            ease: 'none',
            repeat: -1
        });
        
        // Animate magnetic field lines
        gsap.to('.magnetic-field-line', {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            scrollTrigger: {
                trigger: motor,
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });
    }
};

/* ============================================
   FEATURE HIGHLIGHT ANIMATION
   ============================================ */
const FeatureHighlight = {
    init: function() {
        this.features = document.querySelectorAll('.feature-highlight');
        if (!this.features.length) return;
        
        this.setupAnimations();
    },
    
    setupAnimations: function() {
        this.features.forEach((feature, index) => {
            // Initial state
            gsap.set(feature, { opacity: 0, y: 50 });
            
            // Animate in on scroll
            gsap.to(feature, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // Highlight animation
            const highlightLine = feature.querySelector('.highlight-line');
            if (highlightLine) {
                gsap.fromTo(highlightLine,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        delay: index * 0.1 + 0.3,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: feature,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        });
    }
};

/* ============================================
   HORIZONTAL SCROLL GALLERY
   ============================================ */
const HorizontalGallery = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.setupHorizontalScroll();
    },
    
    setupHorizontalScroll: function() {
        const container = this.container;
        const wrapper = container.querySelector('.gallery-wrapper');
        
        if (!wrapper) return;
        
        const scrollWidth = wrapper.scrollWidth - window.innerWidth;
        
        gsap.to(wrapper, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: `+=${scrollWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });
    }
};

/* ============================================
   PRODUCT COMPARISON SLIDER
   ============================================ */
const ComparisonSlider = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slider = this.container.querySelector('.comparison-slider');
        this.beforeImage = this.container.querySelector('.before-image');
        this.isDragging = false;
        
        this.setupEventListeners();
    },
    
    setupEventListeners: function() {
        this.slider.addEventListener('mousedown', () => this.isDragging = true);
        document.addEventListener('mouseup', () => this.isDragging = false);
        
        this.container.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.updateSlider(e);
        });
        
        // Touch events
        this.slider.addEventListener('touchstart', () => this.isDragging = true);
        document.addEventListener('touchend', () => this.isDragging = false);
        
        this.container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            this.updateSlider(e.touches[0]);
        });
    },
    
    updateSlider: function(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        this.slider.style.left = percentage + '%';
        this.beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
};

/* ============================================
   AIRFLOW VISUALIZATION
   ============================================ */
const AirflowVisualization = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.createParticles();
        this.animate();
    },
    
    createParticles: function() {
        this.particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'airflow-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(212, 175, 55, 0.6);
                border-radius: 50%;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: Math.random() * 100,
                y: 50 + (Math.random() - 0.5) * 30,
                speed: 1 + Math.random() * 2,
                size: 2 + Math.random() * 4
            });
        }
    },
    
    animate: function() {
        this.particles.forEach(particle => {
            particle.x += particle.speed;
            
            if (particle.x > 100) {
                particle.x = 0;
                particle.y = 50 + (Math.random() - 0.5) * 30;
            }
            
            // Wave motion
            const wave = Math.sin(particle.x * 0.1) * 10;
            
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = (particle.y + wave) + '%';
            particle.element.style.width = particle.size + 'px';
            particle.element.style.height = particle.size + 'px';
            particle.element.style.opacity = 0.3 + (particle.x / 100) * 0.7;
        });
        
        requestAnimationFrame(() => this.animate());
    }
};

/* ============================================
   TEXT SCRAMBLE EFFECT
   ============================================ */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ============================================
   SCROLL-TRIGGERED VIDEO
   ============================================ */
const ScrollVideo = {
    init: function(videoId) {
        this.video = document.getElementById(videoId);
        if (!this.video) return;
        
        this.setupScrollTrigger();
    },
    
    setupScrollTrigger: function() {
        const video = this.video;
        
        ScrollTrigger.create({
            trigger: video,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => video.play(),
            onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
            onLeaveBack: () => video.pause()
        });
    }
};

/* ============================================
   PRODUCT SPECS REVEAL
   ============================================ */
const SpecsReveal = {
    init: function() {
        const specs = document.querySelectorAll('.spec-item');
        if (!specs.length) return;
        
        specs.forEach((spec, index) => {
            const value = spec.querySelector('.spec-value');
            const bar = spec.querySelector('.spec-bar-fill');
            const targetValue = parseInt(value?.dataset.value || 0);
            
            ScrollTrigger.create({
                trigger: spec,
                start: 'top 85%',
                onEnter: () => {
                    // Animate number
                    if (value) {
                        gsap.to({val: 0}, {
                            val: targetValue,
                            duration: 1.5,
                            ease: 'power2.out',
                            onUpdate: function() {
                                value.textContent = Math.round(this.targets()[0].val);
                            }
                        });
                    }
                    
                    // Animate bar
                    if (bar) {
                        gsap.fromTo(bar,
                            { scaleX: 0 },
                            {
                                scaleX: 1,
                                duration: 1.5,
                                ease: 'power2.out',
                                delay: 0.2
                            }
                        );
                    }
                },
                once: true
            });
        });
    }
};

/* ============================================
   STICKY PRODUCT DETAILS
   ============================================ */
const StickyProductDetails = {
    init: function() {
        const productImage = document.querySelector('.product-sticky-image');
        const productDetails = document.querySelector('.product-sticky-details');
        
        if (!productImage || !productDetails) return;
        
        ScrollTrigger.create({
            trigger: productDetails,
            start: 'top top',
            end: 'bottom bottom',
            pin: productImage,
            pinSpacing: false
        });
        
        // Animate detail sections
        const sections = productDetails.querySelectorAll('.detail-section');
        
        sections.forEach((section, index) => {
            gsap.fromTo(section,
                { opacity: 0.3 },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1
                    }
                }
            );
        });
    }
};

/* ============================================
   INITIALIZE PAGE-SPECIFIC ANIMATIONS
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a product page
    if (document.querySelector('.product-page')) {
        FeatureHighlight.init();
        SpecsReveal.init();
        StickyProductDetails.init();
        
        // Initialize motor cutaway if present
        if (document.querySelector('.motor-cutaway')) {
            MotorCutaway.init();
        }
        
        // Initialize 3D viewer if present
        if (document.getElementById('product-viewer-3d')) {
            ProductViewer3D.init('product-viewer-3d');
        }
        
        // Initialize airflow visualization if present
        if (document.getElementById('airflow-container')) {
            AirflowVisualization.init('airflow-container');
        }
        
        // Initialize horizontal gallery if present
        if (document.getElementById('product-gallery')) {
            HorizontalGallery.init('product-gallery');
        }
    }
});

/* ============================================
   EXPORT FOR USE IN OTHER FILES
   ============================================ */
window.GFCAnimations = {
    ScrollSequence,
    ProductViewer3D,
    ExplodedView,
    MotorCutaway,
    FeatureHighlight,
    HorizontalGallery,
    ComparisonSlider,
    AirflowVisualization,
    TextScramble,
    ScrollVideo,
    SpecsReveal,
    StickyProductDetails
};
