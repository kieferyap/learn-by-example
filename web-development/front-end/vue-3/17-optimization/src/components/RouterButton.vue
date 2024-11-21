<script setup lang="ts">
interface Props {
  to: string
  name: string
  isVisible: boolean
  button: any
}
const props = defineProps<Props>()
</script>

<template>
  <router-link
    v-if="props.isVisible"
    :to="props.to"
    tag="button"
    v-bind="props.button"
  >
    {{ props.name }}
  </router-link>
</template>

<style lang="css" scoped>
.router-link-active {
  background-color: #0d6efd;
  color: white;
}

.router-link-exact-active::before {
  content: '👉 ';
}
</style>