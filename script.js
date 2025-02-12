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
