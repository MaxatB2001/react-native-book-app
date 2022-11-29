import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from "react-native";
import Pdf from "react-native-pdf";
import { setBookCurrentPageById } from "../api/bookApi";
import { BASE_API_URL } from "../constants/constants";
import {icons, SIZES} from "../constants/index"

const Progress = ({number}) => {
  return <><Text style={{color: "black", fontSize: 60}}>{number}</Text></>
}

const PdfScreen = ({ route, navigation }) => {
  const source = { uri: `${BASE_API_URL}/${route.params.uri}`, cache: true };
  const startPage = route.params.startPage ? route.params.startPage : 1;
  let currentPage = 1;
  const onPress = () => {
    // setBookCurrentPageById(route.params.bookId, currentPage)
    navigation.goBack()
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
        setBookCurrentPageById(route.params.bookId, currentPage)
      });
    return unsubscribe;
  }, [navigation])
  return (
    <View style={styles.container}>
       {/* <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={onPress}
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
          </TouchableOpacity> */}
      <Pdf
        trustAllCerts={false}
        source={source}
        horizontal
        enableAnnotationRendering={true}
        page={startPage}
        enablePaging={true}
        onLoadComplete={(numberOfPages, filePath) => {
          
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          currentPage = page 
          console.log(`Current page: ${currentPage}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PdfScreen;
