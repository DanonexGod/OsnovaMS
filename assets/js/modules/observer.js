/* ==========================================================================
   Reveal Animation (IntersectionObserver)
========================================================================== */

export default function initObserver() {

    const elements = document.querySelectorAll("[data-animate]");

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    elements.forEach((el) => observer.observe(el));

}