import {WeatherEntity} from "@/domain/weather/weather.entity";
import {WeatherDto} from "@/facades/dto/WeatherDto";

export class WeatherMapper {
    static toWeatherDto(entity: WeatherEntity): WeatherDto {
        return entity as WeatherDto
    }
}