<script setup lang="ts">
import { ButtonHTMLAttributes, provide, ref } from 'vue'
import { useUserStore } from './stores/useUserStore'
import { AlertMessageFunction } from './types'
import { RoleType } from './enums/role'
import { useRouter } from 'vue-router'
import { Action, Subject } from './plugins/casl/ability'
import RouterButton from './components/RouterButton.vue'
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

provide('alert-message', { alertMessage, setAlertMessage } as AlertMessageFunction)

</script>

<template>
  <AppCard title="Optimization">
    <!-- Header -->
    <div class="row" v-if="userStore.id">
      <h4 class="col-12 text-secondary">
        Welcome, {{ userStore.username }}
      </h4>
    </div>

    <!-- Body -->
    <div class="row">
      <div :class="userStore.id ? 'col-3' : 'd-none'">
        <div class="btn-group-vertical w-100">
          <RouterButton
            to="/posts"
            :button="buttonProperties"
            name="Posts"
          />
          <RouterButton
            to="/users"
            v-if="ability.can(Action.Manage, Subject.User)"
            :button="buttonProperties"
            name="Users"
          />
          <RouterButton
            to="/settings"
            :button="buttonProperties"
            name="Settings"
          />
          <button
            v-bind="buttonProperties"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div :class="userStore.username ? 'col-9' : 'col-12'">
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
