<script setup lang="ts">
import PostList from '../../components/PostList.vue';
import { useRoute } from 'vue-router'

const route = useRoute('/posts/[id]')
</script>

<template>
  <PostList :id="Number(route.params.id)"/>
</template>