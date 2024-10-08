<script setup lang="ts">
import { Ref, ref, shallowRef, watch } from 'vue';
import ListGroupInput from './ListGroupInput.vue';
import AppendedInput from './AppendedInput.vue';

const selectedValue = shallowRef(AppendedInput)
const bindOptions = {
  inputModel: '',
}

const options = [
{
  value: AppendedInput,
  text: 'Input with append',
},
{
  value: ListGroupInput,
  text: 'List Group Input',
}]
</script>

<template>
  <select
    class="form-select"
    aria-label="Select example"
    v-model="selectedValue"
  >
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.text"
    >
      {{ option.text }}
    </option>
  </select>
  <hr />
  <KeepAlive>
    <Component
      :is="selectedValue"
      v-bind="bindOptions"
    />
  </KeepAlive>
</template>