/**
 * ============================================================================
 * MS Corporate Website
 * Core Application
 * ES6+
 * ============================================================================
 */

'use strict';

/* ============================================================================
   MODULE IMPORTS
============================================================================ */

import Header from '../modules/header.js';
import Navigation from '../modules/menu.js';
import Observer from '../modules/observer.js';
import Counter from '../modules/counter.js';
import Accordion from '../modules/accordion.js';
import Tabs from '../modules/tabs.js';
import Modal from '../modules/modal.js';
import Form from '../modules/form.js';
import LazyLoad from '../modules/lazyload.js';
import Scroll from '../modules/scroll.js';
import Slider from '../modules/slider.js';
import initObserver from "../modules/observer.js";
import initCounters from "../modules/counter.js";

document.addEventListener("DOMContentLoaded", () => {

    initObserver();
    initCounters();

});

/* ============================================================================
   APPLICATION
============================================================================ */

class App {

    constructor() {

        this.modules = [];

        this.initialize();

    }

    initialize() {

        if (document.readyState === 'loading') {

            document.addEventListener(
                'DOMContentLoaded',
                () => this.boot()
            );

            return;

        }

        this.boot();

    }

    boot() {

        document.documentElement.classList.remove('no-js');

        this.initializeModules();

        this.bindEvents();

        this.dispatchReadyEvent();

        console.info('%cMS Website Loaded',
            'color:#0F5FA8;font-weight:bold;');

    }

    initializeModules() {

        this.modules = [

            new Header(),
            new Navigation(),
            new Observer(),
            new Counter(),
            new Accordion(),
            new Tabs(),
            new Modal(),
            new Form(),
            new LazyLoad(),
            new Scroll(),
            new Slider()

        ];

        this.modules.forEach(module => {

            if (typeof module.init === 'function') {

                module.init();

            }

        });

    }

    bindEvents() {

        window.addEventListener(

            'resize',

            this.debounce(() => {

                this.modules.forEach(module => {

                    if (typeof module.resize === 'function') {

                        module.resize();

                    }

                });

            }, 150)

        );

        window.addEventListener(

            'scroll',

            this.throttle(() => {

                this.modules.forEach(module => {

                    if (typeof module.scroll === 'function') {

                        module.scroll();

                    }

                });

            }, 16),

            {
                passive: true
            }

        );

    }

    dispatchReadyEvent() {

        document.dispatchEvent(

            new CustomEvent('app:ready')

        );

    }

    /* =========================================================================
       HELPERS
    ========================================================================= */

    debounce(callback, delay = 200) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

    throttle(callback, limit = 16) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            callback(...args);

            waiting = true;

            requestAnimationFrame(() => {

                waiting = false;

            });

        };

    }

}

/* ============================================================================
   START APPLICATION
============================================================================ */

new App();

export default App;