import { IThemeColor } from './TColorTheme'

interface IReminderData {
    title: string
    fullReminder: string
    date: Date | null
    time: Date | null
    color: IThemeColor
    id:string
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
