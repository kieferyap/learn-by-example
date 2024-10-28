<script setup lang="ts">
import { ref } from "vue"
import { NameValue } from '@/types'

// Component custom properties: Props
interface Props {
  inputModel: string
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  inputModel: "",
  placeholder: "Enter text"
})

// Emitting a signal to the parent: Emits
interface Emit {
  (e: "changed:value", value: NameValue): void
}
const emit = defineEmits<Emit>()

const inputModel = ref(props.inputModel)

const emitNewValueCount = function () {
  emit('changed:value', {
    name: inputModel.value,
    characterCount: inputModel.value.length
  })
}
</script>

<template>
  <li class="list-group-item">
    <input
      type="text"
      class="form-control"
      :placeholder="props.placeholder"
      v-model="inputModel"
      @input="emitNewValueCount"
    />
  </li>
</template>