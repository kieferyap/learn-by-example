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
    console.log(`Calling the following API: ${config.url}`)
    return { data: await this.$http(config.url, config) }
  }
}

