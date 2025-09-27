// Smooth scroll for navigation links
document.querySelectorAll('.menu-bar a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Simple contact form handler (shows message, does not send email)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('formMessage').textContent = "Thank you for contacting me!";
        contactForm.reset();
    });
}