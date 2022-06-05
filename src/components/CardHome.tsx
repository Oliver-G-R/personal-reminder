import { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@Types/NavigationType'
import { IReminderData } from '@Types/TReminder'
import moment from 'moment'

interface ICardHomeProps {
  title: IReminderData['title'];
  time: IReminderData['time'];
  date: IReminderData['date'];
  color: IReminderData['color'];
  id: IReminderData['id']
}

export const CardHome:FC<ICardHomeProps> = ({ title, color, time, id, date }) => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('AddReminder', { currentId: id })}
      style={ [style.card, { backgroundColor: color.colorTheme }]}>

        <View style={style.containerInfo}>
          <Text style={style.textCard}>
              {title}
          </Text>
          {date && <View style={style.containerTime}>
            <Text style={style.icon}>📅</Text>
            <Text style={style.infoData}>
              {
                new Date(date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              }
            </Text>
          </View>}
         {time && <View style={style.containerTime}>
            <Text style={style.icon}>🕛</Text>
            <Text style={style.infoData}>
              {
               /* transform to time 12 hor format */
                moment(time, ['HH.mm']).format('hh:mm a')
              }
            </Text>
          </View>}
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
  infoData: {
    color: '#433836',
    fontSize: 20,
    padding: 2,
    fontWeight: 'bold'
  },

  icon: {
    marginVertical: 5
  },

  containerTime: {
    marginVertical: 5,
    backgroundColor: '#f9f9f96f',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    padding: 5
  }
})
