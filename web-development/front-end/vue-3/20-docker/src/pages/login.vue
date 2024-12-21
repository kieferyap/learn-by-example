<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'
import { nextTick, ref, inject } from 'vue'
import { $api } from './../composables/useApi'
import useCookie from './../composables/useCookie'
import { useRouter } from 'vue-router'
import { AlertMessageFunction } from './../types'
import { useUserStore } from '../stores/useUserStore'
import { useCaslAbility } from './../plugins/casl/useCaslAbility'

const { setAlertMessage } = inject('alert-message') as AlertMessageFunction

definePage({
  meta: {
    unauthenticated: true,
  }
})

const username = ref('')
const password = ref('')
const router = useRouter()
const { setCookie } = useCookie()
const userStore = useUserStore()
const ability = useCaslAbility()

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
    const { authToken, userData, permissions } = response
    setCookie('authToken', authToken)
    setCookie('userData', JSON.stringify(userData))
    setCookie('abilityRules', JSON.stringify(permissions))

    // Set the ability of the user
    ability.update(permissions)

    // Set store details
    userStore.username = userData.username
    userStore.role = userData.roleType
    userStore.id = userData.id

    // Redirect
    setAlertMessage('Login successful')
    await nextTick(() => {
      router.push('/')
    })
  } catch (error) {
    console.error(error)
    username.value = ''
    password.value = ''
    setAlertMessage('Login incorrect. (Username: dragonair, Password: DragonTail148)')
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
        name="username"
        class="form-control"
        placeholder="Username"
        v-model="username"
      >
    </div>

    <!-- Password -->
    <div class="input-group mb-3">
      <input
        type="password"
        name="password"
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
          name="login"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>