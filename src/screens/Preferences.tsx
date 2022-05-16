import { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { globalStyle } from '../constants/globalStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@Types/NavigationType'
import { CheckBox } from '@components/CheckBox'
import { PreferencesContext } from '@context/PreferencesProvider'

interface IPreferences extends NativeStackScreenProps<RootStackParamList, 'Preferences'> {}

export const Preferences = ({ navigation }:IPreferences) => {
  const { viewRminder: { setTypeViewReminder, typeViewReminder } } = useContext(PreferencesContext)

  return (
    <SafeAreaView style={style.container}>
        <Text style={[style.title, globalStyle.container]}>Preferencias 🛠️</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[style.containerPreferences, globalStyle.container]}>
          <View>
            <Text style={style.titleCategory}>Entorno Visual</Text>
            <View style={style.contentPreferenceItem}>
              <View style={style.contentNamePreference}>
                <Icon
                  name="page-layout-header"
                  type="material-community"
                  style={style.icon}
                  color="#fff"
                  size={30}
                  tvParallaxProperties={undefined} />
                <Text style={style.titlePreference}>Estilo de listado</Text>
              </View>

              <View style={style.containerSelectLayout}>
                <TouchableOpacity
                  onPress={() => setTypeViewReminder('list')}
                  activeOpacity={0.7}
                  style={style.contentLayoutList}>
                  <View
                    style={[style.layoutListItem, {
                      backgroundColor: typeViewReminder === 'list' ? '#FF7461' : '#dfe2e4'
                    }]}>
                  </View>
                  <View
                    style={[style.layoutListItem, {
                      backgroundColor: typeViewReminder === 'list' ? '#FF7461' : '#dfe2e4'
                    }]}>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTypeViewReminder('grid')}
                  activeOpacity={0.7}
                  style={style.contentLayoutGrid}>
                  <View style={[style.layoutGridItem, {
                    backgroundColor: typeViewReminder === 'grid' ? '#FF7461' : '#dfe2e4'
                  }]}>
                  </View>
                  <View style={[style.layoutGridItem, {
                    backgroundColor: typeViewReminder === 'grid' ? '#FF7461' : '#dfe2e4',
                    marginTop: 10,
                    marginRight: 0
                  }]}>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <View style={style.contentPreferenceItem}>
              <View style={style.contentNamePreference}>
                <Icon
                  name="brightness-4"
                  type="material-community"
                  style={style.icon}
                  color="#fff"
                  size={30}
                  tvParallaxProperties={undefined} />
                <Text style={style.titlePreference}>Tema</Text>
              </View>

              <View style={style.itemSubOption}>
                <Text style={style.textSubOptions}>Sistema</Text>
                <CheckBox
                  checked={true}
                  onPress={() => console.log('Sistema')}
                />
              </View>

              <View style={style.itemSubOption}>
                <Text style={style.textSubOptions}>Oscuro</Text>
                <CheckBox
                  checked={false}
                  onPress={() => console.log('Oscuro')}
                />
              </View>

              <View style={style.itemSubOption}>
                <Text style={style.textSubOptions}>Claro</Text>
                <CheckBox
                  checked={false}
                  onPress={() => console.log('Claro')}
                />
              </View>

            </View>
          </View>

        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
          style={[style.backBtn]}>
          <Text style={style.backBtnText}>Regresar</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  title: {
    fontSize: 30,
    marginTop: 40,
    color: '#212837',
    fontWeight: 'bold'
  },

  titleCategory: {
    fontSize: 24,
    color: '#212837',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  titlePreference: {
    fontSize: 18,
    fontWeight: '600'
  },

  textSubOptions: {
    fontSize: 20
  },

  itemSubOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe2e4'
  },

  containerPreferences: {
    marginTop: 20,
    maxHeight: '70%',
    paddingVertical: 15
  },

  icon: {
    marginRight: 10,
    backgroundColor: '#FF7461',
    padding: 10,
    borderRadius: 50
  },

  contentPreferenceItem: {
    marginBottom: 15,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15
  },

  backBtn: {
    marginTop: 30,
    backgroundColor: '#FF7461',
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 15
  },

  backBtnText: {
    color: '#ffff',
    fontSize: 20,
    textAlign: 'center'
  },

  contentNamePreference: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },

  /* Estilos para el layout de preferencia */
  containerSelectLayout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  contentLayoutList: {
    flexDirection: 'column'
  },
  contentLayoutGrid: {
    flexDirection: 'row'
  },
  layoutListItem: {
    marginBottom: 10,
    height: 30,
    borderRadius: 10,
    width: 90
  },

  layoutGridItem: {
    height: 70,
    marginRight: 5,
    borderRadius: 10,
    width: 70
  }
  /* ///// */

})
