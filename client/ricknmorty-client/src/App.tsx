// In App.js in a new project
import "../global.css";
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { SafeAreaView } from "react-native-safe-area-context";
import SessionStorage from "react-native-session-storage";

import HomeScreen from './screens/home';
import DetailScreen from './screens/details';

const Stack = createNativeStackNavigator();
const LOCAL_IP_ADDRESS = '192.168.1.4' //Emulating: android studio

export const client = new ApolloClient({
  uri: `http://${LOCAL_IP_ADDRESS}:4000/`,
  cache: new InMemoryCache()
})

function RootStack() { 
  SessionStorage.setItem('characters',new Array())
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'Rick and Morty List',
        headerShadowVisible: false,
        headerShown:false}}/>
      <Stack.Screen name="Details" component={DetailScreen} options={{
        title: '',
        headerShadowVisible: false,}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView className="flex-1 mt-16">
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaView>
  );
}