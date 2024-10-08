<script setup lang="ts">

// Component custom properties: Props
interface Props {
  loadingText?: string
  isLoading?: boolean
  variant?: string
}
const props = withDefaults(defineProps<Props>(), {
  loadingText: "Loading...",
  isLoading: true,
  variant: 'dark'
})

</script>

<template>
  <span :class="`text-${props.variant}`">
    <div class="row">
      <span v-if="props.isLoading">
        <div
          class="spinner-border"
          role="status"
        >
        </div>
        <slot name="loading-text">
          <div class="sr-only">
            {{ props.loadingText }}
          </div>
        </slot>
      </span>
      <span v-else>
        <slot>
          Loaded!
        </slot>
      </span>
    </div>

    <!-- Progress bar -->
    <div
      v-if="$slots.progress"
      :class="[
        'row text-center mt-1 border rounded mx-auto w-50',
        `border-${props.variant}`
      ]"
    >
      <slot name="progress" />
    </div>
  </span>
</template>