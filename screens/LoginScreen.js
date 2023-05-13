import { View, Text, Image, TextInput, Button } from "react-native"
import { useContext, useState } from "react"
import { icons } from "../constants"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { BASE_API_URL } from "../constants/constants"
import { UserContext } from "../App"

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useContext(UserContext)
    const loginHandler = async () => {
        const data = await fetch(`${BASE_API_URL}/api/user/login`,
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
        <View style={{backgroundColor: "#412227", flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "#4169E1", fontSize: 40, fontWeight: "bold", marginBottom: 30}}>УНИЦ КНИТУ</Text>
            <View style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Image
                  source={icons.knitu_icon}
                  resizeMode="contain"
                  style={{
                    width: 250,
                    height: 250,
                    marginBottom: 60
                  }}
                /> 
                <View style={{width: "80%"}}>
                <TextInput value={email} onChangeText={(value) => setEmail(value)} style={{backgroundColor: "#270A1F", color: "white", borderRadius: 10, width: "100%", marginBottom: 10, padding: 15}} placeholderTextColor={"white"} placeholder="Логин"/>
                <TextInput value={password} onChangeText={(value) => setPassword(value)} style={{backgroundColor: "#270A1F", color: "white", borderRadius: 10, width: "100%",marginBottom: 20, padding: 15
        }} placeholderTextColor={"white"} placeholder="Пароль"/>
        <Button onPress={loginHandler} title="Войти"></Button>
        <Pressable onPress={() => navigation.navigate("RegistrationScreen")}>
        <Text style={{color: "white", fontSize: 20}}>Зарегистрироваться</Text>
        </Pressable>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen