import { StyleSheet, TouchableOpacity } from "react-native"

interface IFAB{
  onPress: () => void
  Icon:React.FunctionComponent
}

export const FAB = ({Icon, onPress}:IFAB) => {
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
        position: 'absolute',
        width: 60,
        height: 60,
        zIndex: 1,
        bottom: 30,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7461',
        borderRadius: 30,
        shadowColor: '#1717176a',
        elevation: 5,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})