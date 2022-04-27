import { ReactNode, useEffect, useState, useContext } from 'react'
import { StyleSheet, TextInput, View, Keyboard, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { FAB } from '../components/FAB'
import InputScrollView from 'react-native-input-scroll-view'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { getTitle, getUUID } from '../helpers/reminder'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../MyStackNavigation'
import { PopUpModalOptions } from './PopUpModalOptions'
import { OptionsAddReminder } from '../components/OptionsAddReminder'
import { ReminderControlContext } from '../context/ReminderControlProvider'
import { ThemeColorContext } from '../context/ThemeColorContext'
import DateTimePicker from '@react-native-community/datetimepicker'

interface IAddReminder extends NativeStackScreenProps<RootStackParamList, 'AddReminder'> {}
export interface IstateReminder {
  title: string
  fullReminder: string
  date: Date
  time : Date
}
export const AddReminder = ({ navigation }:IAddReminder) => {
  const [reminder, setReminder] = useState<IstateReminder>({
    fullReminder: '',
    date: new Date(),
    time: new Date(),
    title: ''
  })

  const [focus, setFocus] = useState(false)

  const [isOpen, setOpen] = useState(false)

  const { createReminder } = useContext(ReminderControlContext)
  const { color } = useContext(ThemeColorContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight (props: HeaderButtonProps): ReactNode {
        if (focus) {
          return (
            <Icon
              name="check"
              type="material-community"
              color={props.tintColor}
              size={30}
              tvParallaxProperties={undefined}
              onPress={() => {
                Keyboard.dismiss()
                setFocus(false)
              }}
            />
          )
        } else {
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
        }
      }
    })
  }, [focus])

  useEffect(() => {
    navigation.setOptions({
      title: reminder.title || 'Agregar recordatorio'
    })
  }, [reminder.title])

  const handleChange = (value:any, name:string) => {
    setReminder({
      ...reminder,
      title: getTitle(value).trim(),
      [name]: value
    })
  }

  const saveReminder = () => {
    createReminder({
      fullReminder: reminder.fullReminder.replace(reminder.title, '').trim(),
      titile: reminder.title,
      date: new Date(),
      time: new Date(),
      color,
      id: getUUID()
    })
  }
  return (
    <>
      <View style={{
        padding: 15
      }}>
        <InputScrollView
          showsVerticalScrollIndicator={false}
        >
          <View>
            <TextInput
              style={[style.textInputDescription, {
                color: color.colorTheme === '#F6FAFB' ? '#000000' : '#FFFFFF'
              }]}
              value={reminder.fullReminder}
              placeholderTextColor="#777786"
              onFocus={() => {
                setFocus(true)
                setOpen(false)
              }}
              autoFocus={true}
              onBlur={() => setFocus(false)}
              multiline
              onChangeText={(value) => handleChange(value, 'fullReminder')}
                />

              <View style={{
                height: 100
              }} />
          </View>
        </InputScrollView>
      </View>

      {isOpen && <PopUpModalOptions
        setIsOpen={setOpen}>
        <OptionsAddReminder />
      </PopUpModalOptions>
      }

      <FAB
        onPress={() => saveReminder()}
        Icon={
          () => <Icon
          name="content-save"
          type="material-community"
          color="#fff"
          size={30}
          tvParallaxProperties={undefined} />
        }
      />
    </>
  )
}

const style = StyleSheet.create({
  textInputDescription: {
    height: '100%',
    minHeight: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 20
  }
})
