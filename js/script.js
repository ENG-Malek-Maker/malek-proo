// script.js - الخاص بالمدونة الشخصية الرئيسية

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تغيير خلفية شريط التنقل (Navbar) عند التمرير لأسفل
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = '#090d16';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(9, 13, 22, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. التمرير السلس عند الضغط على روابط القائمة (Smooth Scroll)
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. تأثير ظهور عناصر الموقع بشكل تدريجي أثناء التمرير (Scroll Reveal)
    const cards = document.querySelectorAll('.service-card, .skill-card, .project-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(card);
    });
});