<script setup lang="ts">
import AppPost from '../../components/AppPost.vue'
import { useRoute } from 'vue-router'
import { Ref, ref, watch } from 'vue';
import data from './data'
import { Post } from './../../types'

const route = useRoute('/posts/[id]')
const post: Ref<Post|null> = ref(null)

const getPost = function (id: number): Post | null {
  return data.find(post => post.id === id) ?? null
}

post.value = getPost(Number(route.params.id))

watch(route, value => {
  post.value = getPost(Number(value.params.id))
})
</script>

<template>
  <AppPost
    :id="post.id"
    :title="post.title"
    :date="post.date"
  >
    {{ post.body }}
  </AppPost>

  <!-- Navigation buttons -->
  <div class="row mb-2">
    <!-- Previous -->
    <div class="col text-start">
      <router-link
        :to="`/posts/${post.id - 1}`"
        v-if="post.id > 1"
      >
        ⬅ Previous
      </router-link>
    </div>

    <!-- Next -->
    <div class="col text-end">
      <router-link
        :to="`/posts/${post.id + 1}`"
        v-if="post.id < data.length"
      >
        Next ➡
      </router-link>
    </div>
  </div>

</template>