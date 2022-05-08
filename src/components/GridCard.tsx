import { ScrollView } from 'react-native'
import { CardHome } from './CardHome'
import MasonryList from '@react-native-seoul/masonry-list'
import { NoReminders } from './NoReminders'
import { useContext } from 'react'
import { ReminderControlContext } from '../context/ReminderControlProvider'

export const GridCard = () => {
  const { reminders } = useContext(ReminderControlContext)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>

      {reminders.length > 0
        ? <MasonryList
        data={reminders}
        keyExtractor={(item, index): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardHome
          {...item}
        />}

      />
        : <NoReminders />}

    </ScrollView>
  )
}
