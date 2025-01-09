// Filter component: Decide if filter result persists

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FilterBarProp } from "../types/bars";

const FilterBar: React.FC<FilterBarProp> = ({characters, filterCount, onGoBack,onAccepFilter}) => {
 
    const confirmFilter = () =>{
        onAccepFilter(true)
    }
    const exitFilter  = () =>{
        onGoBack(true)
    }
    return (
        <View className="bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200">
            <TouchableOpacity onPress={exitFilter}>
            <Text className="text-purple-500 font-bold text-xl">←</Text>
            </TouchableOpacity>
            <Text className="text-gray-800 font-semibold">Advanced search</Text>
            <TouchableOpacity onPress={confirmFilter}>
            <Text className="text-purple-500 font-bold">Done</Text>
            </TouchableOpacity>
        </View>

        {/* Results and Filters */}
        <View className="flex-row justify-between items-center px-5 py-3">
            <TouchableOpacity>
            <Text className="text-blue-500 font-bold">{characters.length} Results</Text>
            </TouchableOpacity>
            <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600 font-bold text-sm">{filterCount} Filter</Text>
            </View>
        </View>

        {/* Separator */}
        <View className="h-px bg-gray-200"></View>
        </View>
    );
};

export default FilterBar;