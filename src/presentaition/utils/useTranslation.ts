import { i18n } from '@/locales/i18n';
import { computed } from 'vue';


export function useTranslation() {
    const t = (key: string) => {
        return i18n.global.t(key);
    };

    const locale = computed({
        get: () => i18n.global.locale.value,
        set: (val) => { i18n.global.locale.value = val; }
    });


    return { t, locale };
}

// не реактивно!!!
export function getMsg(path: string, fallback?: string): string {
    return i18n.global.t(path) || fallback || path;
}