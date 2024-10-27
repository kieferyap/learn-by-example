<script setup lang="ts">
import AppPost from '../../components/AppPost.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { Ref, ref, watch } from 'vue'
import data from './../../data'
import { Post } from './../../types'

const route = useRoute('/posts/[id]')
const post: Ref<Post | null> = ref(null)
const id = ref(Number(route.params.id))

const getPost = function (id: number): Post | null {
  return data.find(post => post.id === id) ?? null
}

post.value = getPost(id.value)

watch(route, value => {
  console.log('The route just updated')
  id.value = Number(value.params.id)
  post.value = getPost(id.value)
})

onBeforeRouteUpdate(updateGuard => {
  console.log('The route is about to update:', updateGuard)
  console.log('The new ID is:', updateGuard.params.id)
  /*
  // Update the post
  id.value = Number(value.params.id)
  post.value = getPost(id.value)
   */
})
</script>

<template>
  <AppPost
    :id="post?.id"
    :title="post?.title"
    :date="post?.date"
  >
    {{ post?.body }}
  </AppPost>

  <!-- Navigation buttons -->
  <div class="row mb-2">
    <!-- Previous -->
    <div class="col text-start">
      <router-link
        :to="`/posts/${id - 1}`"
        v-if="id > 1"
      >
        ⬅ Previous
      </router-link>
    </div>

    <!-- Next -->
    <div class="col text-end">
      <router-link
        :to="`/posts/${id + 1}`"
        v-if="id < data.length"
      >
        Next ➡
      </router-link>
    </div>
  </div>

</template>