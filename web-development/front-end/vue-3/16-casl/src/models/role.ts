import BaseModel from "../base-model"
import { RoleType } from './../enums/role'

interface Role {
  id: number
  type: RoleType
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