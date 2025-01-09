import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Button, Modal, TouchableHighlight } from "react-native";
import Card from "../components/card";
import SearchBar from "../components/searchBar";
import FilterBar from "../components/fliterBar";

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Character } from "../types";
import { getCachedData, updateStarred, addCharacterToCache} from "../services/cacheService";
import { STAR_CHARACTER } from "../services/queries";


const HomeScreen = () => {
  // Apollo hook to query the cache
  const client = useApolloClient()

  // Control Variables
  const [modalVisible, setModalVisible] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  
  const [selectedCharacter, setSelectedCharacter] = useState("All");
  const [selectedSpecie, setSelectedSpecie] = useState("All");
  const [selectedSort, setSelectedSort] = useState("None");

  const [filterCount, setFilterCount] = useState(0)

  const [showFilterBar, setShowFilterBar] = useState(false);

  // Perform mutations
  const [performStarring, { called, loading, data }] = useMutation(STAR_CHARACTER, {
        onCompleted: (data) => {console.log(data)},
    });

  // fetch current data stored with apollo client cache
  useEffect(() => {
    setCharacters(getCachedData(client))
    console.log(getCachedData(client))
  }, []);
  const availableCharacters = characters?.filter((char)=> !char.deleted)

  // Split characters into starred and non-starred groups
  const starredCharacters = availableCharacters?.filter((char) => char.starred);
  const nonStarredCharacters = availableCharacters?.filter((char) => !char.starred);

  const toggleStar = (id:number,starred:boolean) => {
    performStarring({ variables: { "starCharacterId": !starred } }); 
    updateStarred(client,id,!starred)
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === id ? { ...char, starred: !char.starred } : char
      )
    );
  };
  
  // Add data for visualization
  const handleSearchChange = (query:Character) => {
    addCharacterToCache(client,query)
    setCharacters(getCachedData(client))
  };

  // Handle filter 
  const handleGetBack = () => {
    console.log('extit filter')
    setSelectedCharacter("All")
    setSelectedSpecie("All")
    setSelectedSort("None")
    setFilterCount(0)
    setCharacters(getCachedData(client))
    setShowFilterBar(false)
  };
  const handleAcceptFilter = () => {
    console.log('accept filter')
    setSelectedCharacter("All")
    setSelectedSpecie("All")
    setSelectedSort("None")
    setFilterCount(0)
    setShowFilterBar(false)
  };
  
  // Starts filter to later accept or decline result
  const setFilters = () =>{
    setCharacters(getCachedData(client))
    
    if(selectedCharacter === "Starred"){
      const filtered = characters.filter((characters)=>characters.starred === true)
      setCharacters(filtered)
      setFilterCount((prevCount) => prevCount + 1);
    }else if(selectedCharacter === "Others"){
      const filtered = characters.filter((characters)=>characters.starred === false)
      setCharacters(filtered)
      setFilterCount((prevCount) => prevCount + 1);
    }
    
    if(selectedSpecie != "All"){
      const filtered = characters.filter((characters)=>characters.species == selectedSpecie)
      setCharacters(filtered)
      setFilterCount((prevCount) => prevCount + 1);
    }

    if(selectedSort === "A-Z"){
      const sortAZ = [...characters].sort((a, b) => a.name.localeCompare(b.name));
      setCharacters(sortAZ)
      setFilterCount((prevCount) => prevCount + 1);
    }else if(selectedSort === "Z-A"){
      const sortZA = [...characters].sort((a, b) => b.name.localeCompare(a.name));
      setCharacters(sortZA)
      setFilterCount((prevCount) => prevCount + 1);
    }
    setModalVisible(false)
    setShowFilterBar(true)
  }

  // visualization item
  const ShortGrayLine = () => {
    return (
      <View className="h-[1px] bg-gray-200" />
    );
  };

  return (
    <View className="flex-1 bg-white p-4">    
      {/* Search Bar */}
      {!showFilterBar && (
        <>
          <Text className="text-3xl font-bold mb-2.5 font-sans">
            Rick and Morty list
          </Text>
          <SearchBar onSelect={handleSearchChange} onSelectModal={setModalVisible}/>
        </>
      )}
      {showFilterBar && (
        <FilterBar onAccepFilter={handleAcceptFilter} onGoBack={handleGetBack} characters={characters} filterCount={filterCount}/>
      )}

      {/* Starred Characters */}
      {starredCharacters.length > 0 && (
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-500 mb-2">
            STARRED CHARACTERS ({starredCharacters.length})
          </Text>
          <FlatList
            data={starredCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <ShortGrayLine/>
                <Card
                  id={item.id}
                  name={item.name}
                  species={item.species}
                  gender={item.gender}
                  status={item.status}
                  starred={item.starred}
                  comments={item.comments}
                  onToggleStar={() => toggleStar(item.id,item.starred)}
                />
              </View>
            )}
          />
        </View>
      )}

      {/* Non-Starred Characters */}
      {nonStarredCharacters.length > 0 && (
        <View>
          <Text className="text-md font-semibold text-gray-500 mb-2">
            CHARACTERS ({nonStarredCharacters.length})
          </Text>
          <FlatList
            data={nonStarredCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <ShortGrayLine/>
                <Card
                  id={item.id}
                  name={item.name}
                  species={item.species}
                  gender={item.gender}
                  status={item.status}
                  starred={item.starred}
                  comments={item.comments}
                  onToggleStar={() => toggleStar(item.id,item.starred)}
                />
              </View>
            )}
          />
        </View>
      )}

      {/* Modal Component */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal Content */}
        <View className="flex-1 justify-end bg-black/80 h-full">
          <View className="bg-white rounded-t-lg p-6 h-5/6">
            {/* Header */}
            <View className="flex-1">

              <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-puple-750 text-xl font-bold">←</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold mr-12">Filters</Text>
                <View />
              </View>

              {/* Filters */}
              <View className="w-full">
                {/* Characters Filter */}
                <Text className="text-gray-800 font-semibold mb-3">
                  Characters
                </Text>
                <View className="flex-row space-x-4 mb-5 justify-evenly">
                  <TouchableOpacity onPress={() => setSelectedCharacter("All")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedCharacter === "All" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedCharacter === "Starred" ? "text-purple-500 font-bold" : "text-gray-700"}`}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedCharacter("Starred")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedCharacter === "Starred" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedCharacter === "Starred" ? "text-purple-500 font-bold" : "text-gray-700"}`}>Starred</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedCharacter("Others")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedCharacter === "Others" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedCharacter === "Others" ? "text-purple-500 font-bold" : "text-gray-700"}`}>Others</Text>
                  </TouchableOpacity>
                </View>

                {/* Species Filter */}
                <Text className="text-gray-800 font-semibold mb-3">Specie</Text>
                <View className="flex-row space-x-4 w-full justify-evenly">
                  <TouchableOpacity onPress={() => setSelectedSpecie("All")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSpecie === "All" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSpecie === "All" ? "text-purple-500 font-bold" : "text-gray-700"}`}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedSpecie("Human")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSpecie === "Human" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSpecie === "Human" ? "text-purple-500 font-bold" : "text-gray-700"}`}>Human</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedSpecie("Alien")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSpecie === "Alien" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSpecie === "Alien" ? "text-purple-500 font-bold" : "text-gray-700"}`}>Alien</Text>
                  </TouchableOpacity>
                </View>

                {/* Species Filter */}
                <Text className="text-gray-800 font-semibold mb-3">Sort by name</Text>
                <View className="flex-row space-x-3 justify-evenly">
                  <TouchableOpacity onPress={() => setSelectedSort("None")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSort === "None" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSort === "None" ? "text-purple-500 font-bold" : "text-gray-700"}`}>None</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedSort("A-Z")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSort === "A-Z" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSort === "A-Z" ? "text-purple-500 font-bold" : "text-gray-700"}`}>A-Z</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedSort("Z-A")} className={`py-2 flex-1 rounded-lg mr-2 ${selectedSort === "Z-A" ? "bg-purple-100" : "bg-white border border-gray-300" }`}>
                    <Text className={`text-center ${selectedSort === "Z-A" ? "text-purple-500 font-bold" : "text-gray-700"}`}>Z-A</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Filter Button */}
            <View className="absolute bottom-5 self-center h-15 w-full px-4 flex-row justify-center">
              <TouchableHighlight
                  onPress={() => setFilters()}
                  className={`py-3 rounded-lg w-full self-center bg-gray-200`}
                  activeOpacity={0.6}
                  underlayColor="#5A3696">
                <Text className="text-center text-gray-100 font-bold">
                  Apply Filters
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
