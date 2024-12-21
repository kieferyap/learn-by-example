import BaseModel from "../base-model"

interface Setting {
  id: number
  title: string
  body: string
  date: string
  userId: number
}
class Setting extends BaseModel {
  resource() {
    return 'settings'
  }
}

export default Setting
