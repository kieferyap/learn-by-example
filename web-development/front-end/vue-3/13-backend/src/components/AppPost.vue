<script setup lang="ts">
import { ref } from 'vue'

// Component custom properties: Props
interface Props {
  id: number
  title: string
  date: string
  isTitleClickable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: '',
  date: '',
  isTitleClickable: true
})
</script>
<template>
  <div class="border border-primary rounded p-3 pb-0 mb-3">
    <!-- Post title -->
    <router-link
      v-if="props.title && props.isTitleClickable"
      tag="span"
      :to="`/posts/${props.id}`"
    >
      <h4>
        {{ props.title }}
      </h4>
    </router-link>

    <!-- Post body -->
    <slot />

    <!-- Post Date -->
    <div class="row">
      <!-- Post title -->
      <div class="col-9">
        <p class="text-secondary mt-2">{{ props.date }}</p>
      </div>
    </div>
  </div>
</template>