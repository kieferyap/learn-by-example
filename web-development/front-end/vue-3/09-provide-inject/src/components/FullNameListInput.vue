<script setup lang="ts">
import { inject } from 'vue'
import ListGroupInput from "./ListGroupInput.vue"
import { FirstNameFunction, LastNameFunction, MiddleNameFunction } from '@/types';

const { firstName, updateFirst } = inject('first-name') as FirstNameFunction 
const { middleName, updateMiddle } = inject('middle-name') as MiddleNameFunction
const { lastName, updateLast } = inject('last-name') as LastNameFunction
</script>

<template>
  <!-- First name -->
  <ListGroupInput
    class="bg-danger"
    placeholder="First name"
    :input-model="firstName"
    @changed:value="updateFirst($event)"
  />

  <!-- Middle name -->
  <ListGroupInput
    class="bg-warning"
    placeholder="Middle name"
    :input-model="middleName"
    @changed:value="updateMiddle($event)"
  />

  <!-- Last name -->
  <ListGroupInput
    class="bg-info"
    placeholder="Last name"
    :input-model="lastName"
    @changed:value="updateLast($event)"
  />
</template>