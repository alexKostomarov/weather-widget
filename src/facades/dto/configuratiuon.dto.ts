import {CityModel} from "@/presentaition/store/models/city.model";

export interface ConfigurationDto{
    language: string;
    units: string;
    cities: CityModel[];
}