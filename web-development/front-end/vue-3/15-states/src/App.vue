<script setup lang="ts">
import { ButtonHTMLAttributes, provide, ref } from 'vue'
import AppCard from './components/AppCard.vue'
import RouterButton from './components/RouterButton.vue'
import { AlertMessageFunction, LoggedInFunction } from './types'
import useCookie from './composables/useCookie'
import { useRouter } from 'vue-router'

const buttonProperties: ButtonHTMLAttributes = {
  type: 'button',
  class: 'btn btn-outline-primary'
}

const alertMessage = ref('')
const setAlertMessage = function (value: string) {
  alertMessage.value = value
}

const { deleteCookie, getCookie } = useCookie()
const isLoggedIn = ref(false)
const setLoggedIn = function (value: boolean) {
  isLoggedIn.value = value
}
isLoggedIn.value = !!(getCookie('authToken') && getCookie('userData'))

const router = useRouter()
const logout = async function () {
  // Clear the cookies
  deleteCookie('authToken')
  deleteCookie('userData')
  isLoggedIn.value = false

  // Set alert message
  alertMessage.value = 'Logout successful'

  // Redirect to login
  router.push('/login')
}

provide('alert-message', { alertMessage, setAlertMessage } as AlertMessageFunction)
provide('is-logged-in', { isLoggedIn, setLoggedIn } as LoggedInFunction)

</script>

<template>
  <AppCard title="Composables">
    <div class="row">
      <div :class="isLoggedIn ? 'col-3' : 'd-none'">
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
          <button
            v-bind="buttonProperties"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div :class="isLoggedIn ? 'col-9' : 'col-12'">
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
