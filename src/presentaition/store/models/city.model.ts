export interface CityModel {
    readonly id: string ;
    readonly name: string;
    readonly countryCode: string;
    readonly latitude: number;
    readonly longitude: number;
    order: number;
}