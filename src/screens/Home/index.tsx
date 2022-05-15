import { useEffect, ReactNode, useState, useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TextInputFocusEventData, TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { FAB } from '@components/FAB'
import { GridCard } from '@components/GridCard'
import { RootStackParamList } from '@Types/NavigationType'
import { ContainerFAB } from '@components/ContainerFAB'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { OptionsHome } from './OptionsHome'
import { ReminderControlContext } from '@context/ReminderControlProvider'
import { Search } from '@components/Search'

interface IHome extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

export const Home = ({ navigation }:IHome) => {
  const [isOpen, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectListReminder, setSelectListReminder] = useState(false)
  const { reminders, removeAllSelectedRemindersById, selectedReminders } = useContext(ReminderControlContext)

  const onScrollEvent = (e:NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = e.nativeEvent.contentOffset.y
    if (yOffset > 0) {
      navigation.setOptions({
        headerTitle: 'Recordatorios',
        headerStyle: {
          backgroundColor: '#e8eeef'
        }
      })
    } else {
      navigation.setOptions({
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#F6FAFB'
        }
      })
    }
  }

  useEffect(() => {
    selectListReminder && setSelectListReminder(false)
  }, [reminders])

  useEffect(() => {
    navigation.setOptions({
      headerLeft (props: HeaderButtonProps): ReactNode {
        return !selectListReminder
          ? (
          <Icon
            name="dots-horizontal"
            type="material-community"
            color={props.tintColor}
            size={30}
            tvParallaxProperties={undefined}
            onPress={() => setOpen(true)}
          />
            )
          : (
              <TouchableOpacity onPress={() => setSelectListReminder(false)}>
                <Text style={style.optionTextHeader}>Listo</Text>
              </TouchableOpacity>
            )
      },
      headerRight (props: HeaderButtonProps):ReactNode {
        return selectListReminder && (
          <TouchableOpacity onPress={() => removeAllSelectedRemindersById()}>
            <Text style={style.optionTextHeader}>Eliminar</Text>
          </TouchableOpacity>
        )
      },
      headerSearchBarOptions: Platform.OS === 'ios'
        ? {
            placeholder: 'Buscar',

            onChangeText: (e:NativeSyntheticEvent<TextInputFocusEventData>) =>
              setSearch(e.nativeEvent.text)
          }
        : undefined
    })
  }, [selectListReminder, selectedReminders])

  return (
    <>
      <ScrollView
        keyboardDismissMode='on-drag'
        onScroll={e => onScrollEvent(e)}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        >
          {Platform.OS === 'android' && <Search setSearch={setSearch} />}
          <View style={style.contentMessageWelcome}>
            <Text style={style.title}>
              Todos tus recordatorios en un solo lugar.
            </Text>
          </View>
          <GridCard
            typeLayout="list"
            select={selectListReminder}
            search={search}/>
      </ScrollView>
      <OptionsHome
        setOpen={setOpen}
        setSelectListReminder={setSelectListReminder}
        isOpen={isOpen}
      />
      {!selectListReminder && <ContainerFAB>
        <FAB
          onPress={() => navigation.navigate('AddReminder') }
          name="plus"
          type="material-community"
        />
      </ContainerFAB>}
    </>
  )
}

const style = StyleSheet.create({
  contentMessageWelcome: {
    width: '90%',
    marginBottom: 15
  },

  title: {
    fontSize: 35,
    color: '#212837',
    fontWeight: 'bold'
  },

  description: {
    fontSize: 20,
    color: '#212837',
    marginTop: 10
  },

  optionTextHeader: {
    fontSize: 17,
    color: '#212837',
    fontWeight: 'bold'
  }

})
