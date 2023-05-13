import { View, Text} from "react-native"

const AboutScreen = ({ route, navigation }) => {
    return (
        <View style={{flex: 1, backgroundColor: '#270A1F'}}>
            <Text style={{color: "white"}}>
            Версия 1.0.0
            </Text>
        </View>
    )
}

export default AboutScreen