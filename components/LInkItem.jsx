import {TouchableOpacity, Image} from "react-native"
import { COLORS } from "../constants";

const LInkItem = ({item, navigation}) => {
  console.log(item.image);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("WebViewScreen", {pageUrl: item.path})} style={{ width: "100%", padding: 10}}>
      <Image style={{ width: "100%", height: 100, borderRadius: 30, marginTop: 5 ,objectFit: "contain" }} source={{uri: item.image}}/> 
    </TouchableOpacity>
  )
}

export default LInkItem