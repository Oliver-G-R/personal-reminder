import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './screens/Home'
import { AddReminder } from './screens/AddReminder'
import { useContext } from 'react'
import { ThemeColorContext } from './context/ThemeColorContext'
import { RootStackParamList } from './Types/NavigationType'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackNavigation = () => {
  const { color } = useContext(ThemeColorContext)

  return (
    <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'left',

          headerStyle: {
            backgroundColor: '#F6FAFB'
          },
          contentStyle: {
            backgroundColor: '#F6FAFB',
            paddingHorizontal: 15,
            paddingTop: 10
          }
        }}
        initialRouteName='Home'>
        <Stack.Screen
            options={{
              headerSearchBarOptions: {
                placeholder: 'Buscar'
              },
              title: ''
            }}
            name="Home"
            component={Home} />

        <Stack.Screen
            options={{
              title: 'Agregar recordatorio',
              headerTintColor: color.tintColor,
              headerStyle: {
                backgroundColor: color.colorTheme
              },
              contentStyle: {
                backgroundColor: color.colorTheme
              }
            }}
            name="AddReminder"
            component={AddReminder} />
    </Stack.Navigator>
  )
}
