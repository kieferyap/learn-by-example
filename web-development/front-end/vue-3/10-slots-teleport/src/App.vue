<script setup lang="ts">
import { ref, watch } from 'vue'
import AppLoading from './components/AppLoading.vue'
import FullNameInput from './components/FullNameInput.vue'

const isLoading = ref(true)
const progress = ref(0)
const waitTimeMs = 4000

setTimeout(() => {
  isLoading.value = false
}, waitTimeMs)

const interval = setInterval(() => {
  progress.value += 5
}, waitTimeMs / 20)

watch(progress, (value) => {
  if (value === 100) {
    clearInterval(interval)
  }
})
</script>

<template>
  <!-- Slots -->
  <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
    <h3>Slots</h3>

    <ul class="list-group">
      <!-- Using only the default slot -->
      <li class="list-group-item text-center">
        <AppLoading
          :is-loading="isLoading"
          variant="primary"
        >
          <div class="fw-bold">
            All done!
          </div>
        </AppLoading>
      </li>

      <!-- Using multiple slots -->
      <li class="list-group-item text-center">
        <AppLoading :is-loading="isLoading">
          <template #loading-text>
            <b class="ms-1">Now Loading...</b>
          </template>
          <template #default>
            Loading has finished!
          </template>
        </AppLoading>
      </li>

      <!-- Using progress -->
      <li class="list-group-item text-center">
        <AppLoading
          :is-loading="isLoading"
          variant="success"
        >
          <template #progress>
            <div class="text-center">
              {{ progress }}%
            </div>
          </template>
        </AppLoading>
      </li>
    </ul>
  </div>

  <!-- Scoped Slots -->
  <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
    <h3>Scoped Slots</h3>

    <FullNameInput>
      <template #default="slotProps">
        {{ slotProps.last }}<span v-if="slotProps.last">,</span>
        {{ slotProps.first }}
        {{ slotProps.middle.charAt(0) }}<span v-if="slotProps.middle">.</span>
      </template>
    </FullNameInput>
  </div>

  <!-- Teleport -->
  <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
    <h3>Teleport</h3>
    <teleport to="body">
      <footer class="text-center mt-3 mb-2">Footer (c) 2024</footer>
    </teleport>
  </div>
</template>