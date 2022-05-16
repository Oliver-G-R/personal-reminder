import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@screens/Home'
import { AddReminder } from '@screens/AddReminder'
import { useContext } from 'react'
import { ColorThemeReminderContext } from '@context/ThemeColorContext'
import { RootStackParamList } from '@Types/NavigationType'
import { Preferences } from '@screens/Preferences'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackNavigation = () => {
  const { color } = useContext(ColorThemeReminderContext)

  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerTintColor: '#000',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',

            headerStyle: {
              backgroundColor: '#F6F6F8'
            },
            contentStyle: {
              backgroundColor: '#F6F6F8',
              paddingHorizontal: 15,
              paddingTop: 10
            }
          }}
          initialRouteName='Home'>
          <Stack.Screen
              options={{
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
          <Stack.Screen
            options={{
              headerShown: false,
              contentStyle: {
                padding: 0,
                backgroundColor: '#F6F6F8',
                paddingTop: 10
              }
            }}
            name="Preferences"
            component={Preferences}

          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
