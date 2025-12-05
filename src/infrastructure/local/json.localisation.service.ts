import type {Language} from "@/domain/localisation/language";
import {Languages} from "@/domain/localisation/language";
import type {
    LocalisationServiceInterface,
    TranslationDictionary
} from "@/domain/localisation/localisation.service.interface";

export class JsonLocalisationService implements LocalisationServiceInterface{

    private readonly baseDictionary: TranslationDictionary;

    constructor(baseDictionary: TranslationDictionary, baseUrl?: string) {
        if(baseUrl) this.baseUrl = baseUrl;
        this.baseDictionary = baseDictionary;
    }

    private readonly baseUrl: string | null = null;

    async loadDictionary(language: Language):  Promise<TranslationDictionary>{

        if (language === Languages[0] || !this.baseUrl) {
            return this.baseDictionary;
        }


        try{
            const path = `${this.baseUrl}locales/${language}.json`;

            const response = await fetch(path);

            if (response.ok) {
                return await response.json();
            }
        }
        catch (error) {
            console.warn(`[JsonLocalisationService] Не удалось загрузить словарь для языка: ${language}.`, error);
        }
        return {};
    }
}