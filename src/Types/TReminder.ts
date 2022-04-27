import { IThemeColor } from './TColorTheme'

interface IReminderData {
    titile: string
    fullReminder: string
    date: Date
    time: Date
    color: IThemeColor
    id:string
}

export {
  IReminderData
}
