import { ScrollView } from 'react-native'
import { CardHome } from './CardHome'
import MasonryList from '@react-native-seoul/masonry-list'
import { NoReminders } from './NoReminders'
import { reminders } from '../data'

export const GridCard = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>

      {reminders.length > 0
        ? <MasonryList
        data={reminders}
        keyExtractor={(item, index): string => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardHome
          onPress={() => console.log(item.title)}
          {...item}
        />}

      />
        : <NoReminders />}

    </ScrollView>
  )
}
