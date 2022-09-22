import { FC } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StackNavigation } from './MyStackNavigation'
import { ColorThemeReminderProvider } from '@context/ThemeColorContext'
import { ReminderControlProvider } from '@context/ReminderControlProvider'
import { PreferencesProvider } from '@context/PreferencesProvider'

export default function App () {
  return (
    <AppState>
      <StackNavigation />
      <StatusBar style="auto" />
    </AppState>
  )
}

const AppState:FC = ({ children }) => (
  <PreferencesProvider>
      <ReminderControlProvider>
        <ColorThemeReminderProvider>
          {children}
        </ColorThemeReminderProvider>
      </ReminderControlProvider>
  </PreferencesProvider>
)
