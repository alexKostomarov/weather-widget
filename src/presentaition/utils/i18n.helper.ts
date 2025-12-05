// i18nHelper.ts
import { useI18n } from 'vue-i18n';

export function getMsg(path: string, fallback?: string): string | undefined {
    const i18n = useI18n(); // Composition API
    if (!i18n || !i18n.messages || !i18n.locale) return fallback;

    // messages.value — объект с языками
    const messages = (i18n.messages.value as Record<string, any>)[i18n.locale.value];
    if (!messages) return fallback;

    return path.split('.').reduce((acc: any, key: string) => {
        if (acc && typeof acc === 'object') return acc[key];
        return undefined;
    }, messages) ?? fallback;
}
