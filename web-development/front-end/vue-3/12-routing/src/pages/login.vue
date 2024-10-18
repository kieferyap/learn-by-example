<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'

definePage({
  meta: {
    layout: 'blank',
    unauthenticated: true,
  }
})
</script>

<template>
  <h4>Login</h4>
  <p>This is the login page. Normally, there should be two input boxes: one for the username/email, and one for password. However, as this is a small test project illustrating routing with Vue, the login flag can be toggled in line 30 of the following file: <code>web-development/front-end/vue-3/12-routing/src/router.ts</code></p>
</template>