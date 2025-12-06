<template>
  <div class="flex justify-end items-center">
    <select v-model="lang" class="border rounded-md mb-1 px-2 py-1" id="language" >
      <option v-for="(lang, id) in languages" :value="lang" :key="id" class="bg-widget text-white rounded-md">{{lang}}</option>
    </select>
  </div>

</template>
<script setup lang="ts">
import {useConfiguration} from "@/presentaition/store/use.configuration";
import {ref, watch} from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const {setLanguage, getLanguagesList, state} = useConfiguration();

const languages = getLanguagesList();
const lang = ref(state.language);

watch(lang, async () => {
  locale.value = lang.value;
  await setLanguage(lang.value);
});
</script>