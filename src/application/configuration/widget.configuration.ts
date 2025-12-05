import {ConfigurationRepositoryInterface} from "@/domain/configuration/configuration.repository.interface";
import {GeoLocationServiceInterface} from "@/domain/city/geo.location.service.interface";
import {GeoCodingServiceInterface} from "@/domain/city/geo.coding.service.interface";
import {CityEntity} from "@/domain/city/city.entity";
import {WidgetConfigurationEntity} from "@/domain/configuration/widget.configuration.entity";
import {isUnitSystem, UnitSystem} from "@/domain/weather/units.systems";
import {isLanguage, Language, Languages} from "@/domain/localisation/language";
import {DEFAULT_LANGUAGE, DEFAULT_REFRESH_INTERVAL, DEFAULT_UNIT_SYSTEM} from "@/config";



// Дефолтное положение
const FALLBACK_LOCATION: CityEntity = {
    id: 'default-london',
    name: 'London',
    countryCode: 'GB',
    latitude: 51.509865,
    longitude: -0.118092,
    order: 0,
};


export class WidgetConfiguration {

    private configRepo: ConfigurationRepositoryInterface;
    private geoLocationService: GeoLocationServiceInterface;
    private geoCodingService: GeoCodingServiceInterface;


    constructor(
        configRepo: ConfigurationRepositoryInterface,
        geoLocationService: GeoLocationServiceInterface,
        geoCodingService: GeoCodingServiceInterface
    ) {
        this.configRepo = configRepo;
        this.geoLocationService = geoLocationService;
        this.geoCodingService = geoCodingService;
    }


    async init(): Promise<WidgetConfigurationEntity> {

        const existingConfig = await this.configRepo.loadConfiguration();

        if (existingConfig && existingConfig.locations.length > 0 ) {
            return existingConfig;
        }

        // Конфига нет, создаем новый
        let currentLocation: CityEntity | null = null;

        const coords = await this.geoLocationService.getCurrentIpLocation();

        currentLocation = await this.geoCodingService.searchLocationByCoords(
            coords.latitude,
            coords.longitude
        );

        currentLocation = currentLocation || FALLBACK_LOCATION;

        let widgetLang = DEFAULT_LANGUAGE;

        if (typeof navigator !== 'undefined' && navigator.language) {

            const lang = navigator.language.split('-')[0].toLowerCase();


            if ((Languages as ReadonlyArray<string>).includes(lang)) {
                widgetLang = lang as Language;
            }
        }

        const newConfig: WidgetConfigurationEntity = {
            locations: [currentLocation],
            units: DEFAULT_UNIT_SYSTEM as UnitSystem,
            language: widgetLang as Language,
            refreshInterval: DEFAULT_REFRESH_INTERVAL
        };

        await this.configRepo.saveConfiguration(newConfig);

        return newConfig;
    }

    async setLanguage( lang: Language ): Promise<void>{

        const existingConfig = await this.configRepo.loadConfiguration();

        if(isLanguage(lang) && existingConfig){

            const newConfig: WidgetConfigurationEntity = {
                locations: existingConfig?.locations || [FALLBACK_LOCATION],
                units: existingConfig?.units || DEFAULT_UNIT_SYSTEM as UnitSystem,
                language: lang as Language,
                refreshInterval: DEFAULT_REFRESH_INTERVAL
            };
            await this.configRepo.saveConfiguration(newConfig);
        }


    }

    async setUnitSystem( item: UnitSystem ): Promise<void>{

        const existingConfig = await this.configRepo.loadConfiguration();

        if(isUnitSystem(item) && existingConfig){

            const newConfig: WidgetConfigurationEntity = {
                locations: existingConfig?.locations || [FALLBACK_LOCATION],
                units: item as UnitSystem,
                language: existingConfig?.language || DEFAULT_LANGUAGE as Language,
                refreshInterval: DEFAULT_REFRESH_INTERVAL
            };
            await this.configRepo.saveConfiguration(newConfig);
        }


    }

    async saveConfiguration( config: WidgetConfigurationEntity ): Promise<WidgetConfigurationEntity>{
        await this.configRepo.saveConfiguration(config);
        return config;
    }

}