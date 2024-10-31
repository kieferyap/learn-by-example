import {
  parse,
  serialize,
  CookieSerializeOptions,
} from 'cookie-es'

export default function useCookie() {
  const defaultCookieOptions: CookieSerializeOptions = {
    maxAge: 60 * 60 * 24, // 1 day
    secure: true,
    sameSite: "strict"
  }

  const setCookie = function (key: string, value: string) {
    document.cookie = serialize(key, value, defaultCookieOptions)
  }
  
  const getCookie = function (key: string): string | undefined {
    const cookies = parse(document.cookie)
    return cookies[key]
  }
  
  const deleteCookie = function (key: string) {
    document.cookie = serialize(key, '', { ...defaultCookieOptions, maxAge: 0 })
  }

  return {
    setCookie,
    getCookie,
    deleteCookie
  }
}