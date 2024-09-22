<script setup lang="ts">
interface Props {
  listItems: Array<string>
}
const propDefaults = {
  listItems: () => ['', '']
}
const props = withDefaults(defineProps<Props>(), propDefaults)
</script>

<template>

</template>