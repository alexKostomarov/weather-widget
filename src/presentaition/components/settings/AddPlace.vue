<template>
  <div class="w-full">
    <div class="text-caption-mobile md:text-caption-desktop font-semibold mb-2">
      {{getMsg('add_location')}}
    </div>
    <div class="w-full flex items-center justify-between relative">
      <input
          v-model="query"
          id="city-add"
          type="text"
          class="px-4 py-2 rounded-md bg-input-bg text-body-mobile md:text-body-desktop w-4/5 flex-shrink-0 flex-grow-0 border border-primary"
          placeholder="Enter city"
      />
      <enter class="cursor-pointer ml-5 text-widget"/>
    </div>
    <div
        class="w-4/5 top-[42px] left-0 bg-input-bg min-h-10 px-4 py-2 rounded-md"
        v-if="Object.keys(suggests).length > 0"
        ref="target"
    >
      <ul class="space-y-1">
        <li
            v-for="(city,id) in suggests"
            :key="id"
            class="cursor-pointer hover:text-gray-400"
            @click="addCity(city.id)"
        >
          {{city.name}}, {{city.countryCode}}
        </li>
      </ul>
    </div>




  </div>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import Enter from "@/presentaition/assets/enter.vue";
import {getMsg} from "@/presentaition/utils/i18n.helper";
import { refDebounced } from "@vueuse/core";
import {useConfiguration} from "@/presentaition/store/use.configuration";
import {CityModel} from "@/presentaition/store/models/city.model";
import { onClickOutside } from "@vueuse/core";

const {searchLocation, addLocation} = useConfiguration();

const query = ref<string>('');
const debouncedQuery = refDebounced(query, 300)

const suggests = ref<Record<string,CityModel>>({});

watch(debouncedQuery, async (q) => {
  if(q.trim().length < 3 ) return;
  suggests.value = {};
  const locations = await searchLocation(q);
  locations.forEach(l => suggests.value[l.id] = l);
});

const addCity = async (id: string): Promise<void> => {
  await addLocation(suggests.value[id]);
  query.value = '';
  suggests.value = {};
}

const target = ref<HTMLElement | null>(null);

onClickOutside(target, () => {
  suggests.value = {};
  query.value = '';
})

</script>