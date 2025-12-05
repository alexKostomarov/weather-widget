<template>
  <div class="flex justify-end items-center">
    <select v-model="lang" class="border rounded mb-1" id="language">
      <option v-for="(lang, id) in languages" :value="lang" :key="id">{{lang}}</option>
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