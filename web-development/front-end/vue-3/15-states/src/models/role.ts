import BaseModel from "../base-model"

interface Role {
  id: number
  type: string
  name: string
  action: string
  subject: string
  field: string
  permission: string
}

class Role extends BaseModel {
  resource() {
    return 'roles'
  }
}

export default Role