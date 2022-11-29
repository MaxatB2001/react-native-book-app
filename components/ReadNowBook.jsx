import {TouchableOpacity, View, Image, Text} from "react-native"
import { SIZES, icons, COLORS, FONTS } from "../constants";
import { BASE_API_URL } from "../constants/constants";

const ReadNowBook = ({ item, navigation }) => {
    const onPress = () => {
        navigation.navigate("PdfScreen", { uri: item.bookFile, bookId: item._id, startPage: item.currentPage });
    }
    const getProgress = () => {
        return Math.trunc((item.currentPage / item.pages) * 100 )
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
              source={{uri: `${BASE_API_URL}/${item.picture}`}}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 220,
                borderRadius: 3,
              }}
          />

          {/* Book Info */}
          <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{`${getProgress()}%`}</Text>
              <Image
                  source={icons.more_icon}
                  style={{
                      marginLeft: SIZES.radius,
                      width: 15,
                      height: 15,
                      tintColor: COLORS.lightGray
                  }}
              />
          </View>
      </TouchableOpacity>
  )
}

export default ReadNowBook;