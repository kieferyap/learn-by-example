<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime'
import User from '../../models/user'

definePage({
  // Page-specific navigation guard
  beforeEnter (to, from, next) {
    console.log('users.vue beforeEnter called:', to, from)
    next() // allows access to this page
    // next(false) // blocks access to this page
    // next('/post') // redirects to another page
  }
});

const getUsers = async function () {
  try {
    const response = await User.get()
    console.log('response', response)
  } catch (error) {
    console.error(`Failed to fetch users: ${error}`)
  }
}

getUsers()

</script>

<template>
  <h4>User List</h4>
  <p>This page displays a list of users.</p>
</template>