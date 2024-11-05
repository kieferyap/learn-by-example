import { useAbility } from '@casl/vue'
import type { ability } from './ability'

export const useCaslAbility = () => useAbility<typeof ability>()
