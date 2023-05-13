import { useContext, useEffect, useState } from "react"
import { Text, View, Image, Button } from "react-native"
import { COLORS } from "../constants";
import { BASE_API_URL } from "../constants/constants";
import { TextInput } from "react-native-gesture-handler";
import { UserContext } from "../App";

const FeedbacScreen = ({ navigation, route }) => {
    const [text, setText] = useState("")
    const user = useContext(UserContext)
    const send = async () => {
        const res = await fetch(`${BASE_API_URL}/api/user/feedback`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({user: user.user._id, text}) 
        })
        const respo = await res.json()
        setText("")
    }
    return (  
        <View style={{ flex: 1, backgroundColor: COLORS.black, padding: 10 }}>
            <Text style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center"
            }}>Обратная связь</Text>
            <TextInput
          value={text}
          onChangeText={value => setText(value)}
          style={{borderRadius: 20,
          backgroundColor: "#131313",
          marginTop: 20,
          marginBottom: 20,
          color: "white"}}
                numberOfLines={10}
                multiline
                editable
          />
          <Button onPress={send} title="Отправить"/>
        </View>
    )
}

export default FeedbacScreen