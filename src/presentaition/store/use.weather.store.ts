import { defineStore } from 'pinia';
import {computed, inject, reactive, readonly, watch} from 'vue';
import type { WidgetConfigurationEntity } from '@/domain/configuration/widget.configuration.entity';
import type { WeatherEntity } from '@/domain/weather/weather.entity';
import type { CityEntity } from '@/domain/city/city.entity';
import { ViewMode } from '@/presentaition/store/models/view.mode';
import {Languages} from "@/domain/localisation/language";
import type {Language} from "@/domain/localisation/language";
import {WeatherFacade} from "@/facades/weatherFacade";
import {WeatherDto} from "@/facades/dto/WeatherDto";


// Интерфейс Состояния
interface WeatherState {
    weatherData: Record<string, WeatherDto>;
    isLoading: boolean;
    error: string | null;
}

export const useWeatherStore = defineStore('weather', () => {


    const state = reactive<WeatherState>({
        weatherData: {},
        isLoading: false,
        error: null
    });

    const service = new WeatherFacade();

    // getters
    const weatherData = computed(() => state.weatherData);

    const weatherForCity = (locationId: string) => state.weatherData[locationId] ?? null;


    //actions
    const fetchData = async () => {// получение данных о погоде
        const data = await service.fetch();
        state.weatherData = {}
        for (const item of data) {
            state.weatherData[item.cityId] = item
        }
    };




    return {
        //getters
        weatherData: readonly(weatherData),
        weatherForCity,
        isLoading: computed(() => state.isLoading),
        //actions
        fetchData
    };
});

