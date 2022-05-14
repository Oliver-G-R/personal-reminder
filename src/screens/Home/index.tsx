import { useEffect, ReactNode, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TextInputFocusEventData } from 'react-native'
import { Icon } from 'react-native-elements'
import { FAB } from '../../components/FAB'
import { GridCard } from '../../components/GridCard'
import { RootStackParamList } from '../../Types/NavigationType'
import { ContainerFAB } from '../../components/ContainerFAB'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { OptionsHome } from './OptionsHome'

interface IHome extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

export const Home = ({ navigation }:IHome) => {
  const [isOpen, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectListReminder, setSelectListReminder] = useState(false)

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
    navigation.setOptions({
      headerLeft (props: HeaderButtonProps): ReactNode {
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
      },
      headerSearchBarOptions: {
        placeholder: 'Buscar',
        onChangeText: (e:NativeSyntheticEvent<TextInputFocusEventData>) =>
          setSearch(e.nativeEvent.text)
      }
    }
    )
  }, [])

  return (
    <>
      <ScrollView
        keyboardDismissMode='on-drag'
        onScroll={e => onScrollEvent(e)}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        >
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
      <ContainerFAB>
        <FAB
          onPress={() => navigation.navigate('AddReminder') }
          name="plus"
          type="material-community"
        />
      </ContainerFAB>
    </>
  )
}

const style = StyleSheet.create({
  contentMessageWelcome: {
    width: '90%',
    marginBottom: 20
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
  }

})
