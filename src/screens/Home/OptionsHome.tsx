import { PopUpModalOptions } from '../../components/PopUpModalOptions'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Dispatch, SetStateAction, useContext } from 'react'
import { ReminderControlContext } from '@context/ReminderControlProvider'

import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@Types/NavigationType'

interface IOptionsHome {
    setOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    setSelectListReminder: Dispatch<SetStateAction<boolean>>
}
export const OptionsHome = ({ setOpen, isOpen, setSelectListReminder }:IOptionsHome) => {
  const { removeAllReminders, reminders } = useContext(ReminderControlContext)

  const { navigate } = useNavigation<NavigationProps>()

  const removeAllRemindersOption = async () => {
    removeAllReminders()

    setOpen(false)
  }

  return isOpen
    ? (
        <PopUpModalOptions setIsOpen={setOpen}>
            {reminders.length > 0 && <TouchableOpacity onPress={removeAllRemindersOption} >
                <Icon
                    name="delete"
                    type="material-community"
                    style={style.icon}
                    color="#f24d4d"
                    size={30}
                    tvParallaxProperties={undefined} />
                <Text style={style.optionText} >Eliminar todo</Text>
            </TouchableOpacity>}
            {reminders.length > 0 && <TouchableOpacity onPress={() => {
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
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={() => {
                setOpen(false)
                navigate('Preferences')
              }}
            >
              <Icon
                name="account-cog"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>Preferencias</Text>
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
