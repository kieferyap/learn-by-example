import { Ref } from "vue"

export interface NameValue {
  name: string
  characterCount: number
}

export interface FirstNameFunction {
  firstName: Ref<string>
  updateFirst: (vaalue: string) => void
}

export interface MiddleNameFunction {
  middleName: Ref<string>
  updateMiddle: (vaalue: string) => void
}

export interface LastNameFunction {
  lastName: Ref<string>
  updateLast: (vaalue: string) => void
}