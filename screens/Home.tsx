
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Icon } from "react-native-elements"
import { FAB } from "../components/FAB"
import { GridCard } from "../components/GridCard"
import { RootStackParamList } from '../MyStackNavigation';

interface IHome extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

export const Home = ({ navigation }:IHome) => {

  const onScrollEvent = (e:NativeSyntheticEvent<NativeScrollEvent>) => {
    let yOffset = e.nativeEvent.contentOffset.y;
    if(yOffset > 0) {
      navigation.setOptions({
        headerTitle: 'Recordatorios',
        headerStyle: {
          backgroundColor: '#e8eeef',
        },
      })

    }else {
      navigation.setOptions({
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#F6FAFB',
        },
      })
    }
  }


  return (
    <>
      <ScrollView 
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
          <GridCard />
      </ScrollView>
      <FAB
        onPress={() => navigation.navigate("AddReminder") }
        Icon={
          () => <Icon
          name="plus"
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
  contentMessageWelcome: {
    width: '90%',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    color: '#212837',
    // marginTop: 30,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 20,
    color: '#212837',
    marginTop: 10,
  }

})