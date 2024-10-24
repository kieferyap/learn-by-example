<script setup lang="ts">
import AppPostInput from '../../components/AppPostInput.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const redirectToPost = function (id: number) {
  router.push(`/posts/${id}`)
}
</script>

<template>
  <AppPostInput @saved="redirectToPost" />
</template>