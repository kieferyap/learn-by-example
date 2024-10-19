<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

definePage({
  // Page-specific navigation guard
  beforeEnter (to, from, next) {
    console.log('users.vue beforeEnter called:', to, from)
    next() // allows access to this page
    // next(false) // blocks access to this page
    // next('/post') // redirects to another page
  }
});

</script>

<template>
  <h4>User List</h4>
  <p>This page displays a list of users.</p>
</template>