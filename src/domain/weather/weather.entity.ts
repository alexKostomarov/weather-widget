export interface WeatherEntity {

    readonly cityId: string;

    readonly temperature: number;
    readonly feelsLikeTemperature: number;

    readonly windSpeed: number;
    readonly windDirection: number;

    readonly pressure: number;
    readonly humidity: number;
    readonly visibility: number;
    readonly dew_point: number;


    readonly description: string;
    readonly iconUrl: string;
}