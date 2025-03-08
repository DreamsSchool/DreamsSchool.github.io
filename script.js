// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        // Change menu icon
        const menuIcon = this.querySelector('.menu-icon');
        menuIcon.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('show');
            document.querySelector('.menu-icon').textContent = '☰';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            document.querySelector('.menu-icon').textContent = '☰';
        });
    });

    // Announcement Slider
    const announcements = document.querySelectorAll('.announcement');
    let currentAnnouncement = 0;

    function showNextAnnouncement() {
        announcements[currentAnnouncement].style.display = 'none';
        currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
        announcements[currentAnnouncement].style.display = 'block';
    }

    // Hide all announcements except first one
    announcements.forEach((announcement, index) => {
        if (index !== 0) announcement.style.display = 'none';
    });

    // Change announcement every 5 seconds
    setInterval(showNextAnnouncement, 5000);

    // Smooth Scrolling for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.highlight-item, .stat, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to navigation
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add animation classes
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .highlight-item, .stat, .gallery-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .highlight-item.animate, .stat.animate, .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);


// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-caption').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});
// Add this to your existing script.js file

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle the answer visibility
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                icon.textContent = '−'; // Change to minus sign
            } else {
                answer.style.display = 'none';
                icon.textContent = '+'; // Change back to plus sign
            }
        });
    });
});
// Enhanced FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-enhanced-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-enhanced-question');
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});
