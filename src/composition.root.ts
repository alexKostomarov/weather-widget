import {GeoCodingServiceInterface} from "@/domain/city/geo.coding.service.interface";
import {WeatherServiceInterface} from "@/domain/weather/weather.service.interface";
import {OpenWeatherMapService} from "@/infrastructure/open-weather-map/open.weather.map.service";

import {BrowserGeolocationService} from "@/infrastructure/local/browser.geolocation.service";

import {LocalStorageConfigurationRepository} from "@/infrastructure/local/local.storage.configuration.repository";

import {WidgetConfiguration} from "@/application/configuration/widget.configuration";
import {WeatherCases} from "@/application/weather/weather.cases";
import {ManageLocations} from "@/application/city/manage.locations";

import type {ConfigurationRepositoryInterface} from "@/domain/configuration/configuration.repository.interface";
import {GeoLocationServiceInterface} from "@/domain/city/geo.location.service.interface";




interface RootComposer {
    widgetBaseUrl: string,
    widgetConfigurationRepository: ConfigurationRepositoryInterface,
    weatherService: WeatherServiceInterface,
    geoCodingService: GeoCodingServiceInterface,
    geoLocationService: GeoLocationServiceInterface

    //use cases
    cityUseCases: ManageLocations,
    configurationUseCases: WidgetConfiguration,
    weatherUseCases: WeatherCases
}


export const rootComposer = {} as RootComposer;


export function initRootComposer(config: Record<string, string>) {

    rootComposer.widgetBaseUrl = config.baseUrl ?? '';
    rootComposer.widgetConfigurationRepository = new LocalStorageConfigurationRepository();
    rootComposer.geoLocationService = new BrowserGeolocationService();

    if (!config.provider) throw new Error('Provider is not defined');

    switch (config.provider) {
        case 'openweathermap.org':
            if (!config.apiKey) throw new Error('apiKey required for OpenWeatherMap provider');
            const owmService = new OpenWeatherMapService(config.apiKey);
            rootComposer.weatherService = owmService;
            rootComposer.geoCodingService = owmService;
            break;
        default: throw new Error(`Provider ${config.provider} is not supported`);
    }



    //use cases
    rootComposer.cityUseCases = new ManageLocations(rootComposer.widgetConfigurationRepository);
    rootComposer.configurationUseCases = new WidgetConfiguration(
        rootComposer.widgetConfigurationRepository,
        rootComposer.geoLocationService,
        rootComposer.geoCodingService
    );
    rootComposer.weatherUseCases = new WeatherCases(rootComposer.weatherService);

}

