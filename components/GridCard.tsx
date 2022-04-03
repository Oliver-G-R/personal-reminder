import React from 'react'
import { ScrollView,  } from 'react-native';
import { CardHome } from './CardHome';
import MasonryList from '@react-native-seoul/masonry-list';
import { NoReminders } from './NoReminders';

export const GridCard = () => {
  const reminders = [
    {
      id: 1,
      title: 'Traer a abigail de la escuela antes de que salga',
      description: 'Descripción del recordatorio 1',
      hour: '12:00',
      color: '#CCCB05',
      img: require('../assets/png/lunch.png'),
    },
    {
      id: 2,
      title: 'Recordatorio 2',
      description: 'Descripción del recordatorio 2',
      hour: '12:00',
      color: '#FFCB05',
      img: require('../assets/png/empty.png'),
    },
    {
      id: 3,
      title: 'Comprar medicamentos',
      description: 'Descripción del recordatorio 3',
      hour: '12:00',
      color: '#FFCB05',
      img: require('../assets/png/medicine.png'),
    },
  
  ]

  return (
    <ScrollView 
      scrollEventThrottle={16} 
      showsVerticalScrollIndicator={false}>

      {reminders.length > 0 ? <MasonryList
        data={reminders}
        keyExtractor={(item, index): string => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardHome 
          onPress={() => console.log(item.title)} 
          {...item} 
        />}

      /> : <NoReminders />}

    </ScrollView>
  )
}
