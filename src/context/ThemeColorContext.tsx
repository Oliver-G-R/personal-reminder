import { FC, useState, createContext } from 'react'

type Tcolor = '#78d788' | '#cc81e3' | '#81e3d4' | '#e38181' | '#e3a681'
type TtintColor = '#61ad6e' | '#9a63aa' | '#62aba0' | '#a76262' | '#9c7156'

interface IThemeColor {
  color: {
    tintColor: TtintColor,
    colorTheme: Tcolor
  }
}

interface IThemeColorContext {
  setColorTheme: (color: IThemeColor) => void
  color: IThemeColor
  disponibleColors: IThemeColor[]
}

export const ThemeColorContext = createContext<Partial<IThemeColorContext>>({})

export const ThemeColorProvider:FC = ({ children }) => {
  const disponibleColors:IThemeColor[] = [
    {
      color: {
        tintColor: '#61ad6e',
        colorTheme: '#78d788'
      }
    },
    {
      color: {
        tintColor: '#9a63aa',
        colorTheme: '#cc81e3'
      }
    },
    {
      color: {
        tintColor: '#62aba0',
        colorTheme: '#81e3d4'
      }
    },
    {
      color: {
        tintColor: '#a76262',
        colorTheme: '#e38181'
      }
    },
    {
      color: {
        tintColor: '#9c7156',
        colorTheme: '#e3a681'
      }
    }
  ]

  const [color, setColor] = useState<IThemeColor>(disponibleColors[0])

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
