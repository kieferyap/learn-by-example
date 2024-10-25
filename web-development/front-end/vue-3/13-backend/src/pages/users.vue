<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime'
import User from '../../models/user'
import { ref } from 'vue'
import AppLoading from './../components/AppLoading.vue'

definePage({
  // Page-specific navigation guard
  beforeEnter(to, from, next) {
    console.log('users.vue beforeEnter called:', to, from)
    next() // allows access to this page
    // next(false) // blocks access to this page
    // next('/post') // redirects to another page
  }
})

const isLoading = ref(false)
const allUsers = ref<User[]>()

const getUsers = async function () {
  try {
    isLoading.value = true
    const response = await User.get()
    allUsers.value = 'data' in response ? response.data : response
    console.log('response', allUsers.value)
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch users: ${error}`)
  }
}

const tableHeaders = {
  id: 'ID',
  username: 'Name',
  roleType: 'Role'
}

getUsers()

</script>

<template>
  <h4>User List</h4>
  <AppLoading
    :isLoading="isLoading"
    variant="primary"
  >
    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="(header, value) in tableHeaders"
            :key="header"
          >
            {{ value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.roleType }}</td>
          <!-- TODO: Get the role name by defining relations-->
        </tr>
      </tbody>
    </table>
  </AppLoading>
  <p>This page displays a list of users.</p>
</template>