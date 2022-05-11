import { useEffect, ReactNode, useState, useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, TextInputFocusEventData, Alert, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import * as Notifications from 'expo-notifications'
import * as Devise from 'expo-device'
import moment from 'moment'
import { FAB } from '../../components/FAB'
import { GridCard } from '../../components/GridCard'
import { RootStackParamList } from '../../Types/NavigationType'
import { ContainerFAB } from '../../components/ContainerFAB'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { PopUpModalOptions } from '../PopUpModalOptions'
import { ReminderControlContext } from '../../context/ReminderControlProvider'
interface IHome extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export const Home = ({ navigation }:IHome) => {
  const [isOpen, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { removeAllReminders } = useContext(ReminderControlContext)

  const onScrollEvent = (e:NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = e.nativeEvent.contentOffset.y
    if (yOffset > 0) {
      navigation.setOptions({
        headerTitle: 'Recordatorios',
        headerStyle: {
          backgroundColor: '#e8eeef'
        }
      })
    } else {
      navigation.setOptions({
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#F6FAFB'
        }
      })
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft (props: HeaderButtonProps): ReactNode {
        return (
        <Icon
          name="dots-horizontal"
          type="material-community"
          color={props.tintColor}
          size={30}
          tvParallaxProperties={undefined}
          onPress={() => setOpen(true)}
        />
        )
      },
      headerSearchBarOptions: {
        placeholder: 'Buscar',
        onChangeText: (e:NativeSyntheticEvent<TextInputFocusEventData>) =>
          setSearch(e.nativeEvent.text)
      }
    }
    )
  }, [])

  const removeAllRemindersOption = () => {
    removeAllReminders()
    setOpen(false)
  }

  const reggisertForPushNotifications = async () => {
    let token
    if (Devise.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        Alert.alert('No se pudo registrar la notificación')
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    return token
  }

  useEffect(() => {
    reggisertForPushNotifications().then(token => {
    })
  }, [])

  return (
    <>
      <ScrollView
        keyboardDismissMode='on-drag'
        onScroll={e => onScrollEvent(e)}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        >
          <View style={style.contentMessageWelcome}>
            <Text style={style.title}>
              Todos tus recordatorios en un solo lugar.
            </Text>
          </View>
          <GridCard search={search}/>
      </ScrollView>

      {isOpen && <PopUpModalOptions
        setIsOpen={setOpen}>
          <TouchableOpacity onPress={removeAllRemindersOption} >
            <Text style={style.optionText} >Eliminar todo</Text>
          </TouchableOpacity>
      </PopUpModalOptions>
      }
      <ContainerFAB>
        <FAB
          onPress={() => navigation.navigate('AddReminder') }
          Icon={
            () => <Icon
            name="plus"
            type="material-community"
            color="#fff"
            size={30}
            tvParallaxProperties={undefined} />
          }
        />
      </ContainerFAB>
    </>
  )
}

const style = StyleSheet.create({
  contentMessageWelcome: {
    width: '90%',
    marginBottom: 20
  },
  optionText: {
    fontSize: 16,
    color: '#212837'
  },
  title: {
    fontSize: 35,
    color: '#212837',
    fontWeight: 'bold'
  },

  description: {
    fontSize: 20,
    color: '#212837',
    marginTop: 10
  }

})
