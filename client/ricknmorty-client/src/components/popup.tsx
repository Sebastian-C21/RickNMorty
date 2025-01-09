import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { PopupProps } from "../types/popup";

const Popup:React.FC<PopupProps> = ({ visible, onClose, onCreateComment }) => {
  const [comment, setComment] = useState("");

  const handleCreateComment = () => {
    if (comment.trim()) {
      onCreateComment(comment); // Pass the comment back to the parent
      setComment(""); // Clear input
      onClose(); // Close the popup
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-4/5 bg-white rounded-lg p-6 shadow-lg">
          <Text className="text-lg font-bold text-gray-800 mb-4">Create Comment</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4"
            placeholder="Write your comment here..."
            value={comment}
            onChangeText={setComment}
          />
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="bg-purple-150 py-2 px-4 rounded-lg flex-1 mr-2"
            >
              <Text className="text-center text-gray-700 font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreateComment}
              className="bg-green-650 py-2 px-4 rounded-lg flex-1 ml-2"
            >
              <Text className="text-center text-white font-bold">Create Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
