<script setup lang="ts">
import { ref } from 'vue'
import { NameValue } from '@/types'
import ListGroupInput from "./ListGroupInput.vue"


// Component custom properties: Props
interface Props {
  first: string
  middle: string
  last: string
}
const props = withDefaults(defineProps<Props>(), {
  first: "First",
  middle: "Middle",
  last: "Last"
})

// Emitting a signal to the parent: Emits

interface Emit {
  (e: "changed-first:value", value: NameValue): void
  (e: "changed-middle:value", value: NameValue): void
  (e: "changed-last:value", value: NameValue): void
}
const emit = defineEmits<Emit>()

// Clone the property
const first = ref(props.first)
const middle = ref(props.middle)
const last = ref(props.last)
</script>

<template>
  <!-- First name -->
  <ListGroupInput
    class="bg-danger"
    placeholder="First name"
    :input-model="first"
    @changed:value="emit('changed-first:value', $event)"
  />

  <!-- Middle name -->
  <ListGroupInput
    class="bg-warning"
    placeholder="Middle name"
    :input-model="middle"
    @changed:value="emit('changed-middle:value', $event)"
  />

  <!-- Last name -->
  <ListGroupInput
    class="bg-info"
    placeholder="Last name"
    :input-model="last"
    @changed:value="emit('changed-last:value', $event)"
  />
</template>