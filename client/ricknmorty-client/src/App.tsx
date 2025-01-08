// In App.js in a new project
import "../global.css";
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';


import HomeScreen from './components/home';
import DetailScreen from './components/details';

const Stack = createNativeStackNavigator();
const LOCAL_IP_ADDRESS = 'yourIPAdrress'

const client = new ApolloClient({
  uri: `http://${LOCAL_IP_ADDRESS}:4000/`,
  cache: new InMemoryCache()
})

function RootStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}