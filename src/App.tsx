import { StatusBar } from 'expo-status-bar'
import { StackNavigation } from './MyStackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeColorProvider } from './context/ThemeColorContext'

export default function App () {
  return (
    <NavigationContainer>
     <ThemeColorProvider>
        <StackNavigation />
        <StatusBar style="auto" />
     </ThemeColorProvider>
    </NavigationContainer>
  )
}
