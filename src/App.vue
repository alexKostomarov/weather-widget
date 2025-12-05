<template>
  <div class="weather-widget-root text-body-mobile md:text-body-mobile font-base relative scrollbar-thin">

    <div class="w-full min-h-[360px]">
      <button
          class="text-widget opacity-70 hover:opacity-100 cursor-pointer absolute top-2 right-2"
          @click="settingsView = !settingsView"
      >
        <gear  v-if="!settingsView" />
        <close v-else/>
      </button>

      <div class="w-full mt-5" v-if="settingsView">
        <settings/>
      </div>

      <div class="w-full" v-else>
        <weather />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import gear from "@/presentaition/assets/gear.vue";
import Close from "@/presentaition/assets/close.vue";
import Settings from "@/presentaition/components/Settings.vue";
import Weather from "@/presentaition/components/Weather.vue";
import {useConfiguration} from "@/presentaition/store/use.configuration";


const configuration = useConfiguration();

configuration.loadConfiguration();


const settingsView = ref(false);


</script>
