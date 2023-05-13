import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, FlatList, Image } from "react-native";
import ReadNowBook from "../components/ReadNowBook";
import { getBooksFromStorage, getGenres } from "../api/bookApi";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import Genre from "../components/Genre";
import NewsItem from "../components/NewsItem";
import { getNews } from "../api/newsApi";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const HomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [news, setNews] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false)
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
    <Pressable onPress={() => setShowSidebar(false)} style={{ flex: 1, backgroundColor: "#412227", position: "relative" }}> 
              {showSidebar ? <View style={{position: "absolute", height: "100%", width: "50%", backgroundColor: "#412227", zIndex: 1000, display: "flex", justifyContent: "space-between"}}>
              <View>
              <Pressable onPress={() => navigation.navigate("AboutScreen")} style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex",flexDirection: 'row', justifyContent: "center", alignItems: 'center',}}>
                <Image
                  source={icons.knitu_icon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                /> 
                <Text style={{color: "white", height: 30, fontWeight: "bold", fontSize:25}}>Униц</Text>
            
              </Pressable>
              <Pressable onPress={() => navigation.navigate("WebViewScreen", {pageUrl: "http://www.kstu.ru/article.jsp?id=1821&id_e=41256"})}  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Электронные каталоги</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("WebViewScreen", {pageUrl: "http://www.kstu.ru/article.jsp?id=1821&id_e=52135"})}  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Полнотекстовые книги</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("WebViewScreen", {pageUrl: "http://www.kstu.ru/article.jsp?id=1821&id_e=33330"})}  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Полнотекстовая коллекция книту</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("WebViewScreen", {pageUrl: "http://www.kstu.ru/article.jsp?id=1821&id_e=34712"})}  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Полнотекстовая периодика</Text>
              </Pressable>
              <Pressable  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Настройки</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("LinksScreen")}  style={{color: "white", width: "100%", backgroundColor: "#270A1F", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>О нас</Text>
              </Pressable>
              </View>
              <Pressable onPress={() => navigation.navigate("FeedbackScreen")}  style={{color: "white", width: "100%",  backgroundColor: "#412227", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", padding: 10, fontWeight: "bold"}}>Обратная связь</Text>
              </Pressable>
              </View> : null} 
              <Pressable  onPress={() => setShowSidebar(!showSidebar)}>
              <Image
                  source={icons.menu_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: COLORS.white,
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    marginTop: 10
                  }}
                /> 
              </Pressable>
              <FlatList
              ListHeaderComponent={<Text
              // onPress={() => navigation.navigate("LinksScreen")}
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
                renderItem={({ item }) => <NewsItem item={item} navigation={navigation}/>}
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
    </Pressable>
  );
};

export default HomeScreen;
