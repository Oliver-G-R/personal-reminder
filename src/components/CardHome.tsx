import { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../Types/NavigationType'
import { IReminderData } from '../Types/TReminder'

interface ICardHomeProps {
  title: IReminderData['title'];
  hour: IReminderData['time'];
  color: IReminderData['color'];
  id: IReminderData['id']
}

export const CardHome:FC<ICardHomeProps> = ({ title, color, hour, id }) => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('AddReminder', { currentId: id })}
      style={ style.card}>

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
