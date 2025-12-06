<template>
  <div v-for="city in configuration.cities">
    <city-item :city="city" :weather="weather.weatherForCity(city.id)" v-if="weather.weatherForCity(city.id)"/>
  </div>
</template>

<script setup lang="ts">

import {watchEffect} from "vue";
import CityItem from "@/presentaition/components/weather/CityItem.vue";
import {useConfiguration} from "@/presentaition/store/use.configuration";
import {useWeatherStore} from "@/presentaition/store/use.weather.store";
import {useI18n} from "vue-i18n";


const configuration = useConfiguration();
const weather = useWeatherStore();

watchEffect(async () => {
  const cities = configuration.cities
  if (cities.length) {
    console.log('reload weather')
    await weather.fetchData()
  }
})

const {locale} = useI18n()

</script>