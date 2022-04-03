import { Text, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FAB } from "../components/FAB"
import { GridCard } from "../components/GridCard"

export const Home = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
        <View style={style.contentMessageWelcome}>
          <Text style={style.title}>
            Bienvenida la a app de recordatorios 
          </Text>
          <Text style={style.description}>
            Presiona alguno para verlo en detalle.
          </Text>
        </View>
        <GridCard />
        <FAB/>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  contentMessageWelcome: {
    width: '90%',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#3A3738',
    fontWeight: 'bold',
  },

  description: {
    fontSize: 20,
    color: '#6B6B6B',
    marginTop: 10,
  }

})