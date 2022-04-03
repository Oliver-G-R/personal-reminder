import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"

export const FAB = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={style.fab}>
        <Icon
            name="plus"
            type="font-awesome"
            color="#fff"
            size={30} 
            tvParallaxProperties={undefined} />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        zIndex: 1,
        bottom: 30,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03A9F4',
        borderRadius: 30,
    },
})