import { Text, View } from "react-native"
import WebView from "react-native-webview"

const WebViewScreen = ({ route, navigation }) => {
  return (
    <WebView renderLoading={() => <Text style={{flex: 1, textAlign: "center"}}>ЗАГРУЗКА........</Text>} startInLoadingState={true} source={{uri: route.params.pageUrl}}/>
  )
}

export default WebViewScreen