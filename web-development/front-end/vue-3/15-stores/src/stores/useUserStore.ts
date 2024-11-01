import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RoleType } from './../enums/role'

export const useUserStore = defineStore('user', () => {
  const id = ref(0)
  const username = ref('')
  const role = ref(RoleType.User)

  return {
    id,
    username,
    role
  }
})