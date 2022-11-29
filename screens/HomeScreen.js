import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import ReadNowBook from "../components/ReadNowBook";
import { getBooksFromStorage, getGenres } from "../api/bookApi";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import Genre from "../components/Genre";

const HomeScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  useFocusEffect(useCallback(() => {
    getGenres().then(data => setGenres(data));
    setTimeout(() => getBooksFromStorage().then(data => {
      if (data == null) return
      setBooks(data)
    }), 0)
  }, []))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <ScrollView style={{ marginTop: SIZES.radius }}>
        <View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: SIZES.padding }}>
            <Text style={{color: COLORS.white, fontWeight: "bold", fontSize: 30, textAlign: "center"}}>Читаю сейчас</Text>
              <FlatList
                data={books.filter(item => item.currentPage !== item.pages)}
                renderItem={({item}) => <ReadNowBook item={item} navigation={navigation}/>}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={{color: COLORS.white, fontWeight: "bold", fontSize: 30, textAlign: "center"}}>Жанры</Text>
            <View style={{ flex: 1, marginTop: SIZES.padding }}>
              <FlatList
                data={genres}
                renderItem={({item}) => <Genre item={item} navigation={navigation}/>}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: SIZES.padding }}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
