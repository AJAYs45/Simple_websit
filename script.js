// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // About section animations
    const aboutSection = document.querySelector('.about');
    const aboutImageContainer = document.querySelector('.about-image-container');
    const aboutImage = document.querySelector('.about-image-full');
    const aboutInfo = document.querySelector('.about-info');
    const longText = document.querySelector('.long-text');
    const imageCaption = document.querySelector('.image-caption');
    const longTextHeadings = document.querySelectorAll('.long-text h3');
    const longTextParagraphs = document.querySelectorAll('.long-text p');
    const longTextList = document.querySelector('.long-text ul');
    
    // Create observer for about section elements
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // If we're observing the about section itself, animate its elements
                if (entry.target === aboutSection) {
                    if (aboutImage) aboutImage.style.opacity = '1';
                    if (imageCaption) imageCaption.style.opacity = '1';
                    if (aboutInfo) aboutInfo.style.opacity = '1';
                    
                    // Animate long text elements with delay
                    if (longText) {
                        longTextHeadings.forEach((heading, index) => {
                            setTimeout(() => {
                                heading.style.opacity = '1';
                                heading.style.transform = 'translateY(0)';
                            }, 300 * (index + 1));
                        });
                        
                        longTextParagraphs.forEach((paragraph, index) => {
                            setTimeout(() => {
                                paragraph.style.opacity = '1';
                                paragraph.style.transform = 'translateY(0)';
                            }, 200 * (index + 1) + 500);
                        });
                        
                        if (longTextList) {
                            setTimeout(() => {
                                longTextList.style.opacity = '1';
                                longTextList.style.transform = 'translateY(0)';
                            }, 1200);
                        }
                    }
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the about section
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Disable back-to-top button functionality
    // We will keep this commented out but modify it to do nothing
    /*
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    */
    
    // Interactive work cards with tilt effect
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Calculate rotation based on cursor position
            const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
            const tiltY = (x - 0.5) * -10; // -5 to 5 degrees
            
            // Apply the 3D rotation and add a subtle scale effect
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            
            // Create dynamic shadow based on mouse position
            const shadowX = (x - 0.5) * 20;
            const shadowY = (y - 0.5) * 20;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.15)`;
        });
        
        // Reset transforms when mouse leaves
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Animate work categories on scroll
    const workCategories = document.querySelectorAll('.work-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    workCategories.forEach(category => {
        observer.observe(category);
    });
    
    // Interactive category titles
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            const workGrid = this.nextElementSibling;
            
            if (workGrid.classList.contains('collapsed')) {
                // If it's collapsed, expand it
                workGrid.classList.remove('collapsed');
                this.classList.remove('collapsed');
            } else {
                // If it's expanded, collapse it
                workGrid.classList.add('collapsed');
                this.classList.add('collapsed');
            }
        });
    });
    
    // Sticky header behavior
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    let heroHeight;
    
    if (heroSection) {
        heroHeight = heroSection.offsetHeight;
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (name && email && subject && message) {
                // Show submission animation
                const btn = contactForm.querySelector('.btn');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> पाठवत आहे...`;
                btn.disabled = true;
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Success message
                    btn.innerHTML = `<i class="fas fa-check"></i> यशस्वी`;
                    btn.style.backgroundColor = 'var(--accent-color)';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                        
                        // Show thank you message
                        const formGroups = contactForm.querySelectorAll('.form-group');
                        formGroups.forEach(group => {
                            group.style.opacity = '0';
                        });
                        
                        const thankYouMessage = document.createElement('div');
                        thankYouMessage.className = 'thank-you-message';
                        thankYouMessage.innerHTML = `
                            <i class="fas fa-envelope-open-text"></i>
                            <h3>आपल्या संदेशासाठी धन्यवाद!</h3>
                            <p>आम्ही लवकरच आपल्याशी संपर्क साधू.</p>
                        `;
                        
                        contactForm.insertBefore(thankYouMessage, contactForm.querySelector('.btn'));
                        contactForm.querySelector('.btn').style.display = 'none';
                        
                        // Reset the form display after some time
                        setTimeout(() => {
                            thankYouMessage.remove();
                            formGroups.forEach(group => {
                                group.style.opacity = '1';
                            });
                            contactForm.querySelector('.btn').style.display = 'flex';
                        }, 5000);
                        
                    }, 2000);
                }, 2000);
            } else {
                // Show error message if validation fails
                alert('कृपया सर्व फील्ड भरा');
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Here you would typically send the subscription request to a server
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize Lightbox when clicking on gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const title = this.querySelector('.gallery-info h3').textContent;
            const description = this.querySelector('.gallery-info p').textContent;
            
            // Create a lightbox view
            createLightbox(imgSrc, title, description);
        });
    });
    
    function createLightbox(imgSrc, title, description) {
        // Create lightbox container
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        // Create lightbox content
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="${imgSrc}" alt="${title}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        // Add lightbox to body
        document.body.appendChild(lightbox);
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Add animation class after a small delay to trigger animation
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Close lightbox when clicking the close button or outside the image
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(e) {
            // Close if clicked outside the image
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            
            // After animation completes, remove from DOM
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add CSS for lightbox
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 70vh;
            display: block;
            margin: 0 auto;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        .lightbox-info {
            background: white;
            padding: 15px;
            color: black;
            margin-top: 10px;
        }
    `;
    
    document.head.appendChild(lightboxStyle);
    
    // Active navigation item highlighting
    function highlightNavItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Add active class style
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        nav ul li a.active {
            color: var(--accent-color);
            border-bottom: 2px solid var(--accent-color);
        }
    `;
    
    document.head.appendChild(activeStyle);
    
    // Run highlight function on scroll
    window.addEventListener('scroll', highlightNavItem);
    
    // Run once at load
    highlightNavItem();
    
    // Add interactive particles background to hero section
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.insertBefore(particlesContainer, heroSection.firstChild);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Enhanced image interactions
    if (aboutImage) {
        aboutImage.addEventListener('click', function() {
            this.classList.toggle('enlarged');
            
            if (this.classList.contains('enlarged')) {
                this.style.cursor = 'zoom-out';
            } else {
                this.style.cursor = 'zoom-in';
            }
        });
        
        // Set initial cursor style
        aboutImage.style.cursor = 'zoom-in';
    }
    
    // Interactive counter for achievements
    const achievementCounts = document.querySelectorAll('.achievement-count');
    
    if (achievementCounts.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const speed = 2000 / countTo; // Adjust speed based on target number
                    
                    const updateCount = () => {
                        if (count < countTo) {
                            count++;
                            target.textContent = count;
                            setTimeout(updateCount, speed);
                        }
                    };
                    
                    updateCount();
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementCounts.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Add interactive typing effect to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add scroll-triggered animations to elements
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .zoom-in');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Initialize interactive accordions for FAQ or other collapsible content
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', function() {
                // Toggle current item
                this.classList.toggle('active');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
    
    // Add a function to handle the work grid visibility
    function handleWorkGridVisibility() {
        const workGrids = document.querySelectorAll('.work-grid');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add card indexes for animations
                    const cards = entry.target.querySelectorAll('.work-card');
                    cards.forEach((card, index) => {
                        card.style.setProperty('--card-index', index);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        workGrids.forEach(grid => {
            observer.observe(grid);
            
            // Set initial card indexes
            const cards = grid.querySelectorAll('.work-card');
            cards.forEach((card, index) => {
                card.style.setProperty('--card-index', index);
            });
        });
    }
    
    // Add a function to create ripple effect on buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - this.getBoundingClientRect().left;
                const y = e.clientY - this.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Add a function to ensure all work categories are expanded by default
    function initializeWorkCategories() {
        const workGrids = document.querySelectorAll('.work-grid');
        const categoryTitles = document.querySelectorAll('.category-title');
        
        workGrids.forEach(grid => {
            // Make sure grid is not collapsed
            grid.classList.remove('collapsed');
            
            // Make sure all cards are visible
            const cards = grid.querySelectorAll('.work-card');
            cards.forEach((card, index) => {
                card.style.opacity = '1';
                card.style.setProperty('--card-index', index);
            });
        });
        
        // Make sure no categories are collapsed
        categoryTitles.forEach(title => {
            title.classList.remove('collapsed');
        });
    }
    
    // Call these functions when the DOM is loaded
    handleWorkGridVisibility();
    addRippleEffect();
    initializeWorkCategories();
}); 