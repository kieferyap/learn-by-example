import { ofetch } from 'ofetch'
import router from '../router'

export const $api = ofetch.create({
  baseURL: 'http://localhost:3001/api',
  async onRequest({ options }) {
    options.headers = {
      ...options.headers,
    }
  },

  // Error response (e.g.: 404, 500, etc.)
  async onResponseError({ response }) {
    if (response.status !== 401) {
      router.push(`/not-found/${response.status}`)
    }
  }
})
