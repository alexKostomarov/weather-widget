import {WeatherServiceInterface} from "@/domain/weather/weather.service.interface";
import {CityEntity} from "@/domain/city/city.entity";
import {WidgetConfigurationEntity} from "@/domain/configuration/widget.configuration.entity";
import {WeatherEntity} from "@/domain/weather/weather.entity";

export class WeatherCases {

    private weatherService: WeatherServiceInterface;

    constructor(weatherService: WeatherServiceInterface) {
        this.weatherService = weatherService;
    }

    private async fetchWeatherForLocation(
        location: CityEntity,
        units: WidgetConfigurationEntity['units'],
        language: WidgetConfigurationEntity['language']
    ): Promise<WeatherEntity | null> {
        try {

           return await this.weatherService.getWeatherForLocation(
                location,
                units,
                language
           );

        } catch (error) {
            console.error(`[WeatherUseCase] Fetch error for ${location.name} (${location.countryCode}):`, error);
            return null;
        }
    }

    async fetchWeather(config: WidgetConfigurationEntity): Promise<WeatherEntity[]> {

        if (config.locations.length === 0) {
            return [];
        }


        const weatherPromises = config.locations.map(location =>
            this.fetchWeatherForLocation(location, config.units, config.language)
        );


        const results = await Promise.allSettled(weatherPromises);

        return results.filter(p => p.status === 'fulfilled').map(p => p.value as WeatherEntity);
    }

}