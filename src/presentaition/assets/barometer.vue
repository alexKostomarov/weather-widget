<template>
  <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" :stroke="color" stroke-width="2" />
    <path
        d="M6 18L18 6"
        :stroke="color"
        stroke-width="1"
        stroke-linecap="round"
    />
    <path
        d="M14 6H18V10"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
  color?: string
}>()
</script>

