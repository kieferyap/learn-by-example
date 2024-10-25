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
    config.body = 'data' in config ? JSON.parse(JSON.stringify(config.data)) : undefined
    return { data: await this.$http(config.url, config) }
  }

  async getEntries(): Promise<this[]> {
    const response = await super.get()
    return 'data' in response ? response.data : response
  }
}
