import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

export const ContainerFAB:FC = ({ children }) => {
  return (
    <View style={style.conatiner}>
        {children}
    </View>
  )
}

const style = StyleSheet.create({
  conatiner: {
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 10
  }
})
