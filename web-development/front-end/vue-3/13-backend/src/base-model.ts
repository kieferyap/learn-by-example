import { Model } from 'vue-api-query'
import { $api } from './api'

export default class BaseModel extends Model {
  get $http(): any {
    return $api
  }

  baseURL(): string {
    return 'http://localhost:3001/api'
  }

  async request(config: any) {
    return { data: await this.$http(config.url, config) }
  }
}

