<template>
    <div>
      <div class="text-caption-mobile md:text-caption-desktop font-semibold mb-2">
        {{t('settings')}}
      </div>
        <place-list />
      <div class="mt-4">
        <add-place />
      </div>

      <div class="w-full mt-4 grid grid-cols-2 gap-4">
        <div class="w-full">
          <metric-set />
        </div>
        <div class="w-full">
          <language-set />
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">

import AddPlace from "@/presentaition/components/settings/AddPlace.vue";
import PlaceList from "@/presentaition/components/settings/PlaceList.vue";
import MetricSet from "@/presentaition/components/settings/MetricSet.vue";
import LanguageSet from "@/presentaition/components/settings/LanguageSet.vue";
import {useTranslation} from "@/presentaition/utils/useTranslation";

const {t} = useTranslation();

</script>

