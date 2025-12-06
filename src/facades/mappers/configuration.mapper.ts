import {WidgetConfigurationEntity} from "@/domain/configuration/widget.configuration.entity";
import {ConfigurationDto} from "@/facades/dto/configuratiuon.dto";
import {CityMapper} from "@/facades/mappers/city.mapper";
import {mapToCityEntity} from "@/domain/city/city.entity";
import {isUnitSystem} from "@/domain/weather/units.systems";
import {isLanguage} from "@/domain/localisation/language";
import { DEFAULT_REFRESH_INTERVAL} from "@/config";

export class ConfigurationMapper {
    static toConfigurationDto(config: WidgetConfigurationEntity): ConfigurationDto {
        return {
            language: config.language as string,
            units: config.units as string,
            cities: config.locations.map(city => CityMapper.toCityModel(city))
        }
    }

    static toWidgetConfigurationEntity(config: ConfigurationDto): WidgetConfigurationEntity {
        if (!isUnitSystem(config.units) || !isLanguage(config.language)) {
            throw new Error('Invalid configuration')
        }

        return {
            locations: config.cities.map(city => mapToCityEntity(city)),
            units: config.units,
            language: config.language,
            refreshInterval: DEFAULT_REFRESH_INTERVAL
        }
    }
}
