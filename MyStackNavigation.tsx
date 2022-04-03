import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingTop: 15,
            },
        }}
        initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
)