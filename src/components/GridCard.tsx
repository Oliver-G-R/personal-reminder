import { ScrollView } from 'react-native'
import { CardHome } from './CardHome'
import MasonryList from '@react-native-seoul/masonry-list'
import { NoReminders } from './NoReminders'
import { useContext, useEffect } from 'react'
import { ReminderControlContext } from '../context/ReminderControlProvider'

interface IGridCard {
  search: string
}
export const GridCard = ({ search }:IGridCard) => {
  const { reminders } = useContext(ReminderControlContext)

  const filterData = () => {
    if (search !== '') {
      const freminder = reminders.filter(c => {
        return Object.values(c)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      })

      return freminder
    }

    return reminders
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>

      {filterData().length > 0
        ? <MasonryList
        data={filterData()}
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
