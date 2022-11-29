import React from "react";  
import { useNavigation } from "@react-navigation/native";
import { Image, View, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native";
import { icons, SIZES, COLORS, FONTS } from "../constants";
import { BASE_API_URL } from "../constants/constants";

const Book = ({ item, navigation }) => {
    const onPress = () => {
        navigation.navigate("BookScreen", {bookId: item._id})
    }
    return (
    <TouchableOpacity
      style={{
        width: 150,
        margin: 10,
      }}
      onPress={onPress}
    >
      {/* Book Cover */}
      <Image
        source={{ uri: `${BASE_API_URL}/${item.picture}` }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 220,
          borderRadius: 3,
        }}
      />

      {/* Book Info */}
      <View style={{ marginTop: SIZES.radius, alignItems: "center" }}>
        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.white }}>
          {item.name}
        </Text>
        <Text
          style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
        >
          {item.author.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
