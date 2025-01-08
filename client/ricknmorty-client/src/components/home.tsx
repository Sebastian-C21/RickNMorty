import * as React from 'react';
import { View, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import List from '../services/services';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <List/>
      <Text className="text-red-700 text-lg">Hello, NativeWind!</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        Go to Details
      </Button>
    </View>
  );
}