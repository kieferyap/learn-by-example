<script setup lang="ts">
import { useUserStore } from './../stores/useUserStore'
import { ref } from 'vue'
import User from './../models/user'

const userStore = useUserStore()
const username = ref(userStore.username)
const isLoading = ref(false)

const saveChanges = async function() {
  isLoading.value = true

  // Update user
  const response = await User.find(userStore.id)
  const user: User = 'data' in response ? response.data : response
  user.username = username.value
  await user.save()

  // Update store
  userStore.username = username.value
  isLoading.value = false
}
</script>

<template>
  <form @submit.prevent="() => {}">
    <h4 class="mb-3">Settings</h4>
    <!-- Username -->
    <div class="input-group mb-3">
      <span class="input-group-text" id="settings-username">Username</span>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        v-model="username"
      >
    </div>

    <!-- Login button -->
    <div class="row">
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          class="btn btn-outline-primary mb-4"
          type="submit"
          :disabled="isLoading"
          @click="saveChanges"
        >
          {{ isLoading ? 'Loading...' : 'Save changes' }}
        </button>
      </div>
    </div>
  </form>
</template>