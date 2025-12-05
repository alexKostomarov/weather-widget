<template>
  <div class="current-conditions flex justify-start items-center mb-4" >
    <weather-icon :icon-url="entity.iconUrl" />
    <div class="flex-grow">
      <p class="text-5xl font-light leading-none">7°C</p>
      <p class="text-sm mt-1">Feels like -3°C. Broken clouds. Light breeze</p>
    </div>
  </div>

  <metrics-list :entity="entity" />
  <hr class="my-6 border-widget opacity-20">

</template>

<script setup lang="ts">

import {WeatherEntity} from "@/domain/weather/weather.entity";
import WeatherIcon from "@/presentaition/components/weather/WeatherIcon.vue";
import MetricsList from "@/presentaition/components/MetricsList.vue";


defineProps<{entity: WeatherEntity}>();


</script>