// Main JavaScript file for Hemal Shah Portfolio
// Handles animations, interactions, and dynamic effects

// Global variables
let particles = [];
let particleSystem;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeScrollAnimations();
    initializeDarkMode();
    initializeMobileMenu();
    initializeParticleSystem();
    initializeSkillBars();
    initializeSmoothScrolling();
    initializeHoverEffects();
});

// Typewriter effect for hero section
function initializeTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Automation Engineer',
            'Full Stack Developer',
            'Problem Solver'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: false
    });
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Dark mode functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const theme = html.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Animate toggle
        anime({
            targets: darkModeToggle,
            rotate: '1turn',
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu icon
        const icon = mobileMenuToggle.querySelector('svg');
        anime({
            targets: icon,
            rotate: mobileMenu.classList.contains('hidden') ? '0deg' : '90deg',
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
    
    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Particle system using p5.js
function initializeParticleSystem() {
    const container = document.getElementById('particleContainer');
    if (!container) return;
    
    new p5((p) => {
        let particles = [];
        const numParticles = 50;
        
        p.setup = () => {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
                
                // Draw connections to nearby particles
                particles.forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(255, 255, 255, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
}

// Skill bar animations
function initializeSkillBars() {
    // This will be triggered by scroll animations
}

function animateSkillBars(container) {
    const skillFills = container.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
            anime({
                targets: fill,
                width: width,
                duration: 1500,
                easing: 'easeOutExpo'
            });
        }, 200);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hover effects and micro-interactions
function initializeHoverEffects() {
    // Button hover effects
    document.querySelectorAll('.hover-lift').forEach(element => {
        element.addEventListener('mouseenter', () => {
            anime({
                targets: element,
                translateY: -5,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            anime({
                targets: element,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                rotateX: 5,
                rotateY: 5,
                scale: 1.05,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Skill card hover effects
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.skill-fill'),
                width: card.querySelector('.skill-fill').getAttribute('data-width'),
                duration: 800,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar scroll effect
window.addEventListener('scroll', debounce(() => {
    const navbar = document.querySelector('.glass-nav');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}, 100));

// Loading animation
window.addEventListener('load', () => {
    // Animate hero elements
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.reveal',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200)
    });
    
    // Animate gradient text
    anime({
        targets: '.gradient-text',
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        duration: 3000,
        loop: true,
        easing: 'easeInOutSine'
    });
});

// Form handling (for contact page)
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: 300,
            opacity: 0,
            duration: 500,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Export functions for use in other pages
window.PortfolioJS = {
    initializeScrollAnimations,
    initializeDarkMode,
    initializeMobileMenu,
    handleFormSubmission,
    showNotification,
    debounce
};