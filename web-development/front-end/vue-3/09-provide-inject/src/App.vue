<script setup lang="ts">
import {
  Ref,
  computed,
  provide,
  ref,
} from "vue"
import { FirstNameFunction, MiddleNameFunction, LastNameFunction } from "./types";
import PassThrough from "./components/PassThrough.vue";

const firstName: Ref<string> = ref('Ryan')
const middleName: Ref<string> = ref('Rodney')
const lastName: Ref<string> = ref('Reynolds')

const updateFirst = function (value: string) {
  firstName.value = value
}

const updateMiddle = function (value: string) {
  middleName.value = value
}

const updateLast = function (value: string) {
  lastName.value = value
}

provide('keyNumber', 'Test')
provide('firstName', { firstName, updateFirst } as FirstNameFunction)
provide('middleName', { middleName, updateMiddle } as MiddleNameFunction)
provide('lastName', { lastName, updateLast } as LastNameFunction)

const computedFullName = computed(() => {
  return `${firstName.value} ${middleName.value} ${lastName.value}`
})

</script>

<template>
  <span>
    <!-- Components, Props, Emits -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 offset-md-3">
      <h3>Provide, Inject</h3>

      <!-- Name -->
      <ul class="list-group">
        <PassThrough />

        <!-- Full name -->
        <li class="list-group-item">
          Full name: <b>{{ computedFullName }}</b>
        </li>

      </ul>
    </div>
  </span>
</template>