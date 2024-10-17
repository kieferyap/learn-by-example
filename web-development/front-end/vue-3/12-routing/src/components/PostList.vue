<script setup lang="ts">
import AppPost from './AppPost.vue'

const postList = [1, 2, 3, 4, 5]
</script>

<template>
  <AppPost
    v-for="id in postList"
    :id="id"
  />
</template>