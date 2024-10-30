import { Ref } from "vue"

export interface AlertMessageFunction {
  alertMessage: Ref<string>
  setAlertMessage: (value: string) => void
}

export interface LoggedInFunction {
  isLoggedIn: Ref<boolean>
  setLoggedIn: (value: boolean) => void
}