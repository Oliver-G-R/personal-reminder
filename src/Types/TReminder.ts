import { IThemeColor } from './TColorTheme'

interface IReminderData {
    title: string
    fullReminder: string
    date: Date
    time: Date
    color: IThemeColor
    id:string
}

interface IstateReminder {
  title: string
  fullReminder: string
  date: Date
  time : Date
}

export {
  IReminderData,
  IstateReminder
}
