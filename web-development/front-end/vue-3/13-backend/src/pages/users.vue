<script lang="ts" setup>
import User from '../../models/user'
import { ref } from 'vue'
import AppLoading from './../components/AppLoading.vue'

const isLoading = ref(false)
const allUsers = ref<User[]>()

const getUsers = async function () {
  try {
    isLoading.value = true
    const response = await User.include('roleType').get()
    allUsers.value = 'data' in response ? response.data : response
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
            v-for="(header, key) in tableHeaders"
            :key="key"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.roleType.name }}</td>
        </tr>
      </tbody>
    </table>
  </AppLoading>
  <p>This page displays a list of users.</p>
</template>