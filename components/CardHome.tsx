import { Text, View, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native"
import { Image } from "react-native-elements";

interface CardHomeProps {
  title: string;
  img: ImageSourcePropType;
  onPress?: () => void;
  hour: string;
  color: string;
}

export const CardHome = ({title, color, hour, onPress, img }:CardHomeProps) => {
  return (
    <TouchableOpacity  
      activeOpacity={0.9} 
      onPress={onPress}
      style={[{backgroundColor: color }, style.card]}>

        {img && <Image 
            source={img}
            // style={style.image}
            style={{ 
              height: 200,
            }}
        />}

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
    card:{
        flexDirection: 'column',
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom: 10,
        shadowColor: '#171717',
        elevation: 5,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    containerInfo:{
      padding: 10
    },

    textCard:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    hour:{
        color: '#fff',
        fontSize: 20,
        padding: 2,
        marginTop: 5,
        fontWeight: 'bold',
    },
})