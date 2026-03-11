// ============================================
// SENPAII KAWAEBII - AQUACULTURE WEBSITE JS
// ============================================

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============ CONTACT FORM VALIDATION ============
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous messages
    successMessage.style.display = 'none';
    
    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset error states
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (name.value.trim() === '') {
        showError(name, 'nameError', 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'emailError', 'Please enter your email');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (message.value.trim() === '') {
        showError(message, 'messageError', 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // If valid, show success message and reset form
    if (isValid) {
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Here you would typically send the form data to a backend
        console.log('Form submitted:', {
            name: name.value,
            email: email.value,
            message: message.value
        });
    }
});

// Show error for a field
function showError(field, errorId, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    formInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Remove error when user starts typing
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            field.classList.remove('error');
            // Find and clear the associated error message
            const errorId = field.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }
    });
});

// ============ SMOOTH SCROLL OFFSET FOR STICKY NAV ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ ANIMATION ON SCROLL ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section-header, .service-card, .product-card, .training-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 8px 20px rgba(13, 71, 161, 0.25)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(13, 71, 161, 0.15)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============ RIPPLE EFFECT ON BUTTONS ============
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============ COUNTER ANIMATION ============
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ============ PAGE LOAD ANIMATIONS ============
document.addEventListener('DOMContentLoaded', () => {
    // Fade in logo and nav links on load
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (logo) {
        logo.style.animation = 'slideInDown 0.8s ease';
    }
    
    navLinks.forEach((link, index) => {
        link.style.animation = `slideInDown ${0.8 + index * 0.1}s ease`;
    });
});

// ============ FORM ACCESSIBILITY - PREVENT EMPTY SUBMIT ============
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
inputs.forEach(input => {
    input.setAttribute('autocomplete', 'on');
});

// ============ MOBILE RESPONSIVE ADJUSTMENTS ============
function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Adjust hero padding on very small screens
        const hero = document.querySelector('.hero');
        if (window.innerWidth <= 480) {
            hero.style.paddingTop = '60px';
            hero.style.paddingBottom = '60px';
        }
    }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// ============ SCROLL TO TOP BUTTON (OPTIONAL ENHANCEMENT) ============
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00bcd4, #1de9b6);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ============ ANIMATED PARTICLES BACKGROUND ============
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height; // Start below or within
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * -1 - 0.5; // Move upwards
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomAquaColor();
        this.wiggle = Math.random() * 0.05;
        this.wiggleSpeed = Math.random() * 0.05;
    }

    getRandomAquaColor() {
        const colors = [
            'rgba(0, 210, 255, ', // Aqua blue
            'rgba(168, 230, 207, ', // Soft green
            'rgba(255, 255, 255, ', // White (bubbles)
            'rgba(255, 75, 43, '   // Crayfish red (rare)
        ];
        // Make red rare (roughly 10% chance)
        const rand = Math.random();
        let colorIndex = Math.floor(Math.random() * (colors.length - 1));
        if (rand > 0.9) colorIndex = colors.length - 1;
        
        return colors[colorIndex] + this.opacity + ')';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * this.wiggleSpeed) * 0.5; // Swaying motion

        // Reset to bottom if it goes off top
        if (this.y < -10) {
            this.y = this.canvas.height + 10;
            this.x = Math.random() * this.canvas.width;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        // Wrap horizontally
        if (this.x > this.canvas.width) this.x = 0;
        else if (this.x < 0) this.x = this.canvas.width;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        
        // Add a tiny highlight to some bubbles for a 3D effect
        if (this.size > 2 && !this.color.includes('255, 75, 43')) {
            this.ctx.beginPath();
            this.ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.fill();
        }
    }
}

const initParticles = () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;

    const resizeCanvas = () => {
        const hero = document.querySelector('.hero');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle(canvas));
        }
    });

    resizeCanvas();

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas));
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    };

    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});

// ============ CONSOLE LOG FOR DEBUGGING ============
console.log('Senpaii Kawaebii Arc Farming & Aqua Venture website loaded successfully!');
console.log('Version: 1.1.0 - Underwater Hero Redesign');
