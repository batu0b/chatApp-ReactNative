import React, { useEffect } from "react";

import { Text, View } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { Provider, DefaultTheme } from "react-native-paper";

import ChatList from "./screens/ChatList";
import Settings from "./screens/Settigns";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwObzH7Wgw5NzqH3HZtG9T77ljHZiYix4",
  authDomain: "mobile-app-8e109.firebaseapp.com",
  projectId: "mobile-app-8e109",
  storageBucket: "mobile-app-8e109.appspot.com",
  messagingSenderId: "442331906899",
  appId: "1:442331906899:web:f22137d08b7a853f5c97a6",
  measurementId: "G-Y1DBQ9TJFP",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messages = collection(db, "chats");
export const user = auth.currentUser;

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={
                route.name === "ChatList"
                  ? "chatbubbles-outline"
                  : "settings-outline"
              }
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#001cff",
    secondary: "#001cff",
    tertiary: "#001cff",
    accent: "#000000",
  },
};

function App() {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />

          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
