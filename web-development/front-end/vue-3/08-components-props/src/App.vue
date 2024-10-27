<script setup lang="ts">
import FullNameListInput from "./components/FullNameListInput.vue"
import {
  computed,
  reactive,
  ref,
} from "vue"
import { NameValue } from "./types"

const fullName = reactive({
  first: "",
  middle: "",
  last: "",
})

const lastNameCharacterCount = ref(0)

const computedFullName = computed(() => {
  return `${fullName.first} ${fullName.middle} ${fullName.last}`
})

const updateLastName = function (event: NameValue) {
  fullName.last = event.name
  lastNameCharacterCount.value = event.characterCount
}

</script>

<template>
  <span>
    <!-- Components, Props, Emits -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Components, Props, Emits</h3>

      <!-- Name -->
      <ul class="list-group">
        <FullNameListInput 
          v-bind="fullName" 
          @changed-first:value="fullName.first = $event.name"
          @changed-middle:value="fullName.middle = $event.name"
          @changed-last:value="updateLastName($event)"
        />

        <!-- Full name -->
        <li class="list-group-item">
          Full name: <b>{{ computedFullName }}</b>
        </li>

        <!-- Last name character count -->
        <li class="list-group-item">
          Last name character count: <b>{{ lastNameCharacterCount }}</b>
        </li>

      </ul>
    </div>
  </span>
</template>