import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
interface IcheckBox{
    checked: boolean
    onPress: Function
    styles?: object
}
export const CheckBox = ({ checked, onPress, styles }:IcheckBox) => {
  return (
    <TouchableOpacity
        activeOpacity={0.5}
        style={[style.containerCheckbox, {
          backgroundColor: checked ? '#212837' : '#F6FAFB'
        }, styles]}
        onPress={() => onPress()}>
        {checked && <Icon
            name="check-bold"
            type="material-community"
            color="#fff"
            size={25}
            tvParallaxProperties={undefined} />}

    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  containerCheckbox: {
    backgroundColor: '#F6FAFB',
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    shadowColor: '#1717176a',
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10
  }
})
