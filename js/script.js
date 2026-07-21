document.addEventListener("DOMContentLoaded", () => {
    // Cerrar el menú en móviles al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(menuToggle) || new bootstrap.Collapse(menuToggle, {toggle: false});
                bsCollapse.hide();
            }
        });
    });

    // Intersección Observer para animaciones suaves al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Opcional: dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    // Aplicar a elementos con la clase fade-in-up que no estén en el hero inicial
    // (Para que no se animen todos a la vez, sino al scrollear)
    document.querySelectorAll('.card, .accordion-item').forEach((el) => {
        if (!el.classList.contains('fade-in-up')) {
            el.style.opacity = '0';
            observer.observe(el);
        }
    });
});
