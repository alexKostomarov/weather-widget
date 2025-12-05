
import { OpenWeatherMapService } from "@/infrastructure/open-weather-map/open.weather.map.service";
import { CityEntity } from "@/domain/city/city.entity";

describe("OpenWeatherMapService (integration)", () => {
    const API_KEY = process.env.API_KEY
    if (!API_KEY) {
        throw new Error("API_KEY is not set in environment")
    }


    const service = new OpenWeatherMapService(API_KEY)

    it("searchLocations возвращает реальные места", async () => {
        const result = await service.searchLocations("нальчик")
        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toHaveProperty("latitude")
        expect(result[0]).toHaveProperty("longitude")
    })

    it("searchLocationByCoords возвращает реальное место", async () => {
        const result = await service.searchLocationByCoords(42.6977, 23.3219)
        expect(result).not.toBeNull()
        expect(result?.name).toBe("Sofia")
    })

    it("getWeatherForLocation возвращает реальные данные погоды", async () => {
        const place: CityEntity = {
            id: "42.6977-23.3219",
            name: "Sofia",
            countryCode: "BG",
            latitude: 42.6977,
            longitude: 23.3219,
            order: 0,
        }

        const weather = await service.getWeatherForLocation(place, "metric", "en")
        expect(weather).not.toBeNull()
        expect(typeof weather?.temperature).toBe("number")
        expect(typeof weather?.description).toBe("string")
    })
})
