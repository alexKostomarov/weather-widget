export interface Weather{

    readonly temperature: number;
    readonly feelsLikeTemperature: number;

    readonly windSpeed: number;
    readonly windDirection: number;
    readonly pressure: number;
    readonly humidity: number;
    readonly visibility: number;

    readonly description: string;
    readonly iconUrl: string;
}