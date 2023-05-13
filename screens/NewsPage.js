import { useContext, useEffect, useState } from "react"
import { Text, View, Image, Button } from "react-native"
import { COLORS } from "../constants";
import { BASE_API_URL } from "../constants/constants";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { UserContext } from "../App";

const NewsPageScreen = ({ navigation, route }) => {
    let item = route.params.news
    const [text, setText] = useState("")
    const [feedbacks, setFeedbacks] = useState([])
    const user = useContext(UserContext)
    useEffect(() => {
        fetch(`${BASE_API_URL}/api/news/comment?newsId=${item._id}`).then(data => data.json()).then(data => setFeedbacks(data))
    }, [])

    const send = async () => {
      fetch(`${BASE_API_URL}/api/news/comment`, {
        method: "POST",
        body: JSON.stringify({user: user.user._id, text, newsId: item._id}),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(data => data.json()).then(data => setFeedbacks([...feedbacks, data])).then(data => setText(""))

    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black, position: "relative" }}>
        {/* {feedbacks.length !== 0 && <View style={{padding: 5}}>
            {feedbacks.map(item => 
              <View  style={{padding: 10, backgroundColor: "#270A1F", marginBottom: 10, borderRadius: 15}}>
                <Text style={{color: "white", fontSize: 15}}>
                  {item.user.email}
                </Text>
                <Text style={{color: "white", fontSize: 20 }}>
                {item.text}
              </Text>  
              </View>
            )}
        </View>} */}
        {
          <FlatList
            data={feedbacks}
            style={{marginBottom: 50, padding: 5}}
            renderItem={({ item }) => 
            <View  style={{padding: 10, backgroundColor: "#270A1F", marginBottom: 10, borderRadius: 15}}>
                <Text style={{color: "white", fontSize: 15}}>
                  {item.user.email}
                </Text>
                <Text style={{color: "white", fontSize: 20 }}>
                {item.text}
              </Text>  
              </View>
          }
          keyExtractor={(item) => item._id}
          horizontal={false}
          ListHeaderComponent={
<View style={{ paddingBottom: 10 }}>
        <View
        style={{ padding: 10, borderRadius: 20, backgroundColor: "#270A1F" }}
        >
        <View style={{ display: "flex", flexDirection: "row"}}>
          <Text style={{ color: "white", fontWeight: "800" }}>
            {item.title}
          </Text>
          <Text style={{ color: "white", fontWeight: "800", marginLeft: 5 }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={{ color: "white", fontWeight: "500" }}>{item.text}</Text>
        <Image
          style={{ width: "100%", height: 200, borderRadius: 20, marginTop: 5 }}
          source={{ uri: `${BASE_API_URL}/${item.picture}` }}
        />
      </View>
    </View>
          }
          />
        }
        <View  style={{backgroundColor: "#270A1F", color: "white", position: "absolute", bottom: 0, width: "100%"}}>
        <TextInput value={text} onChangeText={value => setText(value)} style={{color: "white"}}/>
        <Pressable onPress={send} style={{position: "absolute", right: 0, backgroundColor: "blue", height: "100%", padding: 10}}>
          <Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>Отправить</Text>
        </Pressable>
        </View>
    </View>
    )
}

export default NewsPageScreen