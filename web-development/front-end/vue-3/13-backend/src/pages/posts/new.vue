<script setup lang="ts">
import { inject } from 'vue';
import AppPostInput from '../../components/AppPostInput.vue';
import { useRouter } from 'vue-router'
import { AlertMessageFunction } from '../../types';

const { setAlertMessage } = inject('alert-message') as AlertMessageFunction

const router = useRouter()
const redirectToPost = function (id: number) {
  setAlertMessage('Posted successfully')
  router.push(`/posts/${id}`)
}
</script>

<template>
  <AppPostInput @saved="redirectToPost" />
</template>