// ============================================
// HIGH LABAN - INTERACTIONS & ANIMATIONS
// ============================================

// Dock Navigation
const dockItems = document.querySelectorAll('.dock-item[data-section]');
const socialItems = document.querySelectorAll('.dock-item[data-social]');

// Handle dock item clicks for navigation
dockItems.forEach(item => {
    item.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        const target = document.getElementById(section);
        
        if (target) {
            const offsetTop = target.offsetTop - 20; // Small offset for dock
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active state
            dockItems.forEach(di => di.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Handle social media clicks
socialItems.forEach(item => {
    item.addEventListener('click', function() {
        const social = this.getAttribute('data-social');
        // Add your social media URLs here
        if (social === 'whatsapp') {
            window.open('https://wa.me/919876543210', '_blank');
        } else if (social === 'instagram') {
            window.open('https://instagram.com/highlaban', '_blank');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 20; // Small offset for dock
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-header, .about-text, .product-card, .feature-card, .location-card, .franchise-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Product Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Store Locator Search
const citySelect = document.getElementById('city-select');
const searchBtn = document.getElementById('search-btn');
const locationCards = document.querySelectorAll('.location-card');

if (searchBtn && citySelect) {
    searchBtn.addEventListener('click', () => {
        const selectedCity = citySelect.value.toLowerCase();
        
        if (selectedCity) {
            locationCards.forEach(card => {
                const locationName = card.querySelector('.location-name').textContent.toLowerCase();
                if (locationName.includes(selectedCity)) {
                    card.style.display = 'block';
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            // Show all if no city selected
            locationCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        if (email) {
            // Here you would typically send the email to your backend
            alert('Thank you for subscribing! We\'ll keep you updated with the sweetest news.');
            emailInput.value = '';
        }
    });
}

// Parallax Effect for Hero Section
let heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Product Card Hover Effects Enhancement
productCards.forEach(card => {
    const productImage = card.querySelector('.product-image');
    
    card.addEventListener('mouseenter', () => {
        if (productImage) {
            productImage.style.transform = 'scale(1.05)';
            productImage.style.transition = 'transform 0.5s ease-out';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (productImage) {
            productImage.style.transform = 'scale(1)';
        }
    });
});

// Button Micro-interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = '';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Lazy Loading for Images (when real images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // When you add real images, use: <img data-src="image.jpg" class="lazy">
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Update active dock item based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveDock() {
    let current = '';
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - windowHeight / 3;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update dock active state
    dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
    
    // Set home as active if at top
    if (scrollY < 100) {
        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === 'home') {
                item.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveDock);
// Initial call
updateActiveDock();

// Dynamic Hero Interactions
const heroWords = document.querySelectorAll('.hero-headline .word');
const whatsappBtn = document.getElementById('whatsapp-btn');

// Add hover effect to words
heroWords.forEach((word, index) => {
    word.addEventListener('mouseenter', () => {
        word.style.transform = 'scale(1.1) translateY(-5px)';
        word.style.transition = 'transform 0.3s ease';
    });
    
    word.addEventListener('mouseleave', () => {
        word.style.transform = 'scale(1) translateY(0)';
    });
});

// WhatsApp button
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://wa.me/919876543210', '_blank');
    });
}




// Console welcome message
console.log('%cHighLaban', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cIndia\'s Premium Egyptian Dessert Experience', 'font-size: 14px; color: #60a5fa;');

