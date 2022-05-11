import { ReactNode, useEffect, useState, useContext } from 'react'
import { StyleSheet, TextInput, View, Keyboard, Platform, Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import { Icon } from 'react-native-elements'
import { FAB } from '../../components/FAB'
import InputScrollView from 'react-native-input-scroll-view'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { getTitle, getUUID, validateDate } from '../../helpers/reminder'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OptionsAddReminder } from './OptionsAddReminder'
import { ReminderControlContext } from '../../context/ReminderControlProvider'
import { ThemeColorContext } from '../../context/ThemeColorContext'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RootStackParamList } from '../../Types/NavigationType'
import { IReminderData, IstateReminder } from '../../Types/TReminder'
import { ContainerFAB } from '../../components/ContainerFAB'

interface IAddReminder extends NativeStackScreenProps<RootStackParamList, 'AddReminder'> {}

export const AddReminder = ({ navigation, route }:IAddReminder) => {
  const [reminder, setReminder] = useState<IstateReminder>({
    fullReminder: '',
    date: null,
    time: null,
    title: ''
  })

  const [focus, setFocus] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isOpenPicker, setOpenPicker] = useState(false)
  const [existCurrentId, setExistCurrentId] = useState<string>()
  const [modePicker, setModePicker] = useState<'date' | 'time'>('date')

  const { createReminder, reminders: remindersData, updateReminder } = useContext(ReminderControlContext)
  const { color, setColorTheme } = useContext(ThemeColorContext)

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
      const { date, time, color, ...rest } = remindersData.find(rmd => rmd.id === currentId) as IReminderData
      setColorTheme(color)
      setReminder({
        ...rest,
        time: time && new Date(time),
        date: date && new Date(date)
      })
    } else {
      setColorTheme({
        colorTheme: '#F6FAFB',
        tintColor: '#000'
      })
    }
  }, [])

  const handleChange = (value:any, name:string) => {
    setReminder({
      ...reminder,
      title: getTitle(value).trim(),
      [name]: value
    })
  }

  const onChangeDate = (date?:any) => {
    if (Platform.OS === 'android') setOpenPicker(false)
    setReminder({
      ...reminder,
      date: date || new Date()
    })
  }

  const onChangeTime = (time?:any) => {
    if (Platform.OS === 'android') setOpenPicker(false)
    setReminder({
      ...reminder,
      time: time || new Date()
    })
  }

  const saveReminder = async () => {
    const reminderObjet:IReminderData = {
      id: getUUID(),
      title: reminder.title,
      fullReminder: reminder.fullReminder,
      date: reminder.date,
      time: reminder.time,
      color
    }

    if (reminderObjet.title.trim().length !== 0) {
      if (existCurrentId) {
        if (reminderObjet.date !== null) {
          if (validateDate(reminderObjet.date as Date)) {
            updateReminder(existCurrentId, reminderObjet)
            if (reminderObjet.date !== null && reminderObjet.time !== null) {
              await scheduleNotification(reminderObjet)
            }
            navigation.navigate('Home')
          } else Alert.alert('Error', 'La fecha no puede ser menor a la actual')
        } else {
          updateReminder(existCurrentId, reminderObjet)
          navigation.navigate('Home')
        }
      } else {
        if (reminderObjet.date !== null) {
          if (validateDate(reminderObjet.date as Date)) {
            createReminder(reminderObjet)
            if (reminderObjet.date !== null && reminderObjet.time !== null) {
              await scheduleNotification(reminderObjet)
            }
            navigation.navigate('Home')
          } else Alert.alert('Error', 'La fecha no puede ser menor a la actual')
        } else {
          createReminder(reminderObjet)
          navigation.navigate('Home')
        }
      }
    } else Alert.alert('Error', 'El título no puede estar vacío')
  }

  const scheduleNotification = async (data:IReminderData) => {
    const { date, time, title, fullReminder, color: { colorTheme } } = data
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: fullReminder,
          color: colorTheme
        },
        trigger: {
          hour: time?.getHours(),
          minute: time?.getMinutes(),
          repeats: false,
          month: date?.getMonth(),
          year: date?.getFullYear(),
          day: date?.getDay()
        }
      })
    } catch (error) {
      Alert.alert('Error', 'No se pudo agendar la notificación')
    }
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
            value={modePicker === 'date' ? reminder.date || new Date() : reminder.time || new Date()}
            mode={modePicker}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={(_, date) =>
              modePicker === 'date' ? onChangeDate(date) : onChangeTime(date)
            }
        />
        )
      }

      <OptionsAddReminder
        setOpenPicker={setOpenPicker}
        setOpen={setOpen}
        setModePicker={setModePicker}
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
