<script setup lang="ts">
import { ref } from 'vue';

const isShowingTooltip = ref(false)
</script>

<template>
  <div>
    Basic Transition:
    <u
      class="text-primary cursor-pointer"
      @mouseover="isShowingTooltip = true"
      @mouseout="isShowingTooltip = false"
    >
      Hover Me
    </u>
    &nbsp;
    <transition>
      <span
        v-if="isShowingTooltip"
        class="d-inline-block text-light bg-primary rounded ps-2 pe-2"
      >
        Tooltip information
      </span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>