import { ReactNode, useEffect, useState, useContext, Children, cloneElement } from 'react'
import { StyleSheet, TextInput, View, Keyboard, Platform, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { FAB } from '../../components/FAB'
import InputScrollView from 'react-native-input-scroll-view'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { getTitle, getUUID } from '../../helpers/reminder'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PopUpModalOptions } from '../PopUpModalOptions'
import { OptionsAddReminder } from './OptionsAddReminder'
import { ReminderControlContext } from '../../context/ReminderControlProvider'
import { ThemeColorContext } from '../../context/ThemeColorContext'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { RootStackParamList } from '../../Types/NavigationType'
import { IstateReminder } from '../../Types/TReminder'
import { ContainerFAB } from '../../components/ContainerFAB'

interface IAddReminder extends NativeStackScreenProps<RootStackParamList, 'AddReminder'> {}

export const AddReminder = ({ navigation, route }:IAddReminder) => {
  const [reminder, setReminder] = useState<IstateReminder>({
    fullReminder: '',
    date: new Date(),
    time: new Date(),
    title: ''
  })

  const [focus, setFocus] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isOpenPicker, setOpenPicker] = useState(false)
  const [existCurrentId, setExistCurrentId] = useState<string>()

  const { createReminder, reminders: remindersData } = useContext(ReminderControlContext)
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

  useEffect(() => {
    const { params } = route
    const currentId = params?.currentId

    if (currentId) {
      setExistCurrentId(currentId)
      const { date, ...rest } = remindersData.find(rmd => rmd.id === currentId) as IstateReminder
      setReminder({
        ...rest,
        date: new Date(date)
      })
    }
  }, [route.params?.currentId])

  const handleChange = (value:any, name:string) => {
    setReminder({
      ...reminder,
      title: getTitle(value).trim(),
      [name]: value
    })
  }

  const onChangeDate = (date?:Date) => {
    if (Platform.OS === 'android') setOpenPicker(false)
    setReminder({
      ...reminder,
      date: date || new Date()
    })
  }

  const saveReminder = () => {
    createReminder({
      fullReminder: reminder.fullReminder,
      title: reminder.title,
      date: reminder.date,
      time: new Date(),
      color,
      id: getUUID()
    })

    navigation.navigate('Home')
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

      {
        isOpenPicker && (
          <DateTimePicker
            value={reminder.date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={(_, date) => onChangeDate(date)}
        />
        )
      }

      <OptionsAddReminder
        setOpenPicker={setOpenPicker}
        setOpen={setOpen}
        isOpen={isOpen}
        currentId={existCurrentId}
      />

      <ContainerFAB>
        <FAB
          onPress={() => saveReminder()}
          Icon={
            () => <Icon
            name={existCurrentId ? 'pencil' : 'content-save'}
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
  textInputDescription: {
    height: '100%',
    minHeight: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 20
  }
})
