import { ScrollView, StyleSheet, View } from 'react-native'
import { CardHome } from '@components/CardHome'
import MasonryList from '@react-native-seoul/masonry-list'
import { NoReminders } from '@components/NoReminders'
import { useContext, useEffect, useState } from 'react'
import { ReminderControlContext } from '@context/ReminderControlProvider'
import { CheckBox } from '@components/CheckBox'
import { useSearchFilter } from '@hooks/useSearchFilter'

interface IGridCard {
  search: string,
  typeLayout: 'list' | 'grid'
  select: boolean
}

export const GridCard = ({ search, typeLayout, select }:IGridCard) => {
  const { reminders, selectReminder, removeSelectedReminders, selectedReminders } = useContext(ReminderControlContext)
  const [filterData] = useSearchFilter(reminders, search)

  useEffect(() => removeSelectedReminders(), [select])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      {filterData.length > 0
        ? <MasonryList
            data={filterData}
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
