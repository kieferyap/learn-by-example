<script setup lang="ts">
import { ref } from 'vue'
import Post from '../../models/post'
import { onBeforeRouteLeave } from 'vue-router'
import { useRouter } from 'vue-router'

const isUnsavedChangesPresent = ref(false)
const router = useRouter()

// The parameters are: to, from, next
onBeforeRouteLeave((_, _2, next) => {
  // Ask for confirmation if there are unsaved changes.
  if (isUnsavedChangesPresent.value) {
    const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (answer) {
      next()
    }
    else {
      next(false)
    }
  }
  else {
    // Allow navigation because there are no unsaved changes
    next()
  }
})

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
  try {
    // New post
    if (props.id === 0) {
      const post = new Post({
        title: title.value,
        body: body.value,
        date: new Date().toISOString().split('T')[0],
        userId: 1
      })
      const newPost = await post.save()
      id.value = newPost.id
    }

    // Update post
    else {
      const response = await Post.find(props.id)
      const post = 'data' in response ? response.data : response
      post.title = title.value
      post.body = body.value
      await post.save()
    }

    // Redirect to new post
    router.push(`/post/${id.value}`)
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
        @change="isUnsavedChangesPresent = true"
      >
    </div>

    <!-- Post body -->
    <div class="input-group mb-3">
      <textarea
        class="form-control"
        rows="3"
        placeholder="Body"
        v-model="body"
        @change="isUnsavedChangesPresent = true"
      />
    </div>

    <!-- Save button -->
    <button
      class="btn btn-primary mb-4"
      type="button"
      @click="savePost"
    >
      Save
    </button>
  </div>
</template>