import { Image, StyleSheet, Text, View } from "react-native"
import { FAB } from './FAB';

export const NoReminders = () => {
    return (
      <View style={style.container}>
        <Image 
            source={require('../assets/png/empty.png')}
            style={{ 
              height: 400,
              width: "100%",
            }}
        />

        <Text style={style.text}>
          Parece que no has agregado ningún recordatorio.
        </Text>
      </View>
    )
}
  
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        width: "95%",
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})