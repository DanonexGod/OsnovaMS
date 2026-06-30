/**
 * ============================================================================
 * Navigation / Mobile Menu
 * MS Design System
 * ============================================================================
 */

export default class Navigation {

    constructor() {

        this.burger = document.querySelector('.burger');
        this.menu = document.querySelector('.mobile-menu');

        if (!this.burger || !this.menu) return;

        this.isOpen = false;

        this.focusableSelector =
            'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

        this.focusableElements = [];
        this.firstFocusable = null;
        this.lastFocusable = null;

        this.boundKeydown = this.handleKeydown.bind(this);
        this.boundClick = this.handleDocumentClick.bind(this);

    }

    init() {

        this.prepareAccessibility();

        this.burger.addEventListener(
            'click',
            () => this.toggle()
        );

        this.menu
            .querySelectorAll('a')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    () => this.close()
                );

            });

        document.addEventListener(
            'keydown',
            this.boundKeydown
        );

        document.addEventListener(
            'click',
            this.boundClick
        );

        window.addEventListener(
            'resize',
            () => {

                if (window.innerWidth > 1024) {

                    this.close();

                }

            },
            {
                passive: true
            }
        );

    }

    prepareAccessibility() {

        this.burger.setAttribute(
            'aria-expanded',
            'false'
        );

        this.burger.setAttribute(
            'aria-label',
            'Открыть меню'
        );

        this.menu.setAttribute(
            'aria-hidden',
            'true'
        );

    }

    toggle() {

        this.isOpen
            ? this.close()
            : this.open();

    }

    open() {

        this.isOpen = true;

        this.burger.classList.add('is-active');

        this.menu.classList.add('is-open');

        document.body.style.overflow = 'hidden';

        this.burger.setAttribute(
            'aria-expanded',
            'true'
        );

        this.menu.setAttribute(
            'aria-hidden',
            'false'
        );

        this.collectFocusable();

        if (this.firstFocusable) {

            this.firstFocusable.focus();

        }

        document.dispatchEvent(
            new CustomEvent('menu:open')
        );

    }

    close() {

        if (!this.isOpen) return;

        this.isOpen = false;

        this.burger.classList.remove('is-active');

        this.menu.classList.remove('is-open');

        document.body.style.overflow = '';

        this.burger.setAttribute(
            'aria-expanded',
            'false'
        );

        this.menu.setAttribute(
            'aria-hidden',
            'true'
        );

        this.burger.focus();

        document.dispatchEvent(
            new CustomEvent('menu:close')
        );

    }

    collectFocusable() {

        this.focusableElements = [

            ...this.menu.querySelectorAll(
                this.focusableSelector
            )

        ];

        this.firstFocusable =
            this.focusableElements[0] || null;

        this.lastFocusable =
            this.focusableElements[
                this.focusableElements.length - 1
            ] || null;

    }

    handleKeydown(event) {

        if (!this.isOpen) return;

        if (event.key === 'Escape') {

            this.close();

            return;

        }

        if (
            event.key !== 'Tab' ||
            this.focusableElements.length === 0
        ) {
            return;
        }

        if (
            event.shiftKey &&
            document.activeElement === this.firstFocusable
        ) {

            event.preventDefault();

            this.lastFocusable.focus();

            return;

        }

        if (
            !event.shiftKey &&
            document.activeElement === this.lastFocusable
        ) {

            event.preventDefault();

            this.firstFocusable.focus();

        }

    }

    handleDocumentClick(event) {

        if (!this.isOpen) return;

        const insideMenu =
            this.menu.contains(event.target);

        const insideBurger =
            this.burger.contains(event.target);

        if (insideMenu || insideBurger) {

            return;

        }

        this.close();

    }

    resize() {

        if (
            window.innerWidth > 1024 &&
            this.isOpen
        ) {

            this.close();

        }

    }

}