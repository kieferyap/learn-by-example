import { Ref } from "vue"

export interface AlertMessageFunction {
  alertMessage: Ref<string>
  setAlertMessage: (value: string) => void
}

export interface RouterEntry {
  name: string
  to: string
  isVisible: boolean
}
