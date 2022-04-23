import { FC } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IPopUpModalOptions {
  setIsOpen: (isOpen: boolean) => void
  options: {
    event: Function;
    name: string,
    IconElement: FC
  }[]
}

export const PopUpModalOptions:FC<IPopUpModalOptions> = ({ setIsOpen, options }) => {
  const handdlePress = (event: Function) => {
    event()
    setIsOpen(false)
  }
  return (
    <Modal
      animationType="fade"
      transparent
      >
       <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
          <View
            style={style.container}>
              <FlatList
                data={options}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index): string => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={style.option}
                    onPress={() => handdlePress(item.event)}
                    >
                    <Text style={style.optionName}>{item.name}</Text>
                    <item.IconElement/>
                  </TouchableOpacity>
                )}
              />
          </View>
       </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 15,
    position: 'absolute',
    backgroundColor: '#e8eeef',
    bottom: 0
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  },

  optionName: {
    fontSize: 20,
    color: '#000'
  }
})
