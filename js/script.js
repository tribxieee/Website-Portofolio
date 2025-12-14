

// Helper: cek apakah elemen terlihat di viewport
function isInViewport(el, offset = 0) {
    const rect = el.getBoundingClientRect();
    return rect.top < (window.innerHeight - offset);
}

// Animasi skill bar
function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    const skillFills = document.querySelectorAll('.skill-fill');

    if (isInViewport(skillsSection, 100)) {
        skillFills.forEach(skill => {
            skill.style.width = skill.getAttribute('data-width');
        });
        window.removeEventListener('scroll', animateSkills);
    }
}

// Fade-in per section
function fadeInSection(section) {
    if (!section.classList.contains('fade-in-done') && isInViewport(section, 100)) {
        section.querySelectorAll('*').forEach(child => {
            child.style.opacity = 1;
            child.style.transform = 'translateY(0)';
        });
        section.classList.add('fade-in-done');
    }
}

// Tombol interaktif (langsung responsif tanpa delay)
document.querySelectorAll('.btn-home, .btn-about, .contact-form button').forEach(btn => {
    btn.style.transition = 'transform 0.2s ease'; // lebih cepat
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});

// Inisialisasi skill bar width ke 0
document.querySelectorAll('.skill-fill').forEach(skill => {
    skill.setAttribute('data-width', skill.style.width);
    skill.style.width = '0';
    skill.style.transition = 'width 1.5s ease-in-out';
});

// Inisialisasi semua section konten (opacity 0 + translate)
document.querySelectorAll('section').forEach(section => {
    section.querySelectorAll('*').forEach(child => {
        child.style.opacity = 0;
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'all 0.8s ease-out';
    });
});

// Event scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => fadeInSection(section));
    animateSkills();
});

// Trigger animasi pertama kali untuk section yang langsung terlihat
document.querySelectorAll('section').forEach(section => fadeInSection(section));
animateSkills();


document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // cegah form submit biasa

        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const phone = contactForm.querySelector('input[type="tel"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields!');
            return;
        }

        // tampilkan data
        alert(`Message sent!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);

        // reset form
        contactForm.reset();
    });

});
