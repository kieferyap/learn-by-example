<script setup lang="ts">
import { inject, ref } from "vue"

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
  (e: "changed:value", value: string): void
}
const emit = defineEmits<Emit>()

const inputModel = ref(props.inputModel)

const emitNewValueCount = function () {
  emit('changed:value', inputModel.value)
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      :placeholder="props.placeholder"
      v-model="inputModel"
      @input="emitNewValueCount"
    />
    <div class="input-group-append">
      <span class="input-group-text">
        kg
      </span>
    </div>
  </div>
</template>