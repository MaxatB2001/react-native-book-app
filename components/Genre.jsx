import React from 'react'
import {View, Text, ImageBackground, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BASE_API_URL } from '../constants/constants'

const Genre = ({item, navigation}) => {
  const onPress = () => {
    navigation.navigate("GenreScreen", { id: item._id, genre: item.name });
  }
  return (
    <TouchableOpacity onPress={onPress} style={{margin: 10, justifyContent: "center", alignItems: "center"}}>
      <Image style={{width: 200, height: 200, borderRadius: 20}} source={{uri: `${BASE_API_URL}/${item.picture}`}}/>
      <Text style={{color: "white", position: "absolute", fontWeight: "800"}}>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default Genre