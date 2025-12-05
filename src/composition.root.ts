import {GeoCodingServiceInterface} from "@/domain/city/geo.coding.service.interface";
import {WeatherServiceInterface} from "@/domain/weather/weather.service.interface";
import {OpenWeatherMapService} from "@/infrastructure/open-weather-map/open.weather.map.service";

import {BrowserGeolocationService} from "@/infrastructure/local/browser.geolocation.service";

import {LocalStorageConfigurationRepository} from "@/infrastructure/local/local.storage.configuration.repository";

import {WidgetConfiguration} from "@/application/configuration/widget.configuration";
import {WeatherCases} from "@/application/weather/weather.cases";
import {ManageLocations} from "@/application/city/manage.locations";

import type { I18n } from 'vue-i18n';
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


export function initRootComposer(apiKey: string, widgetBaseUrl: string) {
    rootComposer.widgetBaseUrl = widgetBaseUrl;
    rootComposer.widgetConfigurationRepository = new LocalStorageConfigurationRepository();
    const owmService = new OpenWeatherMapService(apiKey);
    rootComposer.weatherService = owmService;
    rootComposer.geoCodingService = owmService;
    rootComposer.geoLocationService = new BrowserGeolocationService();

    //use cases
    rootComposer.cityUseCases = new ManageLocations(rootComposer.widgetConfigurationRepository);
    rootComposer.configurationUseCases = new WidgetConfiguration(
        rootComposer.widgetConfigurationRepository,
        rootComposer.geoLocationService,
        rootComposer.geoCodingService
    );
    rootComposer.weatherUseCases = new WeatherCases(rootComposer.weatherService);

}

