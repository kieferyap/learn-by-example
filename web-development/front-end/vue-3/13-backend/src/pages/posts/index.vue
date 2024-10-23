<script setup lang="ts">
import AppLoading from '../../components/AppLoading.vue'
import AppPost from '../../components/AppPost.vue'
import Post from './../../../models/post'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const isLoading = ref(false)
const allPosts = ref<Post[]>([])

const getPosts = async function () {
  try {
    isLoading.value = true
    const query = { userId: 1 }
    const response = await Post.where(query).get()
    allPosts.value = 'data' in response ? response.data : response
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch resource: ${error}`)
  }
}

getPosts()

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
    <AppLoading :isLoading="isLoading" variant="primary">
      <AppPost
        v-for="post in allPosts"
        :id="post.id"
        :title="post.title"
        :date="post.date"
      >
        {{ post.body }}
      </AppPost>
    </AppLoading>
  </div>
</template>