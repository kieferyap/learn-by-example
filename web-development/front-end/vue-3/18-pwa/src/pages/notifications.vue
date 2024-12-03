<script setup lang="ts">
import { ref, computed } from 'vue'
import usePushSubscription from './../composables/useNotification'
import { $api } from './../composables/useApi'

const {
  isSubscribed,
  notificationLoading,
  subscribeUser,
  unsubscribeUser,
  pushNotification,
} = usePushSubscription()

const notificationStrings = {
  disabled: 'Notifications are disabled',
  enabled: 'Notifications are enabled',
}

const notificationLabel = computed(() => (isSubscribed.value
  ? notificationStrings.enabled
  : notificationStrings.disabled
))
const isLoading = ref(false)
const isSwitchOn = ref(isSubscribed.value)

const loadData = async function () {
  isLoading.value = true

  const response = await $api('/settings/push')

  if (response.success && response.data[0].value) {
    isSwitchOn.value = true
    subscribeUser()
  }

  isLoading.value = false
}

loadData()

const toggleSubscription = () => {
  if (isSubscribed.value)
    unsubscribeUser()
  else
    subscribeUser()
}
</script>

<template>
  <div class="row">
    <h3>Push Notifications</h3>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="form-check form-switch">
        <div
          v-if="notificationLoading"
          class="spinner-border"
          role="status"
        ></div>
        <input
          v-else
          v-model="isSwitchOn"
          class="form-check-input"
          type="checkbox"
          @change="toggleSubscription"
        >
        <label class="form-check-label">
          {{ notificationLoading ? 'Loading...' : notificationLabel }}
        </label>
      </div>
    </div>
  </div>
</template>
