import { FC } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IPopUpModalOptions {
  setIsOpen: (isOpen: boolean) => void
}

export const PopUpModalOptions:FC<IPopUpModalOptions> = ({ setIsOpen, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      >
       <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>

          <View
            style={style.container}>
              <TouchableOpacity
                style={style.donebtn}
                onPress={() => setIsOpen(false)}
                activeOpacity={0.8}>
                <Text style={style.doneText}>Listo</Text>
              </TouchableOpacity>
              <ScrollView
                showsVerticalScrollIndicator={false}
              >{ children }</ScrollView>
          </View>
       </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '35%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 15,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0
  },

  doneText: {
    fontSize: 19,
    marginBottom: 10,
    color: '#000'
  },

  donebtn: {
    width: 60
  }
})
