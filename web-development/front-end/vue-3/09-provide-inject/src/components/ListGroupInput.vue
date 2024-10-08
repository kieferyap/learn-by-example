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

const emitNewValue = function () {
  emit('changed:value', inputModel.value)
}
</script>

<template>
  <li class="list-group-item">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">
          {{ inject('key-number') }}
        </span>
      </div>
      <input
        type="text"
        class="form-control"
        :placeholder="props.placeholder"
        v-model="inputModel"
        @input="emitNewValue"
      />
    </div>
  </li>
</template>