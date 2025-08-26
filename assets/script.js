// Smooth scrolling for navigation links
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

// Banner Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const modernIndicators = document.querySelectorAll('.modern-indicator');
const progressBar = document.querySelector('.progress-bar-slider');
let slideInterval;

// Initialize slider
function initSlider() {
    // Apply background images from data-bg attributes
    slides.forEach(slide => {
        const bg = slide.getAttribute('data-bg');
        if (bg) {
            slide.style.backgroundImage = `url('${bg}')`;
        }
    });

    // Set first slide as active
    if (slides.length > 0) {
        showSlide(0);
    }

    // Auto-play slider
    startAutoSlide();
}

// Show specific slide with enhanced transitions
function showSlide(index) {
    // Remove active class from all slides with smooth exit
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        // Add proper exit animation for all slides
        slide.style.opacity = '0';
        slide.style.transform = 'scale(1.05)';
        slide.style.zIndex = '1';
    });
    modernIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Update progress bar
    if (progressBar) {
        progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
    }
    
    // Add active class to current slide with smooth entrance
    if (slides[index]) {
        setTimeout(() => {
            // Reset all slides first
            slides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.transform = 'scale(1.05)';
            });
            
            // Show current slide
            slides[index].classList.add('active');
            slides[index].style.transform = 'scale(1)';
            slides[index].style.opacity = '1';
            slides[index].style.zIndex = '2';
            
            // Trigger content animations
            triggerSlideContentAnimations(slides[index]);
        }, 300);
    }
    if (modernIndicators[index]) {
        modernIndicators[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// Trigger slide content animations
function triggerSlideContentAnimations(slide) {
    // Reset all animations in the slide
    const animatedElements = slide.querySelectorAll('.slide-title, .slide-subtitle, .slide-features, .slide-buttons, .slide-visual');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
    
    // Special handling for floating elements and visual components
    const floatingElements = slide.querySelectorAll('.float-item, .devops-item, .ai-node');
    floatingElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        setTimeout(() => {
            el.style.animation = null;
        }, index * 100);
    });
}

// Next slide
function nextSlide() {
    const next = (currentSlideIndex + 1) % slides.length;
    showSlide(next);
}

// Previous slide
function prevSlide() {
    const prev = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Change slide function for controls
function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    // Restart auto-play
    stopAutoSlide();
    startAutoSlide();
}

// Current slide function for indicators
function currentSlide(index) {
    showSlide(index - 1);
    // Restart auto-play
    stopAutoSlide();
    startAutoSlide();
}

// Auto-play functionality with smoother timing
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 7000); // Changed to 7 seconds for better viewing
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Enhanced slider setup with preloading
function setupSliderEvents() {
    const bannerSlider = document.querySelector('.hero-banner');
    if (bannerSlider) {
        bannerSlider.addEventListener('mouseenter', stopAutoSlide);
        bannerSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Preload all slide background images
    slides.forEach(slide => {
        const bgImage = slide.getAttribute('data-bg');
        if (bgImage) {
            const img = new Image();
            img.src = bgImage;
        }
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Enhanced intersection observer for banner animations
function initBannerAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for statistics in banner
                if (entry.target.classList.contains('hero-stats') && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    setTimeout(() => animateCounters(), 300);
                }
            }
        });
    }, observerOptions);

    // Observe banner stats
    const bannerStats = document.querySelector('.hero-stats');
    if (bannerStats) {
        observer.observe(bannerStats);
    }
}

// Smooth scrolling for navigation links
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

// Contact form submission (AJAX -> PHP backend)
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const statusBox = document.getElementById('contact-status');
        const submitBtn = document.getElementById('contactSubmitBtn');
        statusBox.style.display = 'block';
        statusBox.style.color = '#444';
        statusBox.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(this);
            const response = await fetch('submit_contact.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                statusBox.style.color = '#2e7d32';
                statusBox.textContent = data.message || 'Message sent successfully!';
                this.reset();
            } else {
                statusBox.style.color = '#c62828';
                if (data.errors) {
                    statusBox.innerHTML = Object.values(data.errors).join('<br>');
                } else {
                    statusBox.textContent = data.error || 'Failed to send message.';
                }
            }
        } catch (err) {
            statusBox.style.color = '#c62828';
            statusBox.textContent = 'Network error. Please try again.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 35, 126, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#1a237e';
        header.style.backdropFilter = 'none';
    }
});

// Technology progress bars animation
function initTechProgress() {
    // Define progress percentages for each technology
    const techProgress = {
        'React': 95,
        'Angular': 88,
        'Vue.js': 85,
        'JavaScript': 98,
        'HTML5': 100,
        'CSS3': 95,
        'Node.js': 90,
        'Python': 92,
        'PHP': 85,
        'Java': 80,
        'Laravel': 88,
        'Django': 82,
        'Flutter': 85,
        'React Native': 88,
        'Android': 82,
        'iOS': 75,
        'Kotlin': 78,
        'Swift': 72,
        'AWS': 90,
        'Azure': 85,
        'Google Cloud': 82,
        'Docker': 88,
        'Kubernetes': 80,
        'Jenkins': 85,
        'OpenAI': 88,
        'n8n': 92,
        'Zapier': 85,
        'ChatGPT API': 90,
        'TensorFlow': 78,
        'Automation': 94
    };

    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        const techName = item.querySelector('span').textContent.trim();
        const progressBar = item.querySelector('.progress-bar');
        const progress = techProgress[techName] || 75; // Default to 75% if not found
        
        // Set CSS custom property for hover effect
        item.style.setProperty('--progress', progress + '%');
        
        // Initialize progress bar
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    });
}

// Animate technology progress bars
function animateTechProgress() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        setTimeout(() => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                const targetWidth = item.style.getPropertyValue('--progress') || '75%';
                progressBar.style.width = targetWidth;
            }
        }, index * 50); // Stagger animations
    });
}

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special handling for technology section
            if (entry.target.id === 'technologies' && !entry.target.classList.contains('tech-animated')) {
                entry.target.classList.add('tech-animated');
                setTimeout(() => animateTechProgress(), 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service, .blog-post, .portfolio-item, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe the technology section
const techSection = document.getElementById('technologies');
if (techSection) {
    observer.observe(techSection);
}

// Enhanced technology icon interactions
function initTechInteractions() {
    document.querySelectorAll('.tech-item').forEach(item => {
        // Mouse enter effect
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.progress-bar');
            if (progressBar) {
                const targetWidth = this.style.getPropertyValue('--progress') || '75%';
                progressBar.style.width = targetWidth;
                progressBar.style.transition = 'width 0.3s ease';
            }
        });
        
        // Mouse leave effect
        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.progress-bar');
            if (progressBar && !this.closest('#technologies').classList.contains('tech-animated')) {
                progressBar.style.width = '0%';
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    setupSliderEvents();
    initBannerAnimations();
    initTechProgress();
    initTechInteractions();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
