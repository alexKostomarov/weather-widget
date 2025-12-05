import type {ConfigurationRepositoryInterface} from "@/domain/configuration/configuration.repository.interface";
import type {WidgetConfigurationEntity} from "@/domain/configuration/widget.configuration.entity";
import {isUnitSystem, UnitsSystems, UnitSystem} from "@/domain/weather/units.systems";
import {isLanguage, Language, Languages} from "@/domain/localisation/language";
import type {CityEntity,} from "@/domain/city/city.entity";
import {isPlace} from "@/domain/city/city.entity";

const CONFIG_STORAGE_KEY = 'weatherWidgetConfig';


export class LocalStorageConfigurationRepository implements ConfigurationRepositoryInterface {

    async loadConfiguration(): Promise<WidgetConfigurationEntity | null> {

        const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);

        if (!storedConfig) {
            return null;
        }

        try {
            // Парсинг данных
            const parsedConfig: Record<string, any> = JSON.parse(storedConfig);

            const units: UnitSystem = isUnitSystem(parsedConfig.units) ? parsedConfig.units as UnitSystem : UnitsSystems[0];

            const language: Language = isLanguage(parsedConfig.language) ? parsedConfig.language as Language : Languages[0];

            const locations: CityEntity[] = [];
            
            if( Array.isArray(parsedConfig.locations) ) parsedConfig.locations.forEach(location => {
                if(isPlace(location)) locations.push(location as CityEntity);
            });

            const refreshInterval: number = typeof parsedConfig.refreshInterval === 'number' ? parsedConfig.refreshInterval : 3600000;

            return {
                locations,
                units,
                language,
                refreshInterval,
            } as WidgetConfigurationEntity;


        } catch (error) {
            console.error("Error loading or parsing configuration from Local Storage:", error);
            return null;
        }
    }

    async saveConfiguration(config: WidgetConfigurationEntity): Promise<void> {
        try {
            const configString = JSON.stringify(config);

            localStorage.setItem(CONFIG_STORAGE_KEY, configString);

        } catch (error) {
            console.error("Error saving configuration to Local Storage (possibly Quota Exceeded):", error);
        }
    }
}