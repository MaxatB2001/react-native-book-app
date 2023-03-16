import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import BookScreen from "./screens/BookScreen";
import Tabs from "./navigation/tabs";
import PdfScreen from './screens/PdfScreen';
import GenreScreen from './screens/GenreScreen';
import LinksScreen from './screens/LinksScreen';
import WebViewScreen from './screens/WebViewScreen';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Main'}
            >
                {/* Tabs */}
                <Stack.Screen name="Main" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookScreen" component={BookScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LinksScreen" component={LinksScreen}/>
                <Stack.Screen name="PdfScreen" component={PdfScreen} />
                <Stack.Screen name="GenreScreen" component={GenreScreen} />
                <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;