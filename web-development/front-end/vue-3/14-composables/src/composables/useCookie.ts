import {
  parse,
  serialize,
  CookieSerializeOptions,
} from 'cookie-es'

const defaultCookieOptions: CookieSerializeOptions = {
  maxAge: 60 * 60 * 24, // 1 day
  secure: true,
  sameSite: "strict"
}

export const setCookie = function (key: string, value: string) {
  document.cookie = serialize(key, value, defaultCookieOptions)
}

export const getCookie = function (key: string): string | undefined {
  const cookies = parse(document.cookie)
  return cookies[key]
}

export const deleteCookie = function (key: string) {
  document.cookie = serialize(key, '', { ...defaultCookieOptions, maxAge: 0 })
}