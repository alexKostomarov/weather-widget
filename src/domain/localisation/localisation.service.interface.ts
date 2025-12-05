import {Language} from "@/domain/localisation/language";

export type TranslationDictionary = Record<string, string>;
export interface LocalisationServiceInterface {
    loadDictionary(language: Language): Promise<TranslationDictionary>;
}