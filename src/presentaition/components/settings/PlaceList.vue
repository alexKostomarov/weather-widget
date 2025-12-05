<template>
  <draggable v-model="localCities" item-key="id" @end="onReorder">

    <template #item="{ element }: { element: CityModel }">
      <place-item :city="element as CityModel" class="mb-1" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import PlaceItem from "@/presentaition/components/settings/PlaceItem.vue";
import {useConfiguration} from "@/presentaition/store/use.configuration";
import draggable from "vuedraggable";
import {CityModel} from "@/presentaition/store/models/city.model";


const store = useConfiguration();
const localCities = ref<CityModel[]>([]);//Нужна глубокая копия, т.к. readonly

watch(() => store.cities,(newVal) => {//Следим за добавлением и удалением локаций
      localCities.value = JSON.parse(JSON.stringify(newVal)) as CityModel[];
    },
    { immediate: true }
)
const onReorder = (evt: any) => {

  localCities.value.forEach((city, index) => {
    city.order = index
  })
  store.reorderLocations(localCities.value);
}
</script>