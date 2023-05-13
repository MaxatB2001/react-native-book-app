import { View, Text, Image } from "react-native";
import { BASE_API_URL } from "../constants/constants";
import {icons, SIZES, COLORS} from "../constants"
import { TouchableOpacity } from "react-native-gesture-handler";

const NewsItem = ({ item, navigation }) => {
  const onPress = () => {
    navigation.navigate("NewsScreen", {news: item})
  }
  return (
    <View style={{ padding: 5 }}>
      <View
        style={{ padding: 10, borderRadius: 20, backgroundColor: "#270A1F" }}
      >
        <View style={{ display: "flex", flexDirection: "row"}}>
          <Text style={{ color: "white", fontWeight: "800" }}>
            {item.title}
          </Text>
          <Text style={{ color: "white", fontWeight: "800", marginLeft: 5 }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={{ color: "white", fontWeight: "500" }}>{item.text}</Text>
        <Image
          style={{ width: "100%", height: 200, borderRadius: 20, marginTop: 5 }}
          source={{ uri: `${BASE_API_URL}/${item.picture}` }}
        />
       <TouchableOpacity onPress={onPress}>
       <Image
                  source={icons.comments}
                  style={{
                      marginLeft: SIZES.radius,
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      tintColor: COLORS.white
                  }}
              />
       </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;
