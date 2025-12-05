import type {CityModel} from "@/presentaition/store/models/city.model";
import { rootComposer}  from "@/composition.root";
import { mapToCityEntity} from "@/domain/city/city.entity";
import {ConfigurationDto} from "@/facades/dto/configuratiuon.dto";
import {ConfigurationMapper} from "@/facades/mappers/configuration.mapper";
import { CityMapper } from "@/facades/mappers/city.mapper";
import {isUnitSystem, UnitsSystems, UnitSystem} from "@/domain/weather/units.systems";
import {isLanguage, Language, Languages} from "@/domain/localisation/language";


export class ConfigurationFacade {


    async loadConfiguration(): Promise<ConfigurationDto> {
        const config = await rootComposer.configurationUseCases.init();
        return ConfigurationMapper.toConfigurationDto(config);
    }

    async addLocation(city: CityModel): Promise<ConfigurationDto>{
        const config = await rootComposer.cityUseCases.addLocation(CityMapper.toCityEntityFromCityModel(city));
        return ConfigurationMapper.toConfigurationDto(config);
    }
    async saveConfiguration(config: ConfigurationDto){
        await rootComposer.configurationUseCases.saveConfiguration( ConfigurationMapper.toWidgetConfigurationEntity(config));
    }

    async removeLocation(city: CityModel): Promise<ConfigurationDto>{
        const config = await rootComposer.cityUseCases.removeLocation(city.id);
        return ConfigurationMapper.toConfigurationDto(config);
    }

    async reorderLocations(cities: CityModel[]): Promise<ConfigurationDto>{
        const config = await rootComposer.cityUseCases.reorderLocations(
            cities.map(item => CityMapper.toCityEntityFromCityModel(item))
        );
        return ConfigurationMapper.toConfigurationDto(config);
    }

    async searchLocation(query: string): Promise<CityModel[]> {
       const cities = await rootComposer.geoCodingService.searchLocations(query);
       return cities.map(city => CityMapper.toCityModel(city));
    }

    metricSystems(): string[] {
        return [...UnitsSystems];
    }
    languagesList(): string[] {
        return [...Languages];
    }

    async setLanguage(lang: string): Promise<void>{
        if( isLanguage(lang)) {
            await rootComposer.configurationUseCases.setLanguage(lang as Language);
        }

    }

    async setUnitSystem(unit: string): Promise<void>{
        if( isUnitSystem(unit)) {
            await rootComposer.configurationUseCases.setUnitSystem(unit as UnitSystem);
        }
    }

}