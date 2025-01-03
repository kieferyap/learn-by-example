import { Ref, ref, onMounted } from 'vue'
import { $api } from './useApi'
import { SettingType } from '../enums/setting'
import { useUserStore } from '../stores/useUserStore'

const usePushSubscription = () => {
  const isSubscribed = ref(false)
  const subscription: Ref<PushSubscription | null> = ref(null)
  const notificationLoading = ref(false)
  const userStore = useUserStore()

  // On an actual app, put this in the .env as environmental variables
  // It can then be accessed as: import.meta.env.VITE_VAPID_PUBLIC_KEY, for example
  const ENV_VITE_VAPID_PUBLIC_KEY = 'BKUX6A48x55VlvoHGR-lK1KrLZ6lyrIpFmKG5gE8yMM23acugzfLgcu_2WPF6qdhe_T1-S7RkxYTYjqXXaz16-U'

  // Checks if the user is currently subscribed by looking into the serviceWorker and pushManager
  const checkSubscription = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready
      const existingSubscription = await registration.pushManager.getSubscription()

      if (existingSubscription) {
        isSubscribed.value = true
        subscription.value = existingSubscription
      }
    }
    else {
      console.error('Service worker not found, or push is not supported.')
    }
  }

  // Subscribes the user to push notifications by first asking for permission
  const subscribeUser = async () => {
    notificationLoading.value = true
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready

      subscription.value = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: String(ENV_VITE_VAPID_PUBLIC_KEY),
      })

      await $api('/settings/update', {
        method: 'POST',
        body: {
          userId: userStore.id,
          settingId: SettingType.PushNotification,
          value: 1,
        },
      })

      isSubscribed.value = true
    }
    notificationLoading.value = false
  }

  // Unsubscribes the user
  const unsubscribeUser = async () => {
    if (subscription.value) {
      await subscription.value.unsubscribe()

      await $api('/settings/update', {
        method: 'POST',
        body: {
          userId: userStore.id,
          settingId: SettingType.PushNotification,
          value: 0,
        },
      })

      subscription.value = null
      isSubscribed.value = false
    }
  }

  // Sends a push notification given a message
  const pushNotification = async (message: string) => {
    notificationLoading.value = true
    if (subscription.value === null)
      await subscribeUser()

    if (subscription.value) {
      await $api('/settings/push', {
        method: 'POST',
        body: {
          userId: userStore.id,
          settingId: SettingType.PushNotification,
          subscription: JSON.stringify(subscription.value),
          message,
        },
      })
    }
    notificationLoading.value = false
  }

  onMounted(() => {
    checkSubscription()
  })

  return {
    isSubscribed,
    notificationLoading,
    subscribeUser,
    unsubscribeUser,
    pushNotification,
  }
}

export default usePushSubscription
