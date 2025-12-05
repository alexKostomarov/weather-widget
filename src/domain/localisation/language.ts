export const Languages = ['en', 'ru'] as const;
export type Language = typeof Languages[number];
export function isLanguage(value: string): value is Language {
    return Languages.includes(value as Language);
}