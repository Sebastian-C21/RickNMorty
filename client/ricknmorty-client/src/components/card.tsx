// Card component for the characters display in home screen

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CardProps } from "../types";

const Card: React.FC<CardProps> = ({ id, name, species, gender, status, starred, comments, onToggleStar }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center  p-4 rounded-lg mb-1">
      <TouchableOpacity className="flex-row items-center max-w-96" onPress={() => {
          navigation.navigate('Details', {
            id: id,
            name: name,
            species: species,
            gender: gender,
            status: status,
            starred: starred,
            comments: comments
          });
        }}>
        {/* Character Image */}
        <Image
          source={{ uri: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg` }}
          className="w-12 h-12 rounded-full mr-4"
        />

        {/* Character Details */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-600">{gender}</Text>
        </View>
      </TouchableOpacity>

      {/* Heart Icon */}
      <TouchableOpacity onPress={onToggleStar}>
        <Image
          source={
            starred
              ? require("../assets/icons/heartFilled.png") // Path to the filled heart image
              : require("../assets/icons/heartEmpty.png") // Path to the outlined heart image
          }
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Card;
