<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

definePage({
  alias: '/not-found/:error(.*)',
  meta: {
    public: true,
  }
})

const route = useRoute('/not-found/:error(.*)')
const errorNumber = ref(Number(route.params.error))
</script>

<template>
  Error {{ errorNumber }}
</template>