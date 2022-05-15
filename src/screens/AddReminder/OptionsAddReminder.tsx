import { FC, useContext, SetStateAction, Dispatch } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native'
import { Icon } from 'react-native-elements'
import { ColorThemeReminderContext } from '@context/ThemeColorContext'
import { ReminderControlContext } from '@context/ReminderControlProvider'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@Types/NavigationType'
import { PopUpModalOptions } from '../../components/PopUpModalOptions'
import { PushNotificationContext } from '@context/PushNotificationProvider'
import { IReminderData } from '@Types/TReminder'
interface IOptionsAddReminder {
  setOpenPicker: Dispatch<SetStateAction<boolean>>
  currentId?: string
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setModePicker: Dispatch<SetStateAction<'date' | 'time'>>
}

export const OptionsAddReminder:FC<IOptionsAddReminder> = ({ setOpenPicker, currentId, setOpen, isOpen, setModePicker }) => {
  const { removeReminder, reminders } = useContext(ReminderControlContext)
  const { cancelPushNotification } = useContext(PushNotificationContext)
  const { disponibleColors, setColorThemeReminder, color } = useContext(ColorThemeReminderContext)
  const navigation = useNavigation<NavigationProps>()

  const onPressRemoveReminder = async () => {
    navigation.goBack()
    const identifier = reminders.find(item => item.id === currentId)?.identifierNotification
    identifier && await cancelPushNotification(identifier)
    removeReminder(currentId as string)
  }

  const shareReminder = async () => {
    const finReminder = reminders.find(item => item.id === currentId) as IReminderData

    const convertDateString = new Date(finReminder.date as Date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    const convertTimeString = new Date(finReminder.time as Date).toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    const template = `
    ${finReminder.fullReminder}

    🕐 ${convertDateString}
    📅 ${convertTimeString}
    `

    try {
      await Share.share({
        message: template
      })
    } catch (e) {
      console.log(e)
    }
  }

  return isOpen
    ? (
       <PopUpModalOptions setIsOpen={setOpen}>
         {currentId && <TouchableOpacity
            onPress={shareReminder}
          >
              <Icon
                name="share"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Compartir
              </Text>
          </TouchableOpacity>}
          {currentId && <TouchableOpacity
          onPress={() => onPressRemoveReminder()}
          >
              <Icon
                name="delete"
                type="material-community"
                style={style.icon}
                color="#f24d4d"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={[style.optionText, { color: '#f24d4d' }]}>
                Eliminar
              </Text>
          </TouchableOpacity>}
          <TouchableOpacity

          >
              <Icon
                name="palette"
                type="material-community"
                color="#212837"
                style={style.icon}
                size={30}
                tvParallaxProperties={undefined} />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={disponibleColors}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[style.round, { backgroundColor: item.colorTheme }, item.colorTheme === '#F6FAFB' && style.borderRadius]}
                            onPress={() => setColorThemeReminder(item)}>

                            { item.colorTheme === color.colorTheme && <View style={style.selected}></View>}
                        </TouchableOpacity>
                    )}
                />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModePicker('date')
              setOpenPicker(true)
            }}
          >
              <Icon
                name="calendar-range"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Fecha
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModePicker('time')
              setOpenPicker(true)
            }}
          >
              <Icon
                name="alarm-multiple"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Hora
              </Text>
          </TouchableOpacity>
       </PopUpModalOptions>
      )
    : null
}

const style = StyleSheet.create({
  icon: {
    marginRight: 10
  },
  round: {
    height: 32,
    width: 32,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    backgroundColor: '#FFFFFF'
  },
  optionText: {
    fontSize: 16,
    color: '#212837'
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 55,
    backgroundColor: '#fff'
  },

  borderRadius: {
    borderWidth: 2,
    borderColor: '#212837'
  }

})
