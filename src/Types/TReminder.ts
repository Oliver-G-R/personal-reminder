import { IThemeColor } from './TColorTheme'

interface IReminderData {
    title: string
    fullReminder: string
    date: Date | null
    time: Date | null
    color: IThemeColor
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
