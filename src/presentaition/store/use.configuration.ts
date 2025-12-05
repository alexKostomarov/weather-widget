import {defineStore} from "pinia";
import {CityModel} from "@/presentaition/store/models/city.model";
import {ConfigurationDto} from "@/facades/dto/configuratiuon.dto";
import {computed, reactive, readonly} from "vue";
import {ConfigurationFacade} from "@/facades/configuration.facade";


export const useConfiguration = defineStore('config', () => {

    const state = reactive<ConfigurationDto>({
        language: 'en',
        units: 'metric',
        cities: []
    });

    const configurator = new ConfigurationFacade();

    //Getters
    const cities =   computed(() => state.cities as CityModel[] );


    //Actions
    async function loadConfiguration() {
        const config = await configurator.loadConfiguration()
        if (config) {
            Object.assign(state, config);
        }
    }

    async function addLocation(city: CityModel) {
        const config = await configurator.addLocation(city);
        if (config) {
            Object.assign(state, config);
        }
    }

    async function removeLocation(city: CityModel) {
        const config = await configurator.removeLocation(city);
        if (config) {
            Object.assign(state, config);
        }
    }

    async function reorderLocations(cities: CityModel[]) {
        const config = await configurator.reorderLocations(cities);
        if (config) {
            Object.assign(state, config);
        }
    }

    async function searchLocation(query: string): Promise<CityModel[]> {
        return  await configurator.searchLocation(query);
    }

    function getMetricSystems(): string[] {
        return configurator.metricSystems();
    }

    async function setMetricSystem (units: string){
        state.units = units;
        await configurator.setUnitSystem(units);
        state.units = units;
    }

    function getLanguagesList(): string[] {
        return configurator.languagesList();
    }

    async function setLanguage (language: string){
        state.language = language;
        await configurator.setLanguage(language);
        state.language = language;
    }


    return {
        state,
        cities: readonly(cities),


        loadConfiguration, addLocation, searchLocation, removeLocation, reorderLocations,
        getMetricSystems, getLanguagesList, setLanguage, setMetricSystem
    }

});