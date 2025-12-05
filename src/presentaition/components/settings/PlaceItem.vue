<template>
  <div class="flex items-center justify-start px-4 py-2 rounded-md bg-input-bg " >
    <hamburger class="cursor-pointer" />
    <div class="ont-medium ml-4 leading-none">
      {{ city.name }}, {{city.countryCode}}
    </div>
    <garbage  class="ml-auto hover:text-gray-400 cursor-pointer" @click="remove"/>
  </div>

</template>
<script setup lang="ts">
import {CityModel} from "@/presentaition/store/models/city.model";
import Garbage from "@/presentaition/assets/garbage.vue";
import Hamburger from "@/presentaition/assets/hamburger.vue";
import {useConfiguration} from "@/presentaition/store/use.configuration";

const props = defineProps<{city: CityModel}>();

const { removeLocation } = useConfiguration();
const remove = async () => {
  await removeLocation( props.city );
}
</script>