import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export type RootStackParamList = {
    Home: undefined;
    AddReminder: {
      currentId: string;
    } | undefined;
};
