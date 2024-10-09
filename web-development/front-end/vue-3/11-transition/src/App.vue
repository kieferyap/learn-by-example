<script setup lang="ts">
import AppCard from './components/AppCard.vue';
import BasicTransition from './components/BasicTransition.vue';
import InOutTransition from './components/InOutTransition.vue';
import ItemListAdder from './components/ItemListAdder.vue';

</script>

<template>
  <div>
    <AppCard title="Basic Transition">
      <BasicTransition />
    </AppCard>

    <AppCard title="In-Out Transition">
      <InOutTransition />
    </AppCard>

    <AppCard title="Transition Group">
      <ItemListAdder />
    </AppCard>
  </div>
</template>