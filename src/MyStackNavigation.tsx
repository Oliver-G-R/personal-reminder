import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './screens/Home'
import { AddReminder } from './screens/AddReminder'
import { Icon } from 'react-native-elements'

export type RootStackParamList = {
    Home: undefined;
    AddReminder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackNavigation = () => (
    <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: '#FF7461',
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
              }

            }}
            name="Home"
            component={Home} />

        <Stack.Screen
            options={{
              title: 'Agregar recordatorio'
            }}

            name="AddReminder"
            component={AddReminder} />
    </Stack.Navigator>
)
