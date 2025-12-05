import { ref, onMounted, onUnmounted } from 'vue';

export function useSystemTheme() {
    const theme = ref<'light' | 'dark'>('light');

    onMounted(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const update = () => {
            theme.value = media.matches ? 'dark' : 'light';
        };

        update();
        media.addEventListener('change', update);

        onUnmounted(() => {
            media.removeEventListener('change', update);
        });
    });

    return theme;
}
