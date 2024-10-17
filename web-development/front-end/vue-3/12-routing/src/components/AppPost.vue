<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Component custom properties: Props
interface Props {
  id?: number
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
})

const allPosts = [
  {
    id: 1,
    title: 'Yama ES, 3rd Grade',
    body: 'Handled third grade today in Yama ES. Class A was pretty rowdy, but Class B was well-behaved, so we were able to cover more.',
    date: '2024-10-09'
  },
  {
    id: 2,
    title: 'Mizu JHS, 1st Year',
    body: 'The JTE has always been helpful in Mizu JHS, but she was absent today, so I had to lead the class. It wasn\'t too difficult, but it was definitely more challenging without her around to help.',
    date: '2024-10-10'
  },
  {
    id: 3,
    title: 'Hono ES, 5th Grade',
    body: 'I was supposed to teach in Hono ES today, but classes were cancelled due to the flu season...',
    date: '2024-10-11'
  },
  {
    id: 4,
    title: 'Sports day',
    body: 'It was sports day in Mizu JHS today, so I just helped out with moving stuff around.',
    date: '2024-10-14'
  },
  {
    id: 5,
    title: 'Hono ES, 6th Grade',
    body: 'There was a fire drill today, and we had to neatly and orderly line up outside. Other than that, it was business as usual. The sixth graders were easier to handle as they were more behaved.',
    date: '2024-10-15'
  }
]

const minPostId = 1
const maxPostId = 5

const selectedPost = ref()

const retrievePostDetails = function(id: number) {
  selectedPost.value = allPosts.find(post => post.id === id) ?? {}
}

if (props.id) {
  retrievePostDetails(props.id)
}

const route = useRoute('/posts/')
watch(route, value => {
  retrievePostDetails(Number(value.params.id))
})

</script>
<template>
  <div class="border border-primary rounded p-3 pb-0 mb-3">
    <!-- Post title -->
    <router-link
      v-if="selectedPost.title"
      :to="`/posts/${selectedPost.id}`"
    >
      <h4>
        {{ selectedPost.title }}
      </h4>
    </router-link>

    <!-- Post body -->
    {{ selectedPost.body }}

    <!-- Post Date -->
    <p class="text-secondary mt-2">{{ selectedPost.date }}</p>

    <!-- Previous -->
    <router-link
      :to="`/posts/${selectedPost.id - 1}`"
      v-if="selectedPost.id > minPostId"
    >
      Previous
    </router-link>

    <!-- Next -->
    <router-link
      :to="`/posts/${selectedPost.id + 1}`"
      v-if="selectedPost.zid < maxPostId"
    >
      Next
    </router-link>
  </div>
</template>