import { StatusBar } from 'expo-status-bar'
import { StackNavigation } from './MyStackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeColorProvider } from '@context/ThemeColorContext'
import { ReminderControlProvider } from '@context/ReminderControlProvider'
import { PushNotificationProvider } from '@context/PushNotificationProvider'

export default function App () {
  return (
    <NavigationContainer>
    <PushNotificationProvider>
      <ReminderControlProvider>
        <ThemeColorProvider>
            <StackNavigation />
            <StatusBar style="auto" />
        </ThemeColorProvider>
      </ReminderControlProvider>
    </PushNotificationProvider>
    </NavigationContainer>
  )
}
