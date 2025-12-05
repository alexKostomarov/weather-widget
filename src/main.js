import {createApp} from 'vue';
import App from './App.vue';
import widgetStyles from './presentaition/style.css?inline';
import { createPinia } from 'pinia';
import {  initRootComposer} from "@/composition.root.ts";
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import {createI18n} from "vue-i18n";

const getCurrentScriptPath = () => {

    const script = document.currentScript;

    if (script) {
        if ("src" in script) {
            const fullPath = script.src;
            return fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
        }

    }
    return null;
};

const baseUrl = getCurrentScriptPath();//URL of the current script

const el = document.querySelector('weather-widget, .weather-widget');

let apiKey = null;

if (el) {
    apiKey = el.getAttribute('api-key');
}


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: { en, ru },
});


//DI Container
initRootComposer(apiKey, baseUrl);



class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        // Создаём Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Подключаем стили через <style> внутри Shadow DOM
        const styleEl = document.createElement('style');
        styleEl.textContent = widgetStyles;
        shadow.appendChild(styleEl);

        // Контейнер для Vue
        const container = document.createElement('div');
        shadow.appendChild(container);

        // Создаём Vue app внутри этого контейнера
        const app = createApp(App, {
            apiKey: this.getAttribute('api-key')
        });

        // Pinia
        const pinia = createPinia();
        app.use(pinia);


        app.use(i18n);


        // Монтируем Vue в контейнер
        app.mount(container);
    }
}


if (!customElements.get('weather-widget')) {
    customElements.define('weather-widget', WeatherWidget);
}

