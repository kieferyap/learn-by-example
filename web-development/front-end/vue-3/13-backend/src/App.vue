<script setup lang="ts">
import { provide, ref } from 'vue'
import AppCard from './components/AppCard.vue'
import RouterButton from './components/RouterButton.vue'
import { AlertMessageFunction } from './types'

const buttonProperties = {
  type: 'button',
  class: 'btn btn-outline-primary'
}

const alertMessage = ref('')
const setAlertMessage = function (value: string) {
  alertMessage.value = value
}

provide('alert-message', { alertMessage, setAlertMessage } as AlertMessageFunction)

</script>

<template>
  <AppCard title="Backend: HTTP Requests">
    <div class="row">
      <div class="col-3">
        <div class="btn-group-vertical w-100">
          <RouterButton
            to="/posts"
            :button="buttonProperties"
            name="Posts"
          />
          <RouterButton
            to="/users"
            :button="buttonProperties"
            name="Users"
          />
        </div>
      </div>
      <div class="col-9">
        <div
          class="alert alert-primary alert-dismissible fade show"
          role="alert"
          v-if="alertMessage"
        >
          {{ alertMessage }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            @click="alertMessage = ''"
          />
        </div>
        <RouterView />
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <RouterView name="footer" />
      </div>
    </div>
  </AppCard>
</template>

<style scoped></style>
