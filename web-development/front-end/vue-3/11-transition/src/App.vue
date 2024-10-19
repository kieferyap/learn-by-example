<script setup lang="ts">
import AppCard from './components/AppCard.vue';
import BasicTransition from './components/BasicTransition.vue';
import OutInTransition from './components/OutInTransition.vue';
import ItemListAdder from './components/ItemListAdder.vue';

</script>

<template>
  <div>
    <AppCard title="Basic Transition">
      <BasicTransition />
    </AppCard>

    <AppCard title="Out-In Transition">
      <OutInTransition />
    </AppCard>

    <AppCard title="Transition Group">
      <ItemListAdder />
    </AppCard>
  </div>
</template>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>