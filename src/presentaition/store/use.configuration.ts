import {defineStore} from "pinia";
import {computed, reactive, readonly} from "vue";
import {CityModel} from "@/presentaition/store/models/city.model";
import {ConfigurationDto} from "@/facades/dto/configuratiuon.dto";
import {ConfigurationFacade} from "@/facades/configuration.facade";
import {i18n, isLocale, Locale} from "@/locales/i18n";


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

        const config = await configurator.loadConfiguration();
        if (!config) return;

        if(state.language !== config.language && isLocale(config.language)) {
            i18n.global.locale.value = config.language as Locale;
        }

        Object.assign(state, config);

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