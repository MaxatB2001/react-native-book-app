import { TouchableOpacity, Image, Text, Pressable, View } from "react-native";
import { COLORS } from "../constants";

const LitItem = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("WebViewScreen", { pageUrl: item[3].hyperlink })
      }
      style={{ width: "100%", padding: 10, borderRadius: 20, backgroundColor: "#270A1F", marginTop: 10  }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{item[1]}</Text>
      <View style={{marginTop: 10}}>
        <Text style={{ color: "white" }}>Автор: {item[2]}</Text>
        <Text style={{ color: "white", marginTop: 5 }}>Год: {item[4]}</Text>
        <Text style={{ color: "white", marginTop: 5 }}>Серия: {item[6]}</Text>
        <Text style={{ color: "white", marginTop: 5 }}>Тематика: {item[7]}</Text>
        {/* <Text style={{ color: "white", marginTop: 5 }}>Подтематика: {item[8]}</Text> */}
      </View>
      {/* <Image style={{ width: "100%", height: 100, borderRadius: 30, marginTop: 5 ,objectFit: "contain" }} source={{uri: item.image}}/>  */}
    </Pressable>
  );
};

export default LitItem;
