import { PopUpModalOptions } from '../PopUpModalOptions'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { ReminderControlContext } from '../../context/ReminderControlProvider'
import { PushNotificationContext } from '../../context/PushNotificationProvider'
import { Icon } from 'react-native-elements'

interface IOptionsHome {
    setOpen: (value: boolean) => void;
    isOpen: boolean;
}
export const OptionsHome = ({ setOpen, isOpen }:IOptionsHome) => {
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
