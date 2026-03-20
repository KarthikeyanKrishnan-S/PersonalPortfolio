document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Scroll Animations (Fade in section)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
    // 3. Form Submission (Send to WhatsApp)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default submission
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                // Formatting the message for WhatsApp
                const whatsappNumber = "9345638411";
                const text = `Hi, I am ${name}.\nEmail: ${email}\n\n${message}`;
                const encodedText = encodeURIComponent(text);
                
                // Open WhatsApp Web/App
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
                
                // Reset
                contactForm.reset();
            } else {
                alert('Please fill out all the required fields.');
            }
        });
    }

    // 5. Scroll Spy (Active nav link highlight)
    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('nav ul#nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                // Determine current section ID
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.parentElement.classList.remove('active'); // Remove from li
            item.style.color = ''; // Reset specific styles
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = '#fff';
                item.style.background = 'rgba(255,255,255,0.07)';
            } else {
                item.style.background = 'transparent';
                item.style.color = 'var(--muted)';
            }
        });
    });
});
