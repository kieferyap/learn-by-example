export const SettingType = {
  PushNotification: 1,
} as const

export type SettingType = typeof SettingType[keyof typeof SettingType]
