import { defineStore } from 'pinia';
import {computed, inject, reactive, readonly} from 'vue';
import {WeatherFacade} from "@/facades/weatherFacade";
import {WeatherDto} from "@/facades/dto/WeatherDto";


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

