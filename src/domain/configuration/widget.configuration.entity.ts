import type {UnitSystem} from "@/domain/weather/units.systems";
import {Language} from "@/domain/localisation/language";
import type {CityEntity} from "@/domain/city/city.entity";


export interface WidgetConfigurationEntity {

    readonly locations: CityEntity[];
    readonly units: UnitSystem;
    readonly language: Language;
    readonly refreshInterval: number;
}