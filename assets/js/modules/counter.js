/* ==========================================================================
   Counter Animation
========================================================================== */

export default function initCounters() {

    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            const target = parseInt(element.dataset.counter, 10);

            let current = 0;

            const step = Math.max(1, Math.ceil(target / 80));

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                element.textContent = current + (element.textContent.includes("%") ? "%" : "+");

            }, 20);

            observer.unobserve(element);

        });

    });

    counters.forEach(counter => observer.observe(counter));

}