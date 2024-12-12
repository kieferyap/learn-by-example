<script setup lang="ts">
import { ref } from 'vue'
import Post from '../models/post'
import { useUserStore } from './../stores/useUserStore'

const userStore = useUserStore()

interface Emit {
  (e: "changed", value: boolean): void
  (e: "saved", value: number): void
}
const emit = defineEmits<Emit>()

// Component custom properties: Props
interface Props {
  id?: number
  title?: string
  body?: string
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: '',
  body: '',
})

const title = ref(props.title)
const body = ref(props.body)
const id = ref(props.id)

// Save the post
const savePost = async function () {
  emit('changed', false)

  try {
    const currentDate = new Date().toISOString().split('T')[0]
    // New post
    if (props.id === 0) {
      const post = new Post({
        title: title.value,
        body: body.value,
        date: currentDate,
        userId: userStore.id
      })
      const newPost = await post.save()
      id.value = newPost.id
    }

    // Update post
    else {
      const post = await Post.find(props.id)
      post.title = title.value
      post.body = body.value
      post.date = currentDate
      await post.save()
    }

    emit('saved', id.value)
  } catch (error) {
    console.error(`An error occured: ${error}`)
  }
}

</script>
<template>
  <div class="border border-secondary rounded p-3 pb-0 mb-3">
    <h3 class="mb-3">
      {{ id ? 'Update Post' : 'New Post' }}
    </h3>

    <!-- Post title -->
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        v-model="title"
        @change="$emit('changed', true)"
      >
    </div>

    <!-- Post body -->
    <div class="input-group mb-3">
      <textarea
        class="form-control"
        rows="3"
        placeholder="Body"
        v-model="body"
        @change="$emit('changed', true)"
      />
    </div>

    <!-- Save button -->
    <div class="row">
      <div class="col text-end">
        <button
          class="btn btn-primary mb-4"
          type="button"
          @click="savePost"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>