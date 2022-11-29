import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, FlatList } from "react-native";
import { searchBooks } from "../api/bookApi";
import Book from "../components/Book";
import { COLORS } from "../constants";

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(null);
  useEffect(() => {
    searchBooks(query).then((data) => setBooks(data));
  }, [query]);
  if (books == null) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <TextInput
        placeholderTextColor="gray"
        placeholder="название книги"
        value={query}
        onChangeText={(value) => setQuery(value)}
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 20,
          backgroundColor: "#131313",
          color: "white",
        }}
      />
      <FlatList
        data={books}
        renderItem={({item}) => <Book item={item} navigation={navigation}/>}
        keyExtractor={(item) => `${item._id}`}
        numColumns={2}
        contentContainerStyle={{alignItems: 'center',}}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
