import { IThemeColorReminder } from '@Types/TColorThemeReminder'

interface IReminderData {
    title: string
    fullReminder: string
    date: Date | null
    time: Date | null
    color: IThemeColorReminder
    id:string
    identifierNotification:string | undefined
}

interface IstateReminder {
  title: string
  fullReminder: string
  date: Date | null
  time : Date | null
}

export {
  IReminderData,
  IstateReminder
}
