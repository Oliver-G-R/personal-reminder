import { SetStateAction, Dispatch } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
interface ISearch {
    setSearch: Dispatch<SetStateAction<string>>
}
export const Search = ({ setSearch }:ISearch) => {
  return (
    <View>
        <TextInput
            style={style.input}
            placeholder='Buscar'
            onChangeText={(text) => setSearch(text)}
        />
    </View>
  )
}

const style = StyleSheet.create({
  input: {
    fontSize: 17,
    color: '#000',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#e1e1e1',
    marginBottom: 10
  }
})
