import { createContext, FC, useEffect } from 'react'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import { IReminderData } from '@Types/TReminder'
import { reggisertForPushNotifications } from '@helpers/notiffications'

/* Configuración de las notificaciones */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

interface IPushNotificationContext {
    scheduleNotification: (data:IReminderData) =>Promise<string | undefined>
    cancelPushNotification: (identifier: string) => Promise<void>
    cancelAllPushNotifications: () => Promise<void>
}

const initialState:IPushNotificationContext = {
  scheduleNotification: () => Promise.resolve(undefined),
  cancelPushNotification: () => Promise.resolve(),
  cancelAllPushNotifications: () => Promise.resolve()
}

export const PushNotificationContext = createContext<IPushNotificationContext>(initialState)

export const PushNotificationProvider:FC = ({ children }) => {
  /**
   * Programa una notificación para un tiempo específico,
   * en base a un objeto de tipo IReminderData.
   * @param {IReminderData} data
   * @returns {Promise<string | undefined>} - Identificador de la notificación
   */
  const scheduleNotification = async (data:IReminderData):Promise<string | undefined > => {
    const { date, time, title, fullReminder, color: { colorTheme } } = data

    try {
      return await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: fullReminder,
          color: colorTheme,
          sound: 'default'
        },
        trigger: {
          day: date?.getDate(),
          month: date?.getMonth() as number + 1,
          year: date?.getFullYear(),
          hour: time?.getHours(),
          minute: time?.getMinutes()
        }
      })
    } catch (error) {
      Alert.alert('Error', 'No se pudo agendar la notificación')
    }
  }

  /**
   * Cancela una notificación en base a su identificador.
   * @param {string} identifier - Identificador de la notificación
   */
  const cancelPushNotification = async (identifier:string):Promise<void> => {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier)
    } catch (error) {
      Alert.alert('Error', 'No se pudo cancelar la notificación')
    }
  }

  const cancelAllPushNotifications = async ():Promise<void> => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cancelar las notificaciones')
    }
  }

  /**
   * Cuando el componente es montado llama a la función reggisertForPushNotifications,
   * para verificar si hay permisos para notificaciones.
   */

  useEffect(() => {
    reggisertForPushNotifications()
  }, [])

  return <PushNotificationContext.Provider value={{
    cancelPushNotification,
    scheduleNotification,
    cancelAllPushNotifications
  }}>
        {children}
    </PushNotificationContext.Provider>
}
