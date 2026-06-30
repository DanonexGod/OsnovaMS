/**
 * ============================================================================
 * Header Module
 * MS Design System
 * ----------------------------------------------------------------------------
 * Функции:
 * - Прозрачная шапка
 * - Glass Header после прокрутки
 * - Скрытие при прокрутке вниз
 * - Появление при прокрутке вверх
 * - requestAnimationFrame
 * - Passive Events
 * ============================================================================
 */

export default class Header {

    constructor() {

        this.header = document.querySelector('.header');

        if (!this.header) return;

        this.lastScroll = window.scrollY;
        this.currentScroll = window.scrollY;

        this.ticking = false;

        this.offset = 80;

    }

    init() {

        this.update();

        window.addEventListener(
            'scroll',
            () => this.onScroll(),
            {
                passive: true
            }
        );

    }

    onScroll() {

        this.currentScroll = window.scrollY;

        if (this.ticking) return;

        this.ticking = true;

        requestAnimationFrame(() => {

            this.update();

            this.ticking = false;

        });

    }

    update() {

        this.toggleScrolled();

        this.toggleVisibility();

        this.lastScroll = this.currentScroll;

    }

    /**
     * ------------------------------------------------------------------------
     * Glass Effect
     * ------------------------------------------------------------------------
     */

    toggleScrolled() {

        if (this.currentScroll > this.offset) {

            this.header.classList.add('is-scrolled');

        } else {

            this.header.classList.remove('is-scrolled');

        }

    }

    /**
     * ------------------------------------------------------------------------
     * Hide / Show
     * ------------------------------------------------------------------------
     */

    toggleVisibility() {

        if (this.currentScroll < this.offset) {

            this.header.classList.remove('is-hidden');

            return;

        }

        const scrollingDown = this.currentScroll > this.lastScroll;
        const delta = Math.abs(this.currentScroll - this.lastScroll);

        if (delta < 8) {

            return;

        }

        if (scrollingDown) {

            this.header.classList.add('is-hidden');

        } else {

            this.header.classList.remove('is-hidden');

        }

    }

    /**
     * ------------------------------------------------------------------------
     * Resize Hook
     * ------------------------------------------------------------------------
     */

    resize() {

        this.update();

    }

    /**
     * ------------------------------------------------------------------------
     * Public API
     * ------------------------------------------------------------------------
     */

    show() {

        this.header.classList.remove('is-hidden');

    }

    hide() {

        this.header.classList.add('is-hidden');

    }

    transparent() {

        this.header.classList.remove('is-scrolled');

    }

    solid() {

        this.header.classList.add('is-scrolled');

    }

}