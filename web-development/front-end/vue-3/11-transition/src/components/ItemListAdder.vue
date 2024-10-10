<script setup lang="ts">
import { Ref, ref } from 'vue';

const newItem = ref('')
const items: Ref<Array<string>> = ref([])

const addItem = function () {
  items.value.push(newItem.value)
  newItem.value = ''
}

const removeItem = function(item: string) {
  const index = items.value.indexOf(item)
  if (index !== -1) {
    items.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <!-- Input group -->
    <div class="input-group">
      <!-- Input -->
      <input
        type="text"
        class="form-control"
        placeholder="Enter item"
        v-model="newItem"
        @keydown.enter="addItem"
      />

      <!-- Button-->
      <div class="input-group-append">
        <button
          class="btn btn-success"
          type="button"
          @click="addItem"
        >Add Item</button>
      </div>
    </div>

    <TransitionGroup
      tag="ul"
      class="list-group mt-2"
      name="list"
    >
      <li
        class="list-group-item"
        v-for="item in items"
        :key="item"
      >
        {{ item }}
        <span 
          class="position-absolute end-0 me-2 text-secondary cursor-pointer"
          @click="removeItem(item)"  
        >
          ✖
        </span>
      </li>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

</style>