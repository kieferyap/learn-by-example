<script setup lang="ts">
import { ref } from 'vue';
import ListGroupInput from './ListGroupInput.vue';

const first = ref('Nicholas')
const middle = ref('Piberius')
const last = ref('Wilde')
</script>

<template>
  <ul class="list-group">
    <ListGroupInput
      :input-model="first"
      placeholder="First Name"
      @changed:value="first = $event"
    />

    <ListGroupInput
      :input-model="middle"
      placeholder="Middle Name"
      @changed:value="middle = $event"
    />

    <ListGroupInput
      :input-model="last"
      placeholder="Last Name"
      @changed:value="last = $event"
    />

    <!-- Display the full name (Last, First? First Middle Last? etc.) -->
    <li class="list-group-item">
      <slot
        :first="first"
        :middle="middle"
        :last="last"
      >
        {{ first }} {{ middle }} {{ last }}
      </slot>
    </li>
  </ul>
</template>