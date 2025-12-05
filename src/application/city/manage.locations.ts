import {ConfigurationRepositoryInterface} from "@/domain/configuration/configuration.repository.interface";
import {WidgetConfigurationEntity} from "@/domain/configuration/widget.configuration.entity";
import {CityEntity} from "@/domain/city/city.entity";

export class ManageLocations {

    private configRepo: ConfigurationRepositoryInterface;

    constructor(configRepo: ConfigurationRepositoryInterface) {
        this.configRepo = configRepo;
    }

    private reIndexLocations(locations: CityEntity[]): CityEntity[] {
        return locations.map((location, index) => ({...location, order: index}));
    }


    async addLocation(location: CityEntity): Promise<WidgetConfigurationEntity>{

        const config = await this.configRepo.loadConfiguration();

        if(!config) throw new Error('No config found');//такого после init быть не должно

        if(config.locations.some(loc => loc.id === location.id)){//Дубликат, надо бы поточнее определить что значит дубликат. пока так
            return config;
        }

        const locations = this.reIndexLocations([...config.locations, location]);


        const newConfig: WidgetConfigurationEntity = {...config, locations: locations };

        await this.configRepo.saveConfiguration(newConfig);

        return newConfig;

    }

    async removeLocation(cityId: string ): Promise<WidgetConfigurationEntity>{

        const config = await this.configRepo.loadConfiguration();

        if(!config) throw new Error('No config found');//такого после init быть не должно

        const locations = this.reIndexLocations(config.locations.filter(loc => loc.id !== cityId));

        const newConfig: WidgetConfigurationEntity = {...config, locations: locations };

        await this.configRepo.saveConfiguration(newConfig);

        return newConfig;
    }

    async reorderLocations(newLocations: CityEntity[]): Promise<WidgetConfigurationEntity> {

        const config = await this.configRepo.loadConfiguration();

        if(!config) throw new Error('No config found');//такого после init быть не должно

        // 1. Ре-индексация нового массива для корректного обновления поля 'order'
        const locations = this.reIndexLocations(newLocations);

        const newConfig: WidgetConfigurationEntity = {
            ...config,
            locations: locations
        };

        await this.configRepo.saveConfiguration(newConfig);

        return newConfig;
    }

}