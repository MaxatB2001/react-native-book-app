import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {View, Text, FlatList} from 'react-native'
import { getBooksFromStorage, getByGenres } from '../api/bookApi'
import { COLORS, FONTS } from '../constants'
import Book from '../components/Book'

const GenreScreen = ({navigation, route}) => {
  const [books, setBooks] = useState(null)
  useEffect(() => {
    getByGenres(route.params.id).then(data => setBooks(data));
  }, [])
  

  if (books == null) return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <FlatList
        data={books}
        ListHeaderComponent={<Text style={{color: COLORS.white, fontWeight: "bold", fontSize: 40, textAlign: "center"}}>{route.params.genre}</Text>}
        renderItem={({item}) => <Book item={item} navigation={navigation}/>}
        keyExtractor={(item) => `${item._id}`}
        numColumns={2}
        contentContainerStyle={{alignItems: 'center',}}
      />
    </View>
  )
}

export default GenreScreen