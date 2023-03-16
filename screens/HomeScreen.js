import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import ReadNowBook from "../components/ReadNowBook";
import { getBooksFromStorage, getGenres } from "../api/bookApi";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import Genre from "../components/Genre";
import NewsItem from "../components/NewsItem";
import { getNews } from "../api/newsApi";

const HomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [news, setNews] = useState([]);
  console.log(news);
  useEffect(() => {
    getNews(currentPage).then(data => setNews((prev) => [...prev, ...data]))
  }, [currentPage])
  // useFocusEffect(
  //   useCallback(() => {
  //     getGenres().then((data) => setGenres(data));
  //     setTimeout(
  //       () =>
  //         getBooksFromStorage().then((data) => {
  //           if (data == null) return;
  //           setBooks(data);
  //         }),
  //       0
  //     );
  //   }, [])
  // );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>      
              <FlatList
              ListHeaderComponent={<Text
              onPress={() => navigation.navigate("LinksScreen")}
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Новости
              </Text>}
              onEndReached={() => setCurrentPage(prev => prev + 1)}
                data={news}
                renderItem={({ item }) => <NewsItem item={item} />}
                keyExtractor={(item) => item._id}
                horizontal={false}
              />
      {/* <ScrollView style={{ marginTop: SIZES.radius }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: SIZES.padding }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Читаю сейчас
              </Text>
              <FlatList
                data={books.filter((item) => item.currentPage !== item.pages)}
                renderItem={({ item }) => (
                  <ReadNowBook item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              Жанры
            </Text>
            <View style={{ flex: 1, marginTop: SIZES.padding }}>
              <FlatList
                data={genres}
                renderItem={({ item }) => (
                  <Genre item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            
          </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
