import { createMongoAbility } from "@casl/ability"
import useCookie from "../../composables/useCookie"
import type { Rule } from './ability'

const { getCookie } = useCookie()
const abilityRules = getCookie('abilityRules') ?? '{}'
const userAbilities: Rule[] = JSON.parse(abilityRules)
const initialAbility = createMongoAbility(userAbilities ?? [])

export default initialAbility
