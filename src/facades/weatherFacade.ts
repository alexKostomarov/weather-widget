import { rootComposer}  from "@/composition.root";
import {CityEntity} from "@/domain/city/city.entity";
import {WeatherDto} from "@/facades/dto/WeatherDto";
import {WeatherMapper} from "@/facades/mappers/weather.mapper";

export class WeatherFacade {
    async fetch(): Promise<WeatherDto[]>{

        const config = await rootComposer.configurationUseCases.init();

        const weatherData = await rootComposer.weatherUseCases.fetchWeather(config);

        return weatherData.map( data => WeatherMapper.toWeatherDto(data));


    }
}