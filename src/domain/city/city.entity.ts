export interface CityEntity {

    readonly id: string;
    readonly name: string;
    readonly countryCode: string;
    readonly latitude: number;
    readonly longitude: number;
    order: number;
}

export function isPlace(value: unknown): value is CityEntity {
    if (typeof value !== 'object' || value === null) return false;

    const obj = value as Partial<CityEntity>;

    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.countryCode === 'string' &&
        typeof obj.order === 'number' &&
        typeof obj.latitude === 'number' &&
        typeof obj.longitude === 'number'
    );
}

export function mapToCityEntity(dto: any): CityEntity {

    if (!dto?.lat || !dto?.lon|| !dto?.name || !dto?.country) {
        throw new Error('Invalid city data ');
    }

    const id = `${dto.lat.toFixed(4)}-${dto.lon.toFixed(4)}`;

    return {
        id: id,
        name: dto.name,
        countryCode: dto.country,
        latitude: dto.lat,
        longitude: dto.lon,
        order: 0,
    } as CityEntity;
}
