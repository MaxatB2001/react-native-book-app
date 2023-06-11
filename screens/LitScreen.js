import { View, Text, FlatList } from "react-native";
import { COLORS } from "../constants/theme";
import {
  monography,
  seriaAntologyMisly,
  readInOriginal,
  pamyatLiteratura,
  openScience,
} from "../constants/constants";
import LitItem from "../components/LitItem";

const LitScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#412227" }}>
      <FlatList
        ListHeaderComponent={
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            {route.params.type}
          </Text>
        }
        style={{ padding: 10 }}
        data={
          route.params.type == "Монографии"
            ? monography
            : route.params.type == "Читаем в оригинале"
            ? readInOriginal
            : route.params.type == "Памятники литературы"
            ? pamyatLiteratura
            : route.params.type == "Открытая наука"
            ?  openScience
            : seriaAntologyMisly
        }
        renderItem={({ item }) => (
          <LitItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => `${item[0]}`}
      />
    </View>
  );
};

export default LitScreen;
