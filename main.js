/* =================================
   TREE SERVICE DEMO - JAVASCRIPT
   Interactive Features & UX Enhancements
   ================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic client-side validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Check if required fields are filled
            if (!name || !phone || !email || !service || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
            
            // If validation passes, form will submit to Formspree
            // Show success message after a brief delay
            setTimeout(function() {
                if (formSuccess) {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                }
            }, 100);
        });
        
        // Phone number formatting (basic)
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = '(' + value;
                    } else if (value.length <= 6) {
                        value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                    } else {
                        value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                    }
                }
                
                e.target.value = value;
            });
        }
    }
    
    
    // ===== SCROLL ANIMATIONS (FADE IN ON SCROLL) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInElements = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .trust-item, .experience-item, .equipment-item, .commitment-item, .faq-item');
    
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeInElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }
    
    
    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled down
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    
    // ===== CLICK-TO-CALL TRACKING (for demo purposes) =====
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated - this would be tracked in analytics');
            // In a real site, you'd send this to Google Analytics or your tracking system
            // Example: gtag('event', 'phone_call', { 'event_category': 'engagement' });
        });
    });
    
    
    // ===== FORM SUBMISSION TRACKING (for demo purposes) =====
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            console.log('Form submission - this would be tracked in analytics');
            // Example: gtag('event', 'form_submission', { 'event_category': 'lead_generation' });
        });
    }
    
    
    // ===== EMERGENCY BUTTON HIGHLIGHT =====
    const emergencyButtons = document.querySelectorAll('.btn-emergency, .btn-emergency-large');
    
    emergencyButtons.forEach(button => {
        // Add pulsing animation class
        setInterval(function() {
            button.style.transform = 'scale(1.02)';
            setTimeout(function() {
                button.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    });
    
    
    // ===== BACK TO TOP BUTTON (Optional Enhancement) =====
    // Create a back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #2d5a2d;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1f3f1f';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#2d5a2d';
        this.style.transform = 'scale(1)';
    });
    
    
    // ===== LAZY LOADING FOR IMAGES (if real images were added) =====
    // This is ready for when real images are added
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    
    // ===== SERVICE SELECTOR HELPER =====
    // If user clicks "Not Sure" in service dropdown, could show helpful tooltip
    const serviceSelect = document.getElementById('service');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const messageTextarea = document.getElementById('message');
            
            if (this.value === 'not-sure' && messageTextarea) {
                if (!messageTextarea.value.trim()) {
                    messageTextarea.placeholder = 'No problem! Tell us about your situation and we\'ll help you determine the best service. For example: tree size, location, any immediate concerns, etc.';
                }
            }
        });
    }
    
    
    // ===== LOG LOADED CONFIRMATION =====
    console.log('Green Valley Tree Service Demo - JavaScript Loaded Successfully');
    console.log('Features active: Mobile nav, smooth scroll, form validation, scroll animations');
    
});


// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
