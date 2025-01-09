// Search component: separate data visualization and api quering

import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash"; // Already included in your code
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { SEARCH_CHARACTERS } from "../services/queries";
import { SearchBarProp } from "../types/bars";

const SearchBar:React.FC<SearchBarProp> = ({ onSelect, onSelectModal }) => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [fetchCharacters, { called, loading, data }] = useLazyQuery(SEARCH_CHARACTERS, {
      onCompleted: (data) => {
        setSearchResults(data.charactersByName || []);
      },
  });

  // Handle input changes with debouncing
  const handleInputChange = (text: string) => {
    setInputValue(text);
    debouncedSearchChange(text);
  };

  const debouncedSearchChange = debounce((query: string) => {
    if (query.length > 0) {
      console.log(query)
      fetchCharacters({ variables: { "filter": { "name": query  } } }); 
    } else {
      setSearchResults([]); // Clear results if input is too short
    }
  }, 150);

  // Handle item selection
  const handleSelect = (character: any) => {
    console.log('data from searchbar',character)
    setInputValue(""); // Clear search bar
    setSearchResults([]); // Clear dropdown
    onSelect(character); // Pass selected character to parent
  };

  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg p-2 mb-4 h-searchBar mb-8 mt-5 relative">
      {/* Search Icon */}
      <Ionicons name="search" size={20} color="#B0B0B0" className="mr-2" />
      <TextInput
        className="flex-1 text-lg text-gray-700 h-searchBar"
        placeholder="Search or filter results"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity className="ml-2" onPress={() => onSelectModal(true)}>
        <Image source={require("../assets/icons/Icon.png")} />
      </TouchableOpacity>

      {/* Dropdown for search results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-2 border-b border-gray-200"
              onPress={() => handleSelect(item)}
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <Text className="text-gray-700">{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-lg max-h-40 z-10"
        />
      )}
    </View>
  );
};

export default SearchBar;
