import {createApp} from 'vue';
import App from './App.vue';
import widgetStyles from './presentaition/style.css?inline';
import { createPinia } from 'pinia';
import {  initRootComposer} from "@/composition.root.ts";
import {i18n} from "@/locales/i18n.ts";
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


const el = document.querySelector('weather-widget, .weather-widget');

if(!el) throw new Error('mount error');


if(!el.dataset.config) throw new Error('No config found');

const data = JSON.parse( el.dataset.config);
const config = {
    ...data,
    baseUrl:  getCurrentScriptPath(),
    apiKey: data['api-key'],
};

//DI Container
initRootComposer(config);

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

