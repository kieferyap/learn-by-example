<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'
import { nextTick, ref, inject } from 'vue'
import { $api } from './../composables/useApi'
import useCookie from './../composables/useCookie'
import { useRouter } from 'vue-router'
import { AlertMessageFunction, LoggedInFunction } from './../types'

const { setAlertMessage } = inject('alert-message') as AlertMessageFunction
const { setLoggedIn } = inject('is-logged-in') as LoggedInFunction

definePage({
  meta: {
    unauthenticated: true,
  }
})

const username = ref('')
const password = ref('')
const router = useRouter()
const { setCookie } = useCookie()

const login = async function () {
  try {
    // Call the API
    const response = await $api('/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    // Store the login information in the cookie
    const { authToken, userData } = response
    setCookie('authToken', authToken)
    setCookie('userData', JSON.stringify(userData))
    setLoggedIn(true)

    // Redirect
    setAlertMessage('Login successful')
    await nextTick(() => {
      router.push('/')
    })
  } catch (error) {
    username.value = ''
    password.value = ''
    setAlertMessage('Login incorrect. (Username: dratini, Password: Twister147)')
  }
}
</script>

<template>
  <form @submit.prevent="() => {}">
    <h4 class="mb-3">Login</h4>
    <!-- Username -->
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        v-model="username"
      >
    </div>

    <!-- Password -->
    <div class="input-group mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
      >
    </div>

    <!-- Login button -->
    <div class="row">
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          class="btn btn-primary mb-4"
          type="submit"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>