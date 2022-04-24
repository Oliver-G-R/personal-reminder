import { StatusBar } from 'expo-status-bar'
import { StackNavigation } from './MyStackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeColorProvider } from './context/ThemeColorContext'
import { ReminderControlProvider } from './context/ReminderControlProvider'

export default function App () {
  return (
    <NavigationContainer>
     <ReminderControlProvider>
       <ThemeColorProvider>
          <StackNavigation />
          <StatusBar style="auto" />
       </ThemeColorProvider>
     </ReminderControlProvider>
    </NavigationContainer>
  )
}
