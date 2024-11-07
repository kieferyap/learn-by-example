<script setup lang="ts">
import { definePage } from 'unplugin-vue-router/runtime'

definePage({
  alias: '/not-found/:error(.*)',
  meta: {
    public: true,
  }
})
</script>

<template>
  Error 404.
</template>