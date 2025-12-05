declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // Используем DefineComponent для корректного типа
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
