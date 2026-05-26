// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function () {
    new Typed('#typed-text', {
        strings: [
            'Automation Engineer',
            'Full Stack Developer',
            'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = function () {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) bar.style.width = width;
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Particle animation background
    function createParticles() {
        const container = document.getElementById('particleContainer');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';

        // Create new particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 10 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            // Add CSS for animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    100% { transform: translate(0, 0); }
                }
            `;
            document.head.appendChild(style);

            container.appendChild(particle);
        }
    }

    createParticles();
});
