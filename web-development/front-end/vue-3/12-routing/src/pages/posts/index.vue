<script setup lang="ts">
import PostList from '../../components/PostList.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

// Programmatic routing
const newPost = function () {
  router.push('/posts/new')
}
</script>

<template>
  <div>
    <h3 class="d-inline-block w-50">
      Post List
    </h3>
    <div class="d-inline-block w-50 text-end">
      <button
        class="btn btn-primary mb-2"
        type="button"
        @click="newPost"
      >
        New Post
      </button>
    </div>
    <PostList />
  </div>
</template>