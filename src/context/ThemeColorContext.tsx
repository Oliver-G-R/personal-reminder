import { FC, useState, createContext, SetStateAction } from 'react'
import { IThemeColor } from '../Types/TColorTheme'
interface IThemeColorContext {
  setColorTheme: (color: IThemeColor) => void
  color: IThemeColor
  disponibleColors: IThemeColor[]
}

const disponibleColors:IThemeColor[] = [
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

const defaultState: IThemeColorContext = {
  setColorTheme: () => {},
  color: disponibleColors[0],
  disponibleColors
}

export const ThemeColorContext = createContext<IThemeColorContext>(defaultState)

export const ThemeColorProvider:FC = ({ children }) => {
  const [color, setColor] = useState(disponibleColors[0])

  const setColorTheme = (color:IThemeColor) =>
    setColor(color)

  return (
    <ThemeColorContext.Provider value={{
      color,
      disponibleColors,
      setColorTheme
    }}>
        {children}
    </ThemeColorContext.Provider>
  )
}
