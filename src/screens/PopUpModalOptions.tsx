import { Children, FC, PropsWithChildren, ReactElement, cloneElement } from 'react'
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
          backgroundColor: '#000000aa'
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
                >
                {
                  children && Children.map(children, child => {
                    const item = child as ReactElement

                    return child && cloneElement(item, {
                      style: [style.option],
                      activeOpacity: 0.8
                    })
                  })
                }

              </ScrollView>
          </View>
       </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 15,
    position: 'absolute',
    backgroundColor: '#F6FAFB',
    bottom: 0
  },

  doneText: {
    fontSize: 19,
    marginBottom: 10,
    color: '#000'
  },

  donebtn: {
    width: 60
  },

  option: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  }
})
