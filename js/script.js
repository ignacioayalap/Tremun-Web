document.addEventListener("DOMContentLoaded", () => {
    // Número de WhatsApp del centro (solo dígitos, con código de país)
    const WHATSAPP_NUMBER = "5492616011011";

    // Cerrar el menú en móviles al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');

    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(menuToggle) || new bootstrap.Collapse(menuToggle, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // Intersección Observer para animaciones suaves al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .accordion-item, .step-card').forEach((el) => {
        if (!el.classList.contains('fade-in-up')) {
            el.style.opacity = '0';
            observer.observe(el);
        }
    });

    // ============================================
    // Formulario de contacto -> abre WhatsApp con el mensaje pre-cargado
    // ============================================
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validación nativa de Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            const lineas = [
                `Hola Tremün, mi nombre es ${nombre}.`,
                '',
                mensaje,
                '',
                '— Datos de contacto —',
                `Email: ${email}`
            ];
            if (telefono) lineas.push(`Teléfono: ${telefono}`);

            const texto = encodeURIComponent(lineas.join('\n'));
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank', 'noopener');

            form.classList.remove('was-validated');
            form.reset();

            // Aviso breve de confirmación
            const aviso = document.getElementById('form-feedback');
            if (aviso) {
                aviso.classList.remove('d-none');
                setTimeout(() => aviso.classList.add('d-none'), 6000);
            }
        });
    }
});