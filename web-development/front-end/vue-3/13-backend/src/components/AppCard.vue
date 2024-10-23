<script setup lang="ts">
interface Props {
  title: string
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
})

</script>
<template>
  <div class="rounded mt-3 col-12 col-md-6 mx-auto shadow p-3 mb-5 bg-white rounded">
    <h3 v-if="props.title">{{ props.title }}</h3>
    <slot />
  </div>
</template>