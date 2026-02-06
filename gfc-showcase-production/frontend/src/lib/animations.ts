import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = (
  target: string,
  animation: {
    from?: gsap.FromToVars;
    to: gsap.FromToVars;
  },
  options?: ScrollTrigger.Vars
) => {
  gsap.fromTo(
    target,
    animation.from || { opacity: 0, y: 30 },
    {
      ...animation.to,
      scrollTrigger: {
        trigger: target,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

export const staggerChildren = (container: string, duration: number = 0.6) => {
  gsap.to(`${container} > *`, {
    opacity: 1,
    y: 0,
    duration,
    stagger: 0.1,
    ease: 'power2.out',
  });
};

export const parallaxEffect = (element: string, speed: number = 0.5) => {
  gsap.to(element, {
    y: gsap.utils.unitize((i) => window.innerHeight * speed),
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
  });
};

export const hoverScale = (element: string, scale: number = 1.05) => {
  const el = document.querySelector(element) as HTMLElement;
  if (!el) return;

  el.addEventListener('mouseenter', () => {
    gsap.to(element, { scale, duration: 0.3, ease: 'power2.out' });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
};

export const fadeInUp = (target: string, delay: number = 0) => {
  gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const titleLetterAnimation = (element: string) => {
  const text = document.querySelector(element) as HTMLElement;
  if (!text) return;

  const letters = text.innerText.split('');
  text.innerHTML = letters
    .map((letter) => `<span class="letter" style="opacity: 0; display: inline-block;">${letter}</span>`)
    .join('');

  gsap.to(`${element} .letter`, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out',
  });
};
