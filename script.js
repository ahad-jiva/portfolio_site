// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon() {
    if (themeIcon) {
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Immediately update navbar styling for the new theme
    updateNavbarForTheme(newTheme);
    
    // Reset parallax effect to avoid interference with theme transitions
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.setProperty('--parallax-offset', '0px');
    }
}

// Function to update navbar styling based on current theme and scroll position
function updateNavbarForTheme(theme) {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid transparent';
            navbar.style.backgroundImage = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.98) calc(100% - 1px), linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3) 100%)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.6)';
            navbar.style.borderBottom = '1px solid transparent';
            navbar.style.backgroundImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.98) calc(100% - 1px), linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3) 100%)';
        }
        navbar.style.backgroundSize = '100% 100%, 100% 1px';
        navbar.style.backgroundRepeat = 'no-repeat, repeat-x';
    } else {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid var(--border-color)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid var(--border-color)';
        }
        navbar.style.backgroundImage = 'none';
    }
}

// Add event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme icon
updateThemeIcon();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll with theme support
window.addEventListener('scroll', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateNavbarForTheme(currentTheme);
});

// Initialize navbar styling on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateNavbarForTheme(currentTheme);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add subtle glow effect for project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .skills-grid');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page with dark theme enhancements
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
        });
    });

    // Add subtle glow effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = '0 8px 25px rgba(128, 128, 128, 0.4), 0 0 15px rgba(128, 128, 128, 0.2)';
            } else if (button.classList.contains('btn-secondary')) {
                button.style.boxShadow = '0 8px 25px rgba(128, 128, 128, 0.3), 0 0 15px rgba(128, 128, 128, 0.1)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = 'none';
            } else if (button.classList.contains('btn-secondary')) {
                button.style.boxShadow = 'none';
            }
        });
    });

    // Fixed typing effect that preserves HTML structure
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Store the original content with the span
        const originalContent = heroTitle.innerHTML;
        
        // Clear the content initially
        heroTitle.innerHTML = '';
        
        // Split the text into parts: "Hi, I'm " and "Ahad Jiva"
        const textParts = originalContent.split('<span class="highlight">');
        const beforeSpan = textParts[0]; // "Hi, I'm "
        const afterSpan = textParts[1].split('</span>');
        const nameText = afterSpan[0]; // "Ahad Jiva"
        const afterName = afterSpan[1] || ''; // anything after the span
        
        let currentText = '';
        let partIndex = 0;
        let charIndex = 0;
        
        function typeWriter() {
            if (partIndex === 0) {
                // Type "Hi, I'm "
                if (charIndex < beforeSpan.length) {
                    currentText += beforeSpan.charAt(charIndex);
                    heroTitle.innerHTML = currentText;
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Start typing the name
                    partIndex = 1;
                    charIndex = 0;
                    currentText += '<span class="highlight">';
                    setTimeout(typeWriter, 100);
                }
            } else if (partIndex === 1) {
                // Type the name inside the span
                if (charIndex < nameText.length) {
                    currentText += nameText.charAt(charIndex);
                    heroTitle.innerHTML = currentText + '</span>' + afterName;
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Finish the span
                    currentText += '</span>' + afterName;
                    heroTitle.innerHTML = currentText;
                }
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        // Use CSS custom property to avoid interfering with theme transitions
        hero.style.setProperty('--parallax-offset', `${rate}px`);
    }
});

// Scroll arrow functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const scrollLabel = document.querySelector('.scroll-label');
    let scrollTimeout;
    
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Show label after 2 seconds of no scroll activity
    function showScrollLabel() {
        if (scrollLabel) {
            scrollLabel.classList.add('visible');
        }
    }
    
    // Hide label when scrolling
    function hideScrollLabel() {
        if (scrollLabel) {
            scrollLabel.classList.remove('visible');
        }
    }
    
    // Handle scroll events
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        isScrolling = true;
        hideScrollLabel();
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set new timeout to show label after scrolling stops
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            showScrollLabel();
        }, 2000);
    });
    
    // Initial timeout to show label after 2 seconds
    setTimeout(() => {
        if (!isScrolling) {
            showScrollLabel();
        }
    }, 2000);
}); 