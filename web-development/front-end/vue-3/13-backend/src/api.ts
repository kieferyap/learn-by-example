import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'http://localhost:3001/api',
  async onRequest({ options }) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  },
})
