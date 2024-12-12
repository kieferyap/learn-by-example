<script setup lang="ts">
import AppPost from '../../components/AppPost.vue'
import AppLoading from '../../components/AppLoading.vue'
import { useRoute } from 'vue-router'
import { inject, ref } from 'vue'
import Post from './../../models/post'
import AppPostInput from '../../components/AppPostInput.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { AlertMessageFunction } from './../../types'
import { useRouter } from 'vue-router'
import { useUserStore } from './../../stores/useUserStore'

const userStore = useUserStore()

const router = useRouter()
const route = useRoute('/posts/[id]')
const id = ref(Number(route.params.id))
const post = ref<Post | null>(null)
const isLoading = ref(false)
const isEditing = ref(false)
const isUnsavedChangesPresent = ref(false)

const { setAlertMessage } = inject('alert-message') as AlertMessageFunction

// The parameters are: to, from, next
onBeforeRouteLeave((_, _2, next) => {
  next(checkUnsavedChanges())
})

const checkUnsavedChanges = function () {
  if (isUnsavedChangesPresent.value) {
    return window.confirm('You have unsaved changes. Are you sure you want to leave?')
  }
  else {
    return true
  }
}

const editButtonClicked = function () {
  // If we are currently editing, check for unsaved changes before switching back
  if (isEditing.value && checkUnsavedChanges()) {
    isEditing.value = false
  }

  // If not, switch to editing
  else {
    isEditing.value = true
  }
}

const getPost = async function () {
  try {
    isLoading.value = true
    const response = await Post.find(id.value)
    const responseData = 'data' in response ? response.data : response
    if (responseData.userId === userStore.id) {
      post.value = responseData
    }
    else {
      router.push('/not-found/404')
    }
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch resource: ${error}`)
  }
}

const savedPost = function () {
  setAlertMessage('Post saved successfully')
  isUnsavedChangesPresent.value = false
  getPost()
  editButtonClicked()
}

const deletePost = async function () {
  const post = await Post.find(id.value)
  await post.delete()
  setAlertMessage('Post deleted successfully')
  router.push('/posts')
}

getPost()
</script>

<template>
  <AppLoading
    :isLoading="isLoading"
    variant="primary"
  >
    <span v-if="post">
      <AppPost
        v-if="!isEditing"
        :id="post.id"
        :title="post.title"
        :date="post.date"
      >
        {{ post.body }}
      </AppPost>
      <AppPostInput
        v-else
        :id="post.id"
        :title="post.title"
        :body="post.body"
        @change:value="isUnsavedChangesPresent = $event.value"
        @saved="savedPost"
      />
    </span>

    <!-- Post actions -->
    <div class="row">
      <div class="col text-end">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm me-2"
          @click="deletePost"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="editButtonClicked"
        >
          {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>
      </div>
    </div>
  </AppLoading>
</template>