document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle with Enhanced Animation
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    function setTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('lightMode', isLight);
        if (themeIcon) {
            themeIcon.textContent = isLight ? '☀️' : '🌙';
            themeIcon.animate([
                { transform: 'rotate(0deg)', opacity: 0 },
                { transform: 'rotate(180deg)', opacity: 1 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            });
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isLight = !document.body.classList.contains('light-mode');
            setTheme(isLight);
        });
        
        // Initialize theme
        const savedTheme = localStorage.getItem('lightMode') === 'true';
        setTheme(savedTheme);
    }

    // Scroll Animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Hero Scroll Indicator Animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        });
    }
    
    // Article Image Hover Effect
    document.querySelectorAll('.article-image').forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = image.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            image.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * 5}deg)`;
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Dynamic Grid Item Animation
    const gridItems = document.querySelectorAll('.featured-post');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        animateOnScroll.observe(item);
    });

    // Whiteboard functionality
    const canvas = document.getElementById('whiteboard');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let brushColor = '#000000'; // Default color
        let brushSize = 2; // Default brush size

        // Adjust canvas size dynamically
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial resize

        // Start drawing
        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            draw(e); // Draw immediately on mousedown
        });

        // Stop drawing
        canvas.addEventListener('mouseup', () => {
            drawing = false;
            ctx.beginPath(); // Reset the path to avoid connecting lines
        });

        canvas.addEventListener('mouseleave', () => {
            drawing = false;
            ctx.beginPath(); // Reset the path when the mouse leaves the canvas
        });

        // Draw on the canvas
        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.strokeStyle = brushColor;

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        });

        // Clear the whiteboard
        const clearButton = document.getElementById('clear-whiteboard');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }

        // Change brush color
        const colorPicker = document.getElementById('color-picker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                brushColor = e.target.value;
            });
        }

        // Change brush size
        const brushSizeInput = document.getElementById('brush-size');
        if (brushSizeInput) {
            brushSizeInput.addEventListener('input', (e) => {
                brushSize = e.target.value;
            });
        }

        // Fullscreen functionality
        const fullscreenButton = document.getElementById('fullscreen-whiteboard');
        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', () => {
                if (canvas.requestFullscreen) {
                    canvas.requestFullscreen();
                } else if (canvas.webkitRequestFullscreen) {
                    canvas.webkitRequestFullscreen(); // Safari
                } else if (canvas.msRequestFullscreen) {
                    canvas.msRequestFullscreen(); // IE/Edge
                }
            });
        }
    }

    // Navigation Menu Toggle
    const navToggle = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navToggles = document.querySelector('.nav-toggles');
    const body = document.body;

    function toggleMenu() {
        navLinks.classList.toggle('active');
        navToggles.classList.toggle('active');
        body.classList.toggle('nav-open'); // Prevent scrolling when menu is open
    }

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            toggleMenu();
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});