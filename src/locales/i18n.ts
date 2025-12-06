import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

export const supportedLocales = ['en', 'ru'] as const;
export type Locale = typeof supportedLocales[number];
export function isLocale(value: string): value is Locale {
    return (supportedLocales as readonly string[]).includes(value)
}

export const i18n = createI18n({
    locale: 'ru' as Locale,
    fallbackLocale: 'ru' as Locale,
    legacy: false,
    messages: { en, ru },
});
