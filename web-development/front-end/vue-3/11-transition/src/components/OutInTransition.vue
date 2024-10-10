<script setup lang="ts">
import { TabData } from '@/types'
import { ref } from 'vue';

const tabData: Array<TabData> = [
  {
    id: 'medicine',
    name: 'Medicine'
  },
  {
    id: 'berries',
    name: 'Berries'
  },
  {
    id: 'key-items',
    name: 'Key Items'
  }
]

const selectedTab = ref('medicine')
const setSelectedTab = function (tabId: string) {
  selectedTab.value = tabId
}
</script>

<template>
  <span>
    <!-- Tabs -->
    <div class="row">
      <div
        class="col"
        v-for="tab in tabData"
      >
        <div
          :class="[
            'w-100 border border-bottom-0 rounded-top text-center p-1 cursor-pointer',
            tab.id === selectedTab ? 'border-primary bg-primary text-white' : 'border-light text-secondary'
          ]"
          @click="setSelectedTab(tab.id)"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>

    <!-- Tab content: Dynamic Slots! -->
    <div class="border-primary border p-2 rounded-bottom">
      <transition name="slide" mode="out-in">
        <span v-if="selectedTab === 'medicine'">
          <ul class="list-group">
            <li class="list-group-item">Super Potion x5</li>
            <li class="list-group-item">Hyper Potion x10</li>
            <li class="list-group-item">Revive x3</li>
          </ul>
        </span>
        <span v-else-if="selectedTab === 'berries'">
          <ul class="list-group">
            <li class="list-group-item">Oran Berry x52</li>
            <li class="list-group-item">Hondew Berry x7</li>
          </ul>
        </span>
        <span v-else>
          <ul class="list-group">
            <li class="list-group-item">Bicycle</li>
            <li class="list-group-item">Old Rod</li>
            <li class="list-group-item">Eon Ticket</li>
            <li class="list-group-item">Azure Flute</li>
          </ul>
        </span>
      </transition>
    </div>
  </span>
</template>


<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

</style>