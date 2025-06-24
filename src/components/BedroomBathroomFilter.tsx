import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Filters {
  bedrooms: number;
  bathrooms: number;
}

interface BedroomBathroomFilterProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const BedroomBathroomFilter: React.FC<BedroomBathroomFilterProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [showBedroomPicker, setShowBedroomPicker] = useState(false);
  const [showBathroomPicker, setShowBathroomPicker] = useState(false);

  const bedroomOptions = [1, 2, 3, 4, 5, 6];
  const bathroomOptions = [1, 2, 3, 4, 5];

  const handleBedroomSelect = (bedrooms: number) => {
    onFiltersChange({ ...filters, bedrooms });
    setShowBedroomPicker(false);
  };

  const handleBathroomSelect = (bathrooms: number) => {
    onFiltersChange({ ...filters, bathrooms });
    setShowBathroomPicker(false);
  };

  return (
    <View className="py-4">
      <View className="flex-row gap-4">
        {/* Bedroom Selector */}
        <View className="flex-1">
          <Text className="text-gray-700 font-medium mb-2">Bed Room</Text>
          <TouchableOpacity
            className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center"
            onPress={() => setShowBedroomPicker(!showBedroomPicker)}
          >
            <Text className="text-gray-900">
              {filters.bedrooms} {filters.bedrooms === 1 ? 'Room' : 'Rooms'}
            </Text>
            <Ionicons 
              name={showBedroomPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {/* Bedroom Options Dropdown */}
          {showBedroomPicker && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
              {bedroomOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`px-4 py-3 border-b border-gray-100 ${
                    filters.bedrooms === option ? 'bg-blue-50' : ''
                  }`}
                  onPress={() => handleBedroomSelect(option)}
                >
                  <Text className={`${
                    filters.bedrooms === option ? 'text-blue-600 font-medium' : 'text-gray-900'
                  }`}>
                    {option} {option === 1 ? 'Room' : 'Rooms'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Bathroom Selector */}
        <View className="flex-1">
          <Text className="text-gray-700 font-medium mb-2">Bathrooms</Text>
          <TouchableOpacity
            className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center"
            onPress={() => setShowBathroomPicker(!showBathroomPicker)}
          >
            <Text className="text-gray-900">
              {filters.bathrooms} {filters.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
            </Text>
            <Ionicons 
              name={showBathroomPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {/* Bathroom Options Dropdown */}
          {showBathroomPicker && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
              {bathroomOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`px-4 py-3 border-b border-gray-100 ${
                    filters.bathrooms === option ? 'bg-blue-50' : ''
                  }`}
                  onPress={() => handleBathroomSelect(option)}
                >
                  <Text className={`${
                    filters.bathrooms === option ? 'text-blue-600 font-medium' : 'text-gray-900'
                  }`}>
                    {option} {option === 1 ? 'Bathroom' : 'Bathrooms'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default BedroomBathroomFilter;