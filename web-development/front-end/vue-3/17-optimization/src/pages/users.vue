<script lang="ts" setup>
import User from '../models/user'
import { ref } from 'vue'
import AppLoading from './../components/AppLoading.vue'
import { definePage } from 'unplugin-vue-router/runtime'
import { Action, Subject } from '../plugins/casl/ability'
import AppUserRows from '../components/AppUserRows.vue'
import { debounce } from 'lodash'


definePage({
  meta: {
    action: Action.Manage,
    subject: Subject.User
  }
})

const isLoading = ref(false)
const allUsers = ref<User[]>([])
const userSearchResults = ref<User[]>([])
const searchString = ref('')

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

const deleteUser = async function (userId: number) {
  try {
    isLoading.value = true
    const response = await User.find(userId)
    const user = 'data' in response ? response.data : response
    await user.delete()
    await getUsers()
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to delete user: ${error}`)
  }
}

const tableHeaders = {
  id: 'ID',
  username: 'Name',
  roleType: 'Role',
  action: 'Action'
}

getUsers()

const debounceTimerMs = 300 // Execute the function after 300ms of no input
const searchUsers = debounce((event) => {
  const username = event.target.value
  userSearchResults.value = allUsers.value.filter(user => user.username.includes(username))
}, debounceTimerMs)

/*
// Without debounce(), this function triggers on every key press
// This leads to unnecessary function calls
const searchUsers = (event) => {
  const username = event.target.value
  userSearchResults.value = allUsers.value.filter(user => user.username.includes(username))
}
*/
</script>

<template>
  <h4>User List</h4>
  <AppLoading
    :isLoading="isLoading"
    variant="primary"
  >
    <!-- Search -->
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search user"
        v-model="searchString"
        @input="searchUsers"
      />
    </div>

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
      <!-- Search results -->
      <tbody v-if="searchString">
        <AppUserRows 
          :userList="userSearchResults"
          @delete="deleteUser($event)"
        />
      </tbody>

      <!-- Display all users -->
      <tbody v-else>
        <AppUserRows 
          :userList="allUsers"
          @delete="deleteUser($event)"
        />
      </tbody>
    </table>
  </AppLoading>
  <p>This page displays a list of users.</p>
</template>