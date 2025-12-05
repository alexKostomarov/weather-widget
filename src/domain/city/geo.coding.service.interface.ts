import type { CityEntity } from "@/domain/city/city.entity";

export interface GeoCodingServiceInterface {

    searchLocations(query: string): Promise<CityEntity[]>;
    searchLocationByCoords(lat: number, lon: number): Promise<CityEntity | null>;
}