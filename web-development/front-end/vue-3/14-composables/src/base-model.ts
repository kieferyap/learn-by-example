import { Model } from 'vue-api-query'
import { $api } from './composables/useApi'

export default class BaseModel extends Model {
  get $http(): any {
    return $api
  }

  baseURL(): string {
    return 'http://localhost:3001/api'
  }

  async request(config: any) {
    console.log('[base-model.ts] Calling the following URL:', config.url)
    config.body = 'data' in config ? JSON.parse(JSON.stringify(config.data)) : undefined
    return { data: await this.$http(config.url, config) }
  }
}
