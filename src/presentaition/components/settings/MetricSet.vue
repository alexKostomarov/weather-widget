<template>
  <div>

    <select v-model="system" class="border rounded mb-1">
      <option v-for="(metric, id) in metrics" :value="metric" :key="id">{{metric}}</option>
    </select>
  </div>

</template>
<script setup lang="ts">
import {useConfiguration} from "@/presentaition/store/use.configuration";
import {ref, watch} from "vue";

const {setMetricSystem, getMetricSystems, state} = useConfiguration();

const metrics = getMetricSystems();
const system = ref(state.units);

watch(system, async () => {

  await setMetricSystem(system.value);
});
</script>