<script lang="ts" setup>
import User from '../models/user'
import { ref } from 'vue'
import AppLoading from './../components/AppLoading.vue'
import { definePage } from 'unplugin-vue-router/runtime'
import { Action, Subject } from '../plugins/casl/ability'
import { useUserStore } from './../stores/useUserStore'
import { useCaslAbility } from '../plugins/casl/useCaslAbility'

definePage({
  meta: {
    action: Action.Manage,
    subject: Subject.User
  }
})

const isLoading = ref(false)
const allUsers = ref<User[]>()

const ability = useCaslAbility()
const userStore = useUserStore()
const loggedInUserId = userStore.id

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
        <tr
          v-for="user in allUsers"
          :key="user.id"
        >
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.roleType.name }}</td>
          <td>
            <button
              v-if="ability.can(Action.Delete, user) && user.id !== loggedInUserId"
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </AppLoading>
  <p>This page displays a list of users.</p>
</template>