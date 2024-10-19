<script setup lang="ts">
import {
  Ref,
  computed,
  provide,
  readonly,
  ref,
} from "vue"
import { FirstNameFunction, MiddleNameFunction, LastNameFunction } from "./types";
import BorderedFullName from "./components/BorderedFullName.vue";
import ComponentSelector from "./components/ComponentSelector.vue";

const firstName: Ref<string> = ref('Judith')
const middleName: Ref<string> = ref('Laverne')
const lastName: Ref<string> = ref('Hopps')

const updateFirst = function (value: string) {
  firstName.value = value
}

const updateMiddle = function (value: string) {
  middleName.value = value
}

const updateLast = function (value: string) {
  lastName.value = value
}

const readOnlyKey = ref('Test')

provide('key-number', readonly(readOnlyKey))
provide('first-name', { firstName, updateFirst } as FirstNameFunction)
provide('middle-name', { middleName, updateMiddle } as MiddleNameFunction)
provide('last-name', { lastName, updateLast } as LastNameFunction)

const computedFullName = computed(() => {
  return `${firstName.value} ${middleName.value} ${lastName.value}`
})

</script>

<template>
  <span>
    <!-- Provide, Inject -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Provide, Inject</h3>

      <ul class="list-group">
        <!-- Name -->
        <BorderedFullName />

        <!-- Full name -->
        <li class="list-group-item">
          Full name: <b>{{ computedFullName }}</b>
        </li>

      </ul>
    </div>

    <!-- Dynamic Components -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Dynamic Components</h3>
      <ComponentSelector />
    </div>
  </span>
</template>