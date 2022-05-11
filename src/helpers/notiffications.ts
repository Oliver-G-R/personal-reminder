import { Alert, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Devise from 'expo-device'

/**
  * Verifica si hay permisos para notificaciones, y devuelve un token
  * del dispositivo.
  *
  * @returns {string}
  */
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

export {
  reggisertForPushNotifications
}
