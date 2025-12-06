<template>
  <div class="w-full mb-5">
    <h2 class="text-xl font-semibold">{{`${city.name}, ${city.countryCode}`}}</h2>
    <div class="flex justify-center-safe items-center gap-3">
      <weather-icon :icon-url="weather.iconUrl" />
      <div class="flex-grow text-3xl font-semibold">
        {{Math.round(weather.temperature)}}
        <span>{{t(`units.${state.units}.temperature`)}}</span>
      </div>
    </div>
    <div>
      {{t('feels_like')}}
      {{Math.round(weather.feelsLikeTemperature)}}
      <span>{{t(`units.${state.units}.temperature`)}}</span>
      <span class="pl-2">{{weather.description}}</span>
    </div>
    <div class="grid grid-cols-2 gap-x-8 gap-y-2 mt-5">
      <div class="flex justify-start items-center">
        <wind-arrow />
        <div class="ml-2">{{weather.windSpeed}} {{t(`units.${state.units}.wind-speed`)}}</div>
        <div class="ml-2">{{windDirection(weather.windDirection)}}</div>
      </div>

      <div class="flex justify-start items-center">
        <barometer stroke="#ffffff" :size="16" />
        <div class="ml-1">{{weather.pressure}} {{t(`units.${state.units}.pressure`)}}</div>
      </div>

      <div class="flex justify-start items-center">
        <div>{{t('humidity')}} {{weather.humidity}}%</div>
      </div>

      <div class="flex justify-start items-center">
        <div>
          {{t('dew_point')}}
          <span v-if="weather.dew_point">{{weather.dew_point}}%</span>
          <span v-else>{{t('n/a')}}</span>
        </div>
      </div>

      <div class="flex justify-start items-center">
        <div>{{t('visibility')}} {{weather.visibility}} {{t(`units.${state.units}.visibility`)}}</div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">

import {WeatherDto} from "@/facades/dto/WeatherDto";
import {CityModel} from "@/presentaition/store/models/city.model";
import WeatherIcon from "@/presentaition/components/weather/WeatherIcon.vue";
import WindArrow from "@/presentaition/assets/WindArrow.vue";
import Barometer from "@/presentaition/assets/barometer.vue";
import {windDirection} from "@/presentaition/utils/windDirection";
import {useConfiguration} from "@/presentaition/store/use.configuration";
import {useTranslation} from "@/presentaition/utils/useTranslation";
import {useI18n} from "vue-i18n";



const {state} = useConfiguration();
const { t } = useTranslation();


defineProps<{
  city: CityModel,
  weather: WeatherDto
}>();



</script>