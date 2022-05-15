import { StatusBar } from 'expo-status-bar'
import { StackNavigation } from './MyStackNavigation'
import { ColorThemeReminderProvider } from '@context/ThemeColorContext'
import { ReminderControlProvider } from '@context/ReminderControlProvider'
import { PushNotificationProvider } from '@context/PushNotificationProvider'
import { FC } from 'react'

export default function App () {
  return (
    <AppState>
      <StackNavigation />
      <StatusBar style="auto" />
    </AppState>
  )
}

const AppState:FC = ({ children }) => (
    <PushNotificationProvider>
      <ReminderControlProvider>
        <ColorThemeReminderProvider>
          {children}
        </ColorThemeReminderProvider>
      </ReminderControlProvider>
    </PushNotificationProvider>
)
