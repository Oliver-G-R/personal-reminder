import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface IFAB{
  onPress: () => void
  Icon:FC
}

export const FAB:FC<IFAB> = ({ Icon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={style.fab}>
        <Icon/>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7461',
    borderRadius: 30,
    shadowColor: '#1717176a',
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
})
