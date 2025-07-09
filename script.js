// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Modal Functions
const modal = document.getElementById('leadModal');

function showLeadForm() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLeadForm() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeLeadForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeLeadForm();
    }
});

// Form Validation and Submission
function handleLeadSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        clinic: formData.get('clinic'),
        leads: formData.get('leads')
    };
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormError('Please enter a valid email address');
        return;
    }
    
    // Validate phone (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        showFormError('Please enter a valid phone number');
        return;
    }
    
    // Show success message
    showFormSuccess();
    
    // In a real implementation, you would send this data to your server
    console.log('Form submitted:', data);
    
    // Redirect to Calendly after 2 seconds
    setTimeout(() => {
        // Replace with your actual Calendly link
        window.location.href = 'https://calendly.com/automatix-studio/dentalflow-demo';
    }, 2000);
}

// Show form error message
function showFormError(message) {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    error.style.cssText = `
        color: #DC2626;
        background: #FEE2E2;
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
    `;
    
    const form = document.getElementById('leadForm');
    form.insertBefore(error, form.firstChild);
    
    setTimeout(() => {
        error.remove();
    }, 5000);
}

// Show form success message
function showFormSuccess() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h3 style="margin-bottom: 1rem;">Success!</h3>
            <p>Thank you for your interest in DentalFlow. We'll redirect you to schedule your demo in a moment...</p>
            <div class="spinner" style="margin: 2rem auto;"></div>
        </div>
    `;
    
    // Add spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #E5E7EB;
            border-top: 4px solid #2563EB;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// CTA Button Functions
function bookDemo() {
    // Replace with your actual Calendly link
    window.open('https://calendly.com/automatix-studio/dentalflow-demo', '_blank');
}

function selectPlan(plan) {
    // Store selected plan in session storage
    sessionStorage.setItem('selectedPlan', plan);
    
    if (plan === 'enterprise') {
        // For enterprise, go to contact form or Calendly
        window.location.href = 'https://calendly.com/automatix-studio/dentalflow-demo';
    } else {
        // For other plans, show lead form
        showLeadForm();
    }
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles to animatable elements
    const animatableElements = document.querySelectorAll(
        '.feature-card, .result-card, .pricing-card, .faq-item'
    );
    
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add number counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isTime = finalValue.includes('min');
        const isDollar = finalValue.includes('$');
        
        // Extract numeric value
        let numericValue = parseFloat(finalValue.replace(/[^0-9.-]/g, ''));
        
        if (!isNaN(numericValue)) {
            stat.textContent = '0';
            
            const increment = numericValue / 50;
            let currentValue = 0;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(counter);
                }
                
                // Format the display value
                let displayValue = Math.round(currentValue);
                if (isDollar) displayValue = '$' + displayValue.toLocaleString();
                else if (isPercentage) displayValue = displayValue + '%';
                else if (isTime) displayValue = displayValue + ' min';
                
                stat.textContent = displayValue;
            }, 30);
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add transition to header
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Pricing toggle (for future monthly/annual toggle)
function createPricingToggle() {
    // This function can be expanded to add monthly/annual pricing toggle
    console.log('Pricing toggle ready for implementation');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DentalFlow Landing Page Loaded Successfully');
    
    // Check if there's a hash in the URL and scroll to it
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});
