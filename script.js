// DOM Elements
const header = document.getElementById('header');
const mobileNav = document.getElementById('mobile-nav');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const currentYearSpan = document.getElementById('current-year');

// Set current year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Header scroll effect
function handleScroll() {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
}



function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header ? header.offsetHeight : 0;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });

        mobileNav.classList.remove('active');
    }
}
// Smooth scroll to section
// function scrollToSection(sectionId) {
//     const element = document.getElementById(sectionId);
//     if (element) {
//         element.scrollIntoView({ 
//             behavior: 'smooth',
//             block: 'start'
//         });
//         // Close mobile menu if open
//         mobileNav.classList.remove('active');
//     }
// }

// Contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Show success message
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Reset form and hide success message after 3 seconds
    setTimeout(() => {
        contactForm.style.display = 'flex';
        successMessage.style.display = 'none';
        contactForm.reset();
    }, 3000);
}

// Intersection Observer for animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations on page load
function initAnimations() {
    // Add fade-in class to body
    document.body.classList.add('fade-in');
    
    // Create intersection observer for scroll animations
    createObserver();
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', initAnimations);

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileNav.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Performance optimization: Throttle scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

// Add touch support for mobile interactions
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
        } else {
            // Swipe down - could trigger some action
        }
    }
}

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Newsletter subscription (placeholder)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        
        // Show success feedback
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            newsletterForm.querySelector('input[type="email"]').value = '';
        }, 2000);
    });
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const main = document.querySelector('main') || document.querySelector('.hero');
    if (main) {
        main.id = 'main-content';
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Acentra Technologies!
Built with vanilla HTML, CSS, and JavaScript
Ready for GitHub Pages deployment
`);