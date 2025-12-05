<template>
  <img
      :src="iconUrl"
      :alt="iconUrl"
      class="flex-shrink-0 w-36 h-36"
  >
</template>

<script setup lang="ts">

defineProps<{ iconUrl: string }>()

</script>