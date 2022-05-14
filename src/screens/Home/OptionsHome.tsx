import { PopUpModalOptions } from '../PopUpModalOptions'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Dispatch, SetStateAction, useContext } from 'react'
import { ReminderControlContext } from '@context/ReminderControlProvider'
import { PushNotificationContext } from '@context/PushNotificationProvider'
import { Icon } from 'react-native-elements'

interface IOptionsHome {
    setOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    setSelectListReminder: Dispatch<SetStateAction<boolean>>
}
export const OptionsHome = ({ setOpen, isOpen, setSelectListReminder }:IOptionsHome) => {
  const { removeAllReminders } = useContext(ReminderControlContext)
  const { cancelAllPushNotifications } = useContext(PushNotificationContext)

  const removeAllRemindersOption = async () => {
    removeAllReminders()
    await cancelAllPushNotifications()
    setOpen(false)
  }

  return isOpen
    ? (
        <PopUpModalOptions setIsOpen={setOpen}>
            <TouchableOpacity onPress={removeAllRemindersOption} >
                <Icon
                    name="delete"
                    type="material-community"
                    style={style.icon}
                    color="#f24d4d"
                    size={30}
                    tvParallaxProperties={undefined} />
                <Text style={style.optionText} >Eliminar todo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setSelectListReminder(select => !select)
              setOpen(false)
            }}>
                <Icon
                    name="checkbox-marked-outline"
                    type="material-community"
                    style={style.icon}
                    color="#212837"
                    size={30}
                    tvParallaxProperties={undefined} />
                <Text style={style.optionText} >Seleccionar</Text>
            </TouchableOpacity>
        </PopUpModalOptions>
      )
    : null
}

const style = StyleSheet.create({
  optionText: {
    fontSize: 16,
    color: '#212837'
  },

  icon: {
    marginRight: 10
  }
})
