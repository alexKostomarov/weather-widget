<template>
  <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 6H21" stroke="currentColor" :stroke-width="strokeWidth" />
    <path d="M9 6V4H15V6" stroke="currentColor" :stroke-width="strokeWidth" />
    <path d="M5 6L6 20H18L19 6H5Z" stroke="currentColor" :stroke-width="strokeWidth" />
    <path d="M10 10V17" stroke="currentColor" :stroke-width="strokeWidth" />
    <path d="M14 10V17" stroke="currentColor" :stroke-width="strokeWidth" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  strokeWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 24,
  strokeWidth: 2
})
</script>


