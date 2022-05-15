import { FC, useState, createContext, SetStateAction } from 'react'
import { IThemeColorReminder } from '@Types/TColorThemeReminder'
interface IColorThemeReminderContext {
  setColorThemeReminder: (color: IThemeColorReminder) => void
  color: IThemeColorReminder
  disponibleColors: IThemeColorReminder[]
}

const disponibleColors:IThemeColorReminder[] = [
  {
    tintColor: '#000',
    colorTheme: '#F6FAFB'
  },
  {
    tintColor: '#61ad6e',
    colorTheme: '#78d788'
  },
  {
    tintColor: '#9a63aa',
    colorTheme: '#cc81e3'
  },
  {
    tintColor: '#62aba0',
    colorTheme: '#81e3d4'
  },
  {
    tintColor: '#a76262',
    colorTheme: '#e38181'
  },
  {
    tintColor: '#9c7156',
    colorTheme: '#e3a681'
  }
]

const defaultState: IColorThemeReminderContext = {
  setColorThemeReminder: () => {},
  color: disponibleColors[0],
  disponibleColors
}

export const ColorThemeReminderContext = createContext<IColorThemeReminderContext>(defaultState)

export const ColorThemeReminderProvider:FC = ({ children }) => {
  const [color, setColor] = useState(disponibleColors[0])

  const setColorThemeReminder = (color:IThemeColorReminder) =>
    setColor(color)

  return (
    <ColorThemeReminderContext.Provider value={{
      color,
      disponibleColors,
      setColorThemeReminder
    }}>
        {children}
    </ColorThemeReminderContext.Provider>
  )
}
