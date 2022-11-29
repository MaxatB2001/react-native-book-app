import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {View, Text, FlatList} from 'react-native'
import { getBooksFromStorage } from '../api/bookApi'
import ReadNowBook from '../components/ReadNowBook'
import { COLORS, FONTS } from '../constants'

const LibraryScreen = ({navigation, route}) => {
  const [books, setBooks] = useState(null)
  useFocusEffect(useCallback(() => {
    setTimeout(() => getBooksFromStorage().then(data => setBooks(data)), 0)
  }, []))
  

  if (books == null) return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <FlatList
        data={books}
        ListHeaderComponent={<Text style={{color: COLORS.white, fontWeight: "bold", fontSize: 40, textAlign: "center"}}>Библиотека</Text>}
        renderItem={({item}) => <ReadNowBook item={item} navigation={navigation}/>}
        keyExtractor={(item) => `${item._id}`}
        numColumns={2}
        contentContainerStyle={{alignItems: 'center',}}
      />
    </View>
  )
}

export default LibraryScreen