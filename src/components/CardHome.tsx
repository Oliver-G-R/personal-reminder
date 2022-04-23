import { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Image } from 'react-native-elements'

interface ICardHomeProps {
  title: string;
  img: ImageSourcePropType;
  onPress?: () => void;
  hour: string;
  color: string;
}

export const CardHome:FC<ICardHomeProps> = ({ title, color, hour, onPress, img }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={ style.card}>

        {/* {img && <Image
            source={img}
            // style={style.image}
            style={{
              height: 200,
            }}
        />} */}

        <View style={style.containerInfo}>
          <Text style={style.textCard}>
              {title}
          </Text>
          <Text style={style.hour}>{hour}</Text>
        </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1717176a',
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  containerInfo: {
    padding: 10
  },

  textCard: {
    color: '#433836',
    fontSize: 20,
    fontWeight: 'bold'
  },
  hour: {
    color: '#433836',
    fontSize: 20,
    padding: 2,
    marginTop: 5,
    fontWeight: 'bold'
  }
})
