import React, { useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import BookScreen from "./screens/BookScreen";
import Tabs from "./navigation/tabs";
import PdfScreen from './screens/PdfScreen';
import GenreScreen from './screens/GenreScreen';
import LinksScreen from './screens/LinksScreen';
import WebViewScreen from './screens/WebViewScreen';
import AboutScreen from './screens/AboutScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import NewsPageScreen from './screens/NewsPage';
import FeedbacScreen from './screens/FeedbackScreen';


import {useState, createContext} from "react"

export let UserContext;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    UserContext = createContext(null)

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    const isAuth = false
    return (
        <UserContext.Provider value={{user, setUser}}>
                  <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={user ? 'Main' : "LoginScreen"}
            >
                {/* Tabs */}
                <Stack.Screen name="Main" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookScreen" component={BookScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LinksScreen" component={LinksScreen}/>
                <Stack.Screen name="PdfScreen" component={PdfScreen} />
                <Stack.Screen name="GenreScreen" component={GenreScreen} />
                <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
                <Stack.Screen name="AboutScreen" component={AboutScreen}/>
                <Stack.Screen name='RegistrationScreen' component={RegistrationScreen}/>
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name="NewsScreen" component={NewsPageScreen}/>
                <Stack.Screen name="FeedbackScreen" component={FeedbacScreen}/>
            </Stack.Navigator>
        </NavigationContainer>    
        </UserContext.Provider>
    )
}

export default App;