import type { WeatherEntity } from "@/domain/weather/weather.entity";
import type { UnitSystem } from "@/domain/weather/units.systems";
import {CityEntity, mapToCityEntity} from "@/domain/city/city.entity";
import {GeoCodingServiceInterface} from "@/domain/city/geo.coding.service.interface";
import {WeatherServiceInterface} from "@/domain/weather/weather.service.interface";
import {Language} from "@/domain/localisation/language";




export class OpenWeatherMapService implements GeoCodingServiceInterface, WeatherServiceInterface{

    apiKey: string;
    static readonly URL_TEMPLATE = "https://openweathermap.org/img/wn/%s@2x.png";

    private currentController: AbortController | null = null;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
    async searchLocations(query: string): Promise<CityEntity[]> {

        if (this.currentController) {//предотвращаем гонку запросов
            this.currentController.abort();
        }
        this.currentController = new AbortController();

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.log(`[OpenWeatherMapService]searchLocations failed. Status: ${response.status}`);
            return [];
        }

        const data = await response.json();

        return data.map((dto: any) => mapToCityEntity(dto));
    }

    async searchLocationByCoords(lat: number, lon: number): Promise<CityEntity | null> {
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.log(`[OpenWeatherMapService]searchLocationByCoords failed. Status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.length > 0 ? mapToCityEntity(data[0]) : null;
    }


    async getWeatherForLocation(location: CityEntity, units: UnitSystem, language: Language): Promise<WeatherEntity| null> {

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=${units}&lang=${language}&appid=${this.apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log(`[OpenWeatherMapService]getWeatherForLocation failed. Status: ${response.status}`);
            return null
        }

        const data = await response.json();


        return {
            cityId: location.id,
            temperature: data.main.temp,
            feelsLikeTemperature: data.main.feels_like,
            windSpeed: data.wind.speed,
            windDirection: data.wind.deg,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            visibility: data.visibility,
            dew_point: data.main.dew_point,
            description: data.weather[0].description,
            iconUrl: this.getIconUrl(data.weather[0].icon),
        } as WeatherEntity;
    }

    private getIconUrl(iconCode: string): string {
        return OpenWeatherMapService.URL_TEMPLATE.replace("%s", iconCode);
    }
}