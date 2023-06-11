import { View, Text, Image, TextInput, Button, ImageBackground } from "react-native"
import { icons, images } from "../constants"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { useContext, useState } from "react"
import { UserContext } from "../App"
import { BASE_API_URL } from "../constants/constants"

const RegistrationScreen = ({ navigation, route }) => {

    const user = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const regHandler = async () => {
        const data = await fetch(`${BASE_API_URL}/api/user/register`,
         {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const dataUser = await data.json()
        user.setUser(dataUser)
        navigation.navigate("Main")
    }
    
    return(
        <View style={{ flex: 1}}>
             <ImageBackground style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}} resizeMode="cover" source={images.knitu_bg}>
             <View style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <View style={{width: "80%"}}>
                <TextInput value={email} onChangeText={(value) => setEmail(value)} style={{backgroundColor: "#270A1F", color: "white", borderRadius: 10, width: "100%", marginBottom: 10, padding: 15}} placeholderTextColor={"white"} placeholder="Логин"/>
                <TextInput value={password} onChangeText={(value) => setPassword(value)} style={{backgroundColor: "#270A1F", color: "white", borderRadius: 10, width: "100%",marginBottom: 20, padding: 15
        }} placeholderTextColor={"white"} placeholder="Пароль"/>
        <Button onPress={regHandler} title="Зарегистрироваться"></Button>
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={{color: "white", fontSize: 20}}>Есть аккаунт ? Войти</Text>
        </Pressable>
                </View>
            </View>
             </ImageBackground>
        </View>
    )
}

export default RegistrationScreen