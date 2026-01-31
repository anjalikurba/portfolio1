// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const menuBar = document.querySelector('.menu-bar');

if (menuBtn && menuBar) {
    menuBtn.addEventListener('click', () => {
        menuBar.classList.toggle('active');
        // Toggle icon between bars and times (x)
        const icon = menuBtn.querySelector('i');
        if (menuBar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.menu-bar a').forEach(link => {
        link.addEventListener('click', () => {
            menuBar.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('.menu-bar a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});

// CSS for reveal effect (dynamic injection for simplicity, or could be in style.css)
const style = document.createElement('style');
style.textContent = `
    section.reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Simple contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = "Sending...";
        btn.disabled = true;

        setTimeout(() => {
            document.getElementById('formMessage').textContent = "Thank you for contacting me! I will get back to you soon.";
            btn.textContent = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}// Email Link Handler
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function (e) {
        const email = this.getAttribute('href').replace('mailto:', '');

        navigator.clipboard.writeText(email).then(() => {
            // Show toast
            const toast = document.createElement('div');
            toast.textContent = 'Email copied to clipboard!';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #6366f1; /* var(--primary) might not work in inline style if not computed? It should work if var is on root */
                background: var(--primary, #6366f1);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s;
                font-family: 'Inter', sans-serif;
            `;
            document.body.appendChild(toast);

            // Trigger reflow
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
}
