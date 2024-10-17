<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const isUnsavedChangesPresent = ref(true)

// The parameters are: to, from, next
onBeforeRouteLeave((_, _2, next) => {
  // Ask for confirmation if there are unsaved changes.
  if (isUnsavedChangesPresent.value) {
    const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (answer) {
      next()
    }
    else {
      next(false)
    }
  }
  else {
    // Allow navigation because there are no unsaved changes
    next() 
  }
})

</script>

<template>
  <p>
    Suppose that you are writing a post... but in the middle of it, you accidentally click the back button. This page is a demo of that exact feature, so feel free to navigate away from the page.
  </p>
  <p>
    The code for this is located in <code>/front-end/vue-3/12-routing/src/pages/posts/new.vue</code>
  </p>
</template>