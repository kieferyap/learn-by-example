<script setup lang="ts">
import AppCard from './components/AppCard.vue'
import RouterButton from './components/RouterButton.vue'

const buttonProperties = {
  type: 'button',
  class: 'btn btn-outline-primary'
}
</script>

<template>
  <AppCard title="Routing Practice">
    <div class="row">
      <div class="col-3">
        <div class="btn-group-vertical w-100">
          <RouterButton
            to="/posts"
            :button="buttonProperties"
            name="Posts"
          />
          <RouterButton
            to="/users"
            :button="buttonProperties"
            name="Users"
          />
        </div>
      </div>
      <div class="col-9">
        <RouterView />
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <RouterView name="footer" />
      </div>
    </div>
  </AppCard>
</template>

<style scoped></style>
