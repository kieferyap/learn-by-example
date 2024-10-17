<script setup lang="ts">
import AppPost from '../../components/AppPost.vue';
import PostList from '../../components/PostList.vue';
import { useRoute } from 'vue-router'

const route = useRoute('/posts/[id]')
</script>

<template>
  <AppPost />
</template>