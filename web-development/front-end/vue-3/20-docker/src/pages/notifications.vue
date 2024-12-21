<script setup lang="ts">
import { ref, computed } from 'vue'
import usePushSubscription from './../composables/useNotification'
import { $api } from './../composables/useApi'
import { SettingType } from '../enums/setting'
import { useUserStore } from '../stores/useUserStore'
import AppLoading from './../components/AppLoading.vue'

const userStore = useUserStore()
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

const message = ref('')

const notificationLabel = computed(() => (isSubscribed.value
  ? notificationStrings.enabled
  : notificationStrings.disabled
))
const isLoading = ref(false)

const loadData = async function () {
  isLoading.value = true

  const response = await $api('/settings/retrieve', {
    method: 'POST',
    body: {
      userId: userStore.id,
      settingId: SettingType.PushNotification,
    }
  })

  isSubscribed.value = false
  if (response.success && response.data[0].value) {
    isSubscribed.value = true
    subscribeUser()
  }

  isLoading.value = false
}

loadData()

// When this function is called, the flag has already been toggled.
const toggleSubscription = () => {
  if (!isSubscribed.value)
    unsubscribeUser()
  else
    subscribeUser()
}
</script>

<template>
  <div class="row">
    <h3>Push Notifications</h3>
  </div>
  <AppLoading
    :is-loading="notificationLoading"
    variant="primary"
  >
    <div class="row mt-2">
      <div class="col-12">
        <div class="form-check form-switch">
          <input
            v-model="isSubscribed"
            class="form-check-input"
            type="checkbox"
            @change="toggleSubscription"
          >
          <label
            class="form-check-label"
            v-if="!notificationLoading"
          >
            {{ notificationLabel }}
          </label>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Message</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="A sample notification"
            :disabled="!isSubscribed"
            v-model="message"
          >
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              type="button"
              :disabled="!isSubscribed"
              @click="pushNotification(message)"
            >Send</button>
          </div>
        </div>
      </div>
    </div>
  </AppLoading>
</template>
