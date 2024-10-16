<script setup lang="ts">
// Component custom properties: Props
interface Props {
  id: number
  title: string
  date: string
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: "",
  date: ""
})

</script>
<template>
  <div class="border border-primary rounded p-3 pb-0 mb-3">
    <router-link v-if="props.title" :to="`/posts/${props.id}`">
      <h4>
        {{ props.title }}
      </h4>
    </router-link>
    <slot />
    <p class="text-secondary mt-2">{{ props.date }}</p>
  </div>
</template>