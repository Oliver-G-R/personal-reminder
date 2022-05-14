import { ScrollView, StyleSheet, View } from 'react-native'
import { CardHome } from './CardHome'
import MasonryList from '@react-native-seoul/masonry-list'
import { NoReminders } from './NoReminders'
import { useContext, useEffect, useState } from 'react'
import { ReminderControlContext } from '../context/ReminderControlProvider'
import { IReminderData } from '../Types/TReminder'
import { CheckBox } from './CheckBox'

interface IGridCard {
  search: string,
  typeLayout: 'list' | 'grid'
  select: boolean
}

export const GridCard = ({ search, typeLayout, select }:IGridCard) => {
  const { reminders, selectReminder, removeSelectedReminders, selectedReminders } = useContext(ReminderControlContext)

  useEffect(() => removeSelectedReminders(), [select])

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
            keyExtractor={(item): string => item.id}
            numColumns={typeLayout === 'list' ? 1 : 2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={
                typeLayout === 'list' && select && style.isList
                }>
                {select && <CheckBox
                    onPress={() => selectReminder(item)}
                    styles={typeLayout === 'list'
                      ? {
                          marginRight: 10
                        }
                      : {
                          marginBottom: 10
                        }}
                    checked={selectedReminders.some(iSelected => iSelected.id === item.id)}
                />}
                  <CardHome
                    {...item}
                  />
              </View>
            )}

      />
        : <NoReminders />}

    </ScrollView>
  )
}

const style = StyleSheet.create({
  isList: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
