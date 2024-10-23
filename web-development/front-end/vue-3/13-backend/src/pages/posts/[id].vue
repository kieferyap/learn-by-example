<script setup lang="ts">
import AppPost from '../../components/AppPost.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Post from './../../../models/post'

const route = useRoute('/posts/[id]')
const id = ref(Number(route.params.id))
const post = ref<Post | null>(null)
const isLoading = ref(false)

const getPost = async function () {
  try {
    isLoading.value = true
    const response = await Post.find(id.value)
    post.value = 'data' in response ? response.data : response
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch resource: ${error}`)
  }
}

getPost()
</script>

<template>
  <AppLoading :isLoading="isLoading" variant="primary">
    <AppPost
      v-if="post"
      :id="post.id"
      :title="post.title"
      :date="post.date"
    >
      {{ post.body }}
    </AppPost>
  </AppLoading>
</template>