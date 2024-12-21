<script setup lang="ts">
import { useCaslAbility } from '../plugins/casl/useCaslAbility'
import { Action } from '../plugins/casl/ability'
import { useUserStore } from './../stores/useUserStore'

interface Emit {
  (e: "delete", value: number): void
}
interface Props {
  userList: Array<any>
}

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
  userList: undefined
})

const ability = useCaslAbility()
const userStore = useUserStore()
const loggedInUserId = userStore.id
</script>

<template>
  <tr
    v-for="user in props.userList"
    :key="user.id"
  >
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.username }}</td>
    <td>{{ user.roleType.name }}</td>
    <td>
      <button
        v-if="ability.can(Action.Delete, user) && user.id !== loggedInUserId"
        type="button"
        class="btn btn-sm btn-outline-secondary"
        @click="emit('delete', user.id)"
      >
        Delete
      </button>
    </td>
  </tr>
</template>