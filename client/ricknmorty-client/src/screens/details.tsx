import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Character } from "../types";
import { useApolloClient, useMutation } from "@apollo/client";
import Popup from "../components/popup";
import { getCachedData, updateComment, deleteCard } from "../services/cacheService";
import { ADD_COMMENT, DELETE_CARD } from "../services/queries";

const CharacterDetails = ({ route }:any) => {
  // Apollo hook to query the cache
  const client = useApolloClient();

  // Control variables passed through navigation
  const { id , name, species, gender, status, starred, comments } = route.params;

  // Screen control variables
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [newComments, setComments] = useState("");

  // Perform mutations
  const [addComment, {  }] = useMutation(ADD_COMMENT, {
    onCompleted: (data) => {console.log(data)},
  });
  
  const [deleteCharacter, {  }] = useMutation(DELETE_CARD, {
    onCompleted: (data) => {console.log(data)},
  });


  // Fetch the data if not updatet (comment)
  useEffect(()=>{
    const data = getCachedData(client)
    data.map( (char:Character) => {
      if(char.id === id){
        setComments(char.comments)
      }
    })
  },[])

  // handle comment update on cache data (visualization)
  const handleCreateComment = (comment: any) => {
    setComments(comment);
    addComment({ variables: { "addCommentId": id, "comments": comment } }); 
    updateComment(client,id,comment)
  };
  
  // deletes a card by changing attribute value
  const deleteCardFront = ()=>{
    addComment({ variables: { "deleteCharacterId": id } }); 
    deleteCard(client,id)
  }

  return (
    <View className="flex-1 bg-white px-4 py-6">
      {/* Profile Section */}
      <View className="flex-row items-center mb-6">
        <View className="relative w-20 h-20">
        {/* Background Image */}
        <Image
          source={{ uri: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}}
          className="w-16 h-16 rounded-full"
          style={{ resizeMode: "cover" }}
        />

        {/* Overlay Image */}
        <Image
          source={
            starred
              ? require("../assets/icons/heartFilled.png") // Path to the filled heart image
              : require("../assets/icons/heartEmpty.png") // Path to the outlined heart image
          }
          className="absolute bottom-4 right-4"
          style={{ resizeMode: "contain" }}
        />
      </View>
        
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-black">{name}</Text>
        </View>
      </View>

      {/* Details Section */}
      <View>
        {/* Specie */}
        <View className="border-b border-gray-200 py-4">
          <Text className="text-sm font-bold text-gray-800">Specie</Text>
          <Text className="text-base text-gray-600">{species}</Text>
        </View>

        {/* Status */}
        <View className="border-b border-gray-200 py-4">
          <Text className="text-sm font-bold text-gray-800">Status</Text>
          <Text className="text-base text-gray-600">{status}</Text>
        </View>

        {/* Gender */}
        <View className="border-b border-gray-200 py-4">
          <Text className="text-sm font-bold text-gray-800">Gender</Text>
          <Text className="text-base text-gray-600">{gender}</Text>
        </View>

        {/* Comments */}
        <View className="border-b border-gray-200 py-4 py-4">
          <Text className="text-sm font-bold text-gray-800">Comments</Text>
          <Text className="text-base text-gray-600">{comments === "" ? newComments : comments}</Text>
        </View>

        
        <Popup
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
          onCreateComment={handleCreateComment}
        />
        
      </View>

      {/* Buttons at the Bottom */}
      <View className="absolute bottom-5 self-center h-15 w-full px-4 flex-row justify-between">
        <TouchableOpacity
          onPress={() => setPopupVisible(true)}
          className="bg-green-650 py-3 px-2 mx-1 rounded-lg flex-1"
        >
          <Text className="text-center text-white font-bold">Create comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteCardFront}
          className="bg-purple-750 py-3 px-2 mx-1 rounded-lg flex-1"
        >
          <Text className="text-center text-white font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CharacterDetails;
