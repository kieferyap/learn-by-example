<script setup lang="ts">
import AppPost from '../../components/AppPost.vue';
import data from './../../data'
import { useRouter } from 'vue-router'

const router = useRouter()

// Programmatic routing
const newPost = function () {
  router.push('/posts/new')
}
</script>

<template>
  <div>
    <!-- Title -->
    <h3 class="d-inline-block w-50">
      Post List
    </h3>

    <!-- New post button -->
    <div class="d-inline-block w-50 text-end">
      <button
        class="btn btn-primary mb-2"
        type="button"
        @click="newPost"
      >
        New Post
      </button>
    </div>

    <!-- Post list -->
    <AppPost
      v-for="post in data"
      :id="post.id"
      :title="post.title"
      :date="post.date"
    >
      {{ post.body }}
    </AppPost>
  </div>
</template>