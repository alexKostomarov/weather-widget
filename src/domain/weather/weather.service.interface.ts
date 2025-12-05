import type { WeatherEntity } from "@/domain/weather/weather.entity";
import type { CityEntity } from "@/domain/city/city.entity";
import type { UnitSystem } from "@/domain/weather/units.systems";
import type { Language } from "@/domain/localisation/language";

/**
 * An interface representing a weather service that provides weather data for a given location.
 */
export interface WeatherServiceInterface {

    /**
     * Retrieves the weather information for a specified location.
     *
     * @param {CityEntity} location - The location for which the weather data is to be fetched.
     * @param {UnitSystem} units - The unit system to format the weather data, such as metric or imperial.
     * @param {Language} language - The language in which the weather data should be returned.
     * @return {Promise<WeatherEntity>} A promise that resolves to the weather data for the given location.
     */
    getWeatherForLocation(location: CityEntity, units: UnitSystem, language: Language): Promise<WeatherEntity | null>;
}