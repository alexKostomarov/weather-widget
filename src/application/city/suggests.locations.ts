import {GeoCodingServiceInterface} from "@/domain/city/geo.coding.service.interface";
import {CityEntity} from "@/domain/city/city.entity";

export class SuggestsLocations {

    private geoCodingService: GeoCodingServiceInterface;

    private requestId = 0;//счетчик запросов для ограничения конкуренции.

    constructor(geoCodingService: GeoCodingServiceInterface) {
        this.geoCodingService = geoCodingService;
    }

    async execute(query: string): Promise<CityEntity[]> {

        if (!query || query.trim().length < 3) {
            return [];
        }

        const id = ++this.requestId;//айди запроса
        try {

            const result = await this.geoCodingService.searchLocations(query.trim());

            return id === this.requestId ? result : [];//

        } catch (error) {
            return [];
        }
    }
}