document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded");
    
    // Basic animation function using GSAP
    function animateElement(element, delay = 0) {
        // Set initial state
        gsap.set(element, {
            opacity: 0,
            y: 30
        });
        
        // Create animation with delay
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: "power2.out"
        });
    }
    
    // Create a simple intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get any custom delay from data attribute
                const delay = entry.target.dataset.delay || 0;
                animateElement(entry.target, parseFloat(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all reveal-content elements
    document.querySelectorAll('.reveal-content').forEach(el => {
        observer.observe(el);
    });
    
    // Hero animations (without delay)
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .apple-button');
    heroElements.forEach((el, index) => {
        animateElement(el, index * 0.3);
    });
    
    // Skill bars animation
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const level = bar.getAttribute('data-level') || '50';
        
        // Set initial width to 0
        gsap.set(bar, { width: 0 });
        
        // Create observer for each skill bar
        const skillObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    gsap.to(bar, {
                        width: `${level}%`,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                    skillObserver.unobserve(entries[0].target);
                }
            },
            { threshold: 0.1 }
        );
        
        skillObserver.observe(bar.parentElement);
    });
    
    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }
    
    // Button hover effects
    document.querySelectorAll('.apple-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.3 });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.3 });
        });
    });
});
