import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { ThemeColorContext } from '../context/ThemeColorContext'
import { useContext } from 'react'

export const OptionsAddReminder = () => {
  const { disponibleColors, setColorTheme, color } = useContext(ThemeColorContext)

  return (
       <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.option}
          >
              <Icon
                name="share"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Compartir
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.option}
          >
              <Icon
                name="delete"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Eliminar
              </Text>
          </TouchableOpacity>
          <View
            style={style.option}
          >
              <Icon
                name="palette"
                type="material-community"
                color="#212837"
                style={style.icon}
                size={30}
                tvParallaxProperties={undefined} />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={disponibleColors}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[style.round, { backgroundColor: item.color.colorTheme }]}
                            onPress={() => setColorTheme(item)}>

                            { item.color.colorTheme === color?.color.colorTheme && <View style={style.selected}></View>}
                        </TouchableOpacity>
                    )}
                />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.option}
          >
              <Icon
                name="calendar-range"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Fecha
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.option}
          >
              <Icon
                name="alarm-multiple"
                type="material-community"
                style={style.icon}
                color="#212837"
                size={30}
                tvParallaxProperties={undefined} />
              <Text style={style.optionText}>
                Hora
              </Text>
          </TouchableOpacity>
       </>
  )
}

const style = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6FAFB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  icon: {
    marginRight: 10
  },
  round: {
    height: 32,
    width: 32,
    borderRadius: 110,
    alignItems: 'center',

    justifyContent: 'center',
    marginRight: 15,
    backgroundColor: '#FFFFFF'
  },
  optionText: {
    fontSize: 16,
    color: '#212837'
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 55,
    backgroundColor: '#fff'
  }

})
