import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { getBook } from "../api/bookApi";
import { COLORS, icons, SIZES, FONTS } from "../constants";
import { BASE_API_URL } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookScreen = ({ route, navigation }) => {
  const [book, setBook] = useState(null);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

  const indicator = new Animated.Value(0);

  useEffect(() => {
    getBook(route.params.bookId)
      .then((data) => setBook(data))
      .catch((e) => console.log(e.message));
  }, []);

  const onPress = async () => {
    const library = await AsyncStorage.getItem("library");
    if (!library) {
      book.currentPage = 1
      AsyncStorage.setItem("library", JSON.stringify([book]));
    } else {
      const jsonLibrary = JSON.parse(library);
      let isExist = false;
      for (const element of jsonLibrary) {
        if (element._id == book._id) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        book.currentPage = 1
        AsyncStorage.setItem(
          "library",
          JSON.stringify([...jsonLibrary, book])
        );
      }
    }
    navigation.navigate("PdfScreen", { uri: book.bookFile, bookId: book._id });
  };

  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 5 }}>
        <View
          style={{
            flex: 1,
            borderLeftColor: COLORS.lightGray2,
            borderLeftWidth: 1,
          }}
        ></View>
      </View>
    );
  };

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: `${BASE_API_URL}/${book.picture}` }}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />

        {/* Color Overlay */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(119,77,143,0.9)",
          }}
        ></View>

        {/* Navigation header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: "#FFF",
              }}
            />
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ ...FONTS.h3, color: "#FFF" }}>О книге</Text>
          </View>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={() => console.log("Click More")}
          >
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
                alignSelf: "flex-end",
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Book Cover */}
        <View
          style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: "center" }}
        >
          <Image
            source={{ uri: `${BASE_API_URL}/${book.picture}` }}
            resizeMode="contain"
            style={{
              flex: 1,
              width: 150,
              height: "auto",
            }}
          />
        </View>

        {/* Book Name and Author */}
        <View
          style={{ flex: 1.8, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>{book.name}</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>
            {book.author.name}
          </Text>
        </View>

        {/* Book Info */}
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            margin: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {/* Rating */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>2</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.white }}>Рейтинг</Text>
          </View>

          <LineDivider />

          {/* Pages */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.radius,
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              {book.pages}
            </Text>
            <Text style={{ ...FONTS.body4, color: COLORS.white }}>Объём</Text>
          </View>

          <LineDivider />

          {/* Language */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>rus</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.white }}>Язык</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;

    return (
      <View style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}>
        {/* Custom Scrollbar */}
        <View
          style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}
        >
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
        </View>

        {/* Description */}
        <ScrollView
          contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height },
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              marginBottom: SIZES.padding,
            }}
          >
            Описание
          </Text>
          <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>
            Jude never thought she’d be leaving her beloved older brother and
            father behind, all the way across the ocean in Syria. But when
            things in her hometown start becoming volatile, Jude and her mother
            are sent to live in Cincinnati with relatives. At first, everything
            in America seems too fast and too loud. The American movies that
            Jude has always loved haven’t quite prepared her for starting school
            in the US—and her new label of 'Middle Eastern,' an identity she’s
            never known before. But this life also brings unexpected
            surprises—there are new friends, a whole new family, and a school
            musical that Jude might just try out for. Maybe America, too, is a
            place where Jude can be seen as she really is.
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Start Reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onPress}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Читать</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book == null) return null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>
      <View style={{ flex: 2 }}>{renderBookDescription()}</View>
      <View style={{ height: 70, marginBottom: 30 }}>
        {renderBottomButton()}
      </View>
    </View>
  );
};

export default BookScreen;
