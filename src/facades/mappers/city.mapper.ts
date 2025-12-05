import type {CityEntity} from "@/domain/city/city.entity";
import type {CityModel} from "@/presentaition/store/models/city.model";
export class CityMapper {
    static toCityModel(city: CityEntity): CityModel {
        return {
            id: city.id,
            name: city.name,
            countryCode: city.countryCode,
            latitude: city.latitude,
            longitude: city.longitude,
            order: city.order
        } as CityModel;
    }
    static toCityEntityFromCityModel(city: CityModel): CityModel {

        if (!city?.latitude || !city?.longitude|| !city?.name || !city?.countryCode) {
            throw new Error('Invalid city data ');
        }

        return {
            id: city.id,
            name: city.name,
            countryCode: city.countryCode,
            latitude: city.latitude,
            longitude: city.longitude,
            order: 0,
        } as CityEntity;

    }

}