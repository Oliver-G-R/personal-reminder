import { ReactNode, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { FAB } from '../components/FAB'
import InputScrollView from 'react-native-input-scroll-view'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { getDate, getTitle } from '../helpers/reminder'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../MyStackNavigation'
import { PopUpModalOptions } from './PopUpModalOptions'
interface IAddReminder extends NativeStackScreenProps<RootStackParamList, 'AddReminder'> {}

export const AddReminder = ({ navigation }:IAddReminder) => {
  const [reminder, setReminder] = useState({
    fullReminder: '',
    date: new Date(),
    time: new Date()

  })
  const [focus, setFocus] = useState(false)

  const [isOpen, setOpen] = useState(false)

  const options = [
    {
      event: () => setOpen(true),
      name: 'Compartir',
      IconElement: () => <Icon
        name="share"
        type="material-community"
        color="#e8eeef"
        size={30}
        tvParallaxProperties={undefined} />
    }
  ]

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
      title: getTitle(reminder.fullReminder).trim() || 'Agregar recordatorio'
    })
  }, [reminder.fullReminder])

  return (
    <>
      <InputScrollView
        showsVerticalScrollIndicator={false}
      >
        <View>
          <TextInput
            style={style.textInputDescription}
            value={reminder.fullReminder}
            placeholderTextColor="#777786"
            onFocus={() => {
              setFocus(true)
              setOpen(false)
            }}
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

      {isOpen && <PopUpModalOptions
        options={options}
        setIsOpen={setOpen}
      />}

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
