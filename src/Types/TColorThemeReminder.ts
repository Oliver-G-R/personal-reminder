type Tcolor = '#F6FAFB' | '#78d788' | '#cc81e3' | '#81e3d4' | '#e38181' | '#e3a681'
type TtintColor = '#000' | '#61ad6e' | '#9a63aa' | '#62aba0' | '#a76262' | '#9c7156'

interface IThemeColorReminder {
  tintColor: TtintColor,
  colorTheme: Tcolor
}

export {
  Tcolor,
  TtintColor,
  IThemeColorReminder
}
