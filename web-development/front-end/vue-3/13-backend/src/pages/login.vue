<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'
import { ref } from 'vue'

definePage({
  meta: {
    unauthenticated: true,
  }
})

const username = ref('')
const password = ref('')

const login = async function () {
  console.log('Login will be covered in mixins/composables, next lesson.')
}
</script>

<template>
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
        type="button"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>