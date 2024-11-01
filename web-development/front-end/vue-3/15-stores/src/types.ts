import { Ref } from "vue"

export interface AlertMessageFunction {
  alertMessage: Ref<string>
  setAlertMessage: (value: string) => void
}
