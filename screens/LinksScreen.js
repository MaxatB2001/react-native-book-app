import {View, FlatList, Text} from "react-native"
import LInkItem from "../components/LInkItem";
import { COLORS } from "../constants";

const LinksScreen = ({ navigation, route }) => {
  const links = [
    {
      path: "https://vk.com/unitsknitu",
      image: "http://www.kstu.ru/servlet/contentblob?id=369560",
    },
    {
      path: "http://www.kstu.ru/article.jsp?id=1821&id_e=105115",
      image: "https://www.kstu.ru/servlet/contentblob?id=378555",
    },
    {
      path: "http://www.kstu.ru/article.jsp?id=1821&id_e=134755",
      image: "https://www.kstu.ru/servlet/contentblob?id=428906",
    },
    {
      path: "http://ruslan.kstu.ru/",
      image: "http://www.kstu.ru/servlet/contentblob?id=369895",
    },
    {
      path: "https://urait.ru/",
      image: "http://www.kstu.ru/servlet/contentblob?id=369993",
    },
    {
      path: "https://znanium.com/",
      image: "http://www.kstu.ru/servlet/contentblob?id=369994"
    },
    {
      path: "https://www.iprbookshop.ru/",
      image: "https://www.kstu.ru/servlet/contentblob?id=390837"
    },
    {
      path: "https://e.lanbook.com/",
      image: "https://www.kstu.ru/servlet/contentblob?id=370020"
    },
    {
      path: "http://www.kstu.ru/article.jsp?id=1821&id_e=113513",
      image: "http://www.kstu.ru/servlet/contentblob?id=334675"
    },
    {
      path: "http://www.kstu.ru/article.jsp?id=1821&id_e=122174",
      image: "http://www.kstu.ru/servlet/contentblob?pre=365930"
    }
  ];
  return (
    <View style={{backgroundColor: COLORS.black, flex: 1}}>
      <FlatList
        data={links}
        renderItem={({ item }) => <LInkItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.path}
        ListFooterComponent={<View>
          
        </View>}
      />
    </View>
  );
};

export default LinksScreen;
