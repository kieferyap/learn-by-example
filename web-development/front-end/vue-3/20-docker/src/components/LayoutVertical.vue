<script setup lang="ts">
import { ButtonHTMLAttributes } from 'vue'
import { RouterEntry } from './../types'
import RouterButton from './RouterButton.vue'

interface Props {
  isLoggedIn: boolean
  routerData: RouterEntry[]
  buttonProperties: ButtonHTMLAttributes
}
const props = withDefaults(defineProps<Props>(), {
  isLoggedIn: false
})

interface Emit {
  (e: "logout"): void
}
const emit = defineEmits<Emit>()

</script>

<template>
  <div class="row">
    <div :class="props.isLoggedIn ? 'col-12 col-md-3 mb-2' : 'd-none'">
      <div class="btn-group-vertical w-100">
        <RouterButton
          v-for="entry in props.routerData ?? []"
          :button="buttonProperties"
          :isVisible="entry.isVisible"
          :to="entry.to"
          :name="entry.name"
        />
        <button
          v-bind="buttonProperties"
          @click="emit('logout')"
        >
          Logout
        </button>
      </div>
    </div>
    <div :class="props.isLoggedIn ? 'col-12 col-md-9' : 'col-12'">
      <slot />
    </div>
  </div>
</template>