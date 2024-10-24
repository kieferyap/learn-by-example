import { Ref } from "vue"

export interface NameValue {
  name: string
  characterCount: number
}

export interface FirstNameFunction {
  firstName: Ref<string>
  updateFirst: (value: string) => void
}

export interface MiddleNameFunction {
  middleName: Ref<string>
  updateMiddle: (value: string) => void
}

export interface LastNameFunction {
  lastName: Ref<string>
  updateLast: (value: string) => void
}