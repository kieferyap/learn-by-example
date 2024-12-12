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
    <div :class="props.isLoggedIn ? 'col-12' : 'd-none'">
      <div class="btn-group w-100">
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
  </div>
  <div class="row">
    <div class="col-12 pt-3">
      <slot />
    </div>
  </div>
</template>