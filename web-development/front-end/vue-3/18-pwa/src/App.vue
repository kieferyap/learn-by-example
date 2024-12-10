<script setup lang="ts">
import { ButtonHTMLAttributes, ComputedRef, computed, defineAsyncComponent, provide, ref } from 'vue'
import { useUserStore } from './stores/useUserStore'
import { AlertMessageFunction, RouterEntry } from './types'
import { RoleType } from './enums/role'
import { useRouter } from 'vue-router'
import { Action, Subject } from './plugins/casl/ability'
import AppCard from './components/AppCard.vue'
import useCookie from './composables/useCookie'
import { useCaslAbility } from './plugins/casl/useCaslAbility'

const ability = useCaslAbility()
const userStore = useUserStore()
const buttonProperties: ButtonHTMLAttributes = {
  type: 'button',
  class: 'btn btn-outline-primary'
}

const alertMessage = ref('')
const setAlertMessage = function (value: string) {
  alertMessage.value = value
}

// Get login status
const { deleteCookie, getCookie } = useCookie()
const userData = JSON.parse(getCookie('userData') ?? '{}')

if ('username' in userData && 'roleType' in userData && 'id' in userData) {
  userStore.username = userData.username
  userStore.role = userData.roleType
  userStore.id = userData.id
}

const router = useRouter()
const logout = async function () {
  try {
    // Clear the cookies
    deleteCookie('authToken')
    deleteCookie('userData')
    deleteCookie('abilityRules')

    // Clear the store
    userStore.username = ''
    userStore.role = RoleType.User
    userStore.id = 0

    // Reset the ability
    ability.update([])

    // Set alert message
    alertMessage.value = 'Logout successful'

    // Redirect to login
    router.push('/login')
  } catch (error) {
    console.log('Error occured while logging out:', error)
  }
}

const routerData: ComputedRef<RouterEntry[]> = computed(() => {
  const sidebarData = [
    {
      name: 'Posts',
      to: '/posts',
      isVisible: true
    },
    {
      name: 'Users',
      to: '/users',
      isVisible: ability.can(Action.Manage, Subject.User)
    },
    {
      name: 'Settings',
      to: '/settings',
      isVisible: true
    },
    {
      name: 'Notifications',
      to: '/notifications',
      isVisible: true
    }
  ]
  return userStore.id ? sidebarData : []
})

const isLoggedIn = computed(() => {
  return !!userStore.id
})

const isLayoutVertical = ref(true)

// The following code imports them using defineAsyncComponent()
const LayoutVertical = defineAsyncComponent(() => import('./components/LayoutVertical.vue'))
const LayoutHorizontal = defineAsyncComponent(() => import('./components/LayoutHorizontal.vue'))

// The following code imports them as is, without using defineAsyncComponent
// import LayoutVertical from './components/LayoutVertical.vue'
// import LayoutHorizontal from './components/LayoutHorizontal.vue'

provide('alert-message', { alertMessage, setAlertMessage } as AlertMessageFunction)

</script>

<template>
  <AppCard title="PWA">
    <div v-if="isLoggedIn">
      <!-- Header -->
      <div class="row">
        <h4 class="col-6 text-secondary">
          Welcome, {{ userStore.username }}
        </h4>
      </div>

      <!-- Layout switcher -->
      <div class="row">
        <div class="col-12 pb-2">
          <div class="form-check form-switch">
            <input
              v-model="isLayoutVertical"
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            >
            <label
              class="form-check-label"
              for="flexSwitchCheckDefault"
            >
              {{ isLayoutVertical ? 'Vertical' : 'Horizontal' }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <Component
      :is="isLayoutVertical ? LayoutVertical : LayoutHorizontal"
      :isLoggedIn="isLoggedIn"
      :routerData="routerData"
      :buttonProperties="buttonProperties"
      @logout="logout"
    >
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
    </Component>
    <div class="row">
      <div class="col text-center">
        <RouterView name="footer" />
      </div>
    </div>
  </AppCard>
</template>

<style scoped></style>
