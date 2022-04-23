import { ReactNode, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Keyboard, Platform } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { FAB } from '../components/FAB'
import InputScrollView from 'react-native-input-scroll-view'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { getDate, getTitle } from '../helpers/reminder'
import DateTimePicker from '@react-native-community/datetimepicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../MyStackNavigation'

interface IAddReminder extends NativeStackScreenProps<RootStackParamList, 'AddReminder'> {}

export const AddReminder = ({ navigation }:IAddReminder) => {
  const [reminder, setReminder] = useState({
    fullReminder: '',
    date: new Date(),
    time: new Date()

  })
  const [focus, setFocus] = useState(false)
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const showMode = (currentMode: string) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  const onChange = (selectedDate:any) => {
    console.log(selectedDate)
    const currentDate = selectedDate
    setShow(Platform.OS === 'ios')
    setReminder({ ...reminder, date: currentDate })
  }

  useEffect(() => {
    navigation?.setOptions({
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
            name="export-variant"
            type="material-community"
            color={props.tintColor}
            size={30}
            tvParallaxProperties={undefined}
            onPress={() => console.log('Pressed')}
          />
          )
        }
      }
    })
  }, [focus])

  useEffect(() => {
    navigation?.setOptions({
      title: getTitle(reminder.fullReminder).trim() || 'Agregar recordatorio'
    })
  }, [reminder.fullReminder])

  return (
     <>
        <InputScrollView
          showsVerticalScrollIndicator={false}
        >
         <View>
           {/*  <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={mode === 'date' ? reminder.date : reminder.time}
                mode={mode as any}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )} */}
            <TextInput
              style={style.textInputDescription}
              value={reminder.fullReminder}
              placeholderTextColor="#777786"
              onFocus={() => setFocus(true)}
              autoFocus={true}
              onBlur={() => setFocus(false)}
              multiline
              onChangeText={(value) => setReminder({ ...reminder, fullReminder: value })}
               />

              <View style={{
                height: 100
              }} />
         </View>
        </InputScrollView>

        <FAB
          onPress={() => console.log('Pressed')}
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
    color: '#777786',
    height: '100%',
    minHeight: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 20
  }

})
