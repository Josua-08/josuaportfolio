document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    const hasGSAP = typeof gsap !== 'undefined' && gsap;
    const hasIO = typeof IntersectionObserver !== 'undefined';

    // Safe helper to parse delay values
    const parseDelay = (v) => {
        const n = parseFloat(v ?? '0');
        return Number.isFinite(n) ? n : 0;
    };

    // If GSAP isn't available, reveal elements without animation
    if (!hasGSAP) {
        console.warn('GSAP not found — animations disabled. Elements will be revealed without animation.');
        document.querySelectorAll('.reveal-content, .hero-title, .hero-subtitle, .apple-button').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // Basic animation function using GSAP (guarded)
    const animateElement = (element, delay = 0) => {
        const d = parseDelay(delay);
        if (!element) return;
        if (!hasGSAP) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            return;
        }
        try {
            // faster, smaller movement for snappier feeling
            gsap.set(element, { opacity: 0, y: 20 });
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                delay: d,
                ease: 'power2.out'
            });
        } catch (err) {
            console.error('GSAP animation error:', err);
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    };

    // Intersection observer wrapper (if available) - use a lower threshold so elements begin earlier
    if (hasIO) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset?.delay ?? 0;
                    animateElement(entry.target, parseDelay(delay));
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06 }); // lower threshold triggers slightly earlier

        document.querySelectorAll('.reveal-content').forEach(el => observer.observe(el));
    } else {
        console.warn('IntersectionObserver not supported — revealing all .reveal-content immediately.');
        document.querySelectorAll('.reveal-content').forEach((el, i) => animateElement(el, i * 0.04));
    }

    // Hero animations (staggered) - faster stagger
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .apple-button');
    heroElements.forEach((el, index) => animateElement(el, index * 0.12));

    // Skill bars animation
    document.querySelectorAll('.skill-progress').forEach(bar => {
        if (!bar) return;
        const levelAttr = bar.getAttribute('data-level');
        let level = parseInt(levelAttr ?? '50', 10);
        if (!Number.isFinite(level) || level < 0) level = 0;
        if (level > 100) level = 100;

        if (hasGSAP) {
            gsap.set(bar, { width: '0%' });
        } else {
            bar.style.width = '0%';
        }

        const targetToObserve = bar.parentElement ?? bar;

        const runSkillAnimation = () => {
            if (hasGSAP) {
                try {
                    gsap.to(bar, { width: `${level}%`, duration: 1.0, ease: 'power2.out' });
                } catch (err) {
                    console.error('GSAP skill animation error:', err);
                    bar.style.width = `${level}%`;
                }
            } else {
                bar.style.width = `${level}%`;
            }
        };

        if (hasIO) {
            const skillObserver = new IntersectionObserver((entries, skObs) => {
                if (entries[0] && entries[0].isIntersecting) {
                    runSkillAnimation();
                    skObs.unobserve(entries[0].target);
                }
            }, { threshold: 0.06 });

            skillObserver.observe(targetToObserve);
        } else {
            runSkillAnimation();
        }
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 50) nav.classList.add('nav-scrolled');
            else nav.classList.remove('nav-scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Button hover effects (guarded)
    document.querySelectorAll('.apple-button').forEach(button => {
        if (!button) return;
        button.addEventListener('pointerenter', () => {
            if (!hasGSAP) {
                button.style.transform = 'scale(1.05)';
                return;
            }
            try {
                gsap.to(button, { scale: 1.05, duration: 0.2 });
            } catch (err) {
                button.style.transform = 'scale(1.05)';
            }
        });

        button.addEventListener('pointerleave', () => {
            if (!button) return;
            if (!hasGSAP) {
                button.style.transform = 'scale(1)';
                return;
            }
            try {
                gsap.to(button, { scale: 1, duration: 0.2 });
            } catch (err) {
                button.style.transform = 'scale(1)';
            }
        });
    });
});
