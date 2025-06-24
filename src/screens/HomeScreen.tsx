import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FiltersBottomSheet from '~/components/FilterBottomSheet';
import { useState } from 'react';
import { FilterData } from '~/types/types';
import { useNavigation } from '@react-navigation/native';



// Home Screen Component
export const HomeScreen = () => {
  const [showFilters, setShowFilters] = useState(false);
  const navigation = useNavigation<any>()
  const handleApplyFilters = (filters: FilterData) => {
    console.log('Applied filters:', filters);
    // Handle the filter data
  };
  const propertyCategories = ['All', 'Appartments', 'House', 'Villa', 'Hotel'];
  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      type: 'Appartments',
      title: 'Modern 2 Bedroom Apartment In New York.',
      location: 'Downtown, New York',
      price: '$1,200',
      period: 'month',
      beds: 2,
      baths: 2,
      sqft: 1200,
      rating: 4.5,
      isFavorite: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      type: 'Appartments',
      title: 'Modern 2 Bedroom Apartment In New York.',
      location: 'Downtown, New York',
      price: '$1,200',
      period: 'month',
      beds: 2,
      baths: 2,
      sqft: 1200,
      rating: 4.5,
      isFavorite: false
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900">EstateEase</Text>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="w-10 h-10 bg-orange-400 rounded-full items-center justify-center">
              <Text className="text-white font-semibold">JD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <Pressable onPress={() => setShowFilters(true)} className="mx-6 mb-6">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 text-gray-400 flex-1">Search Address, city, zip.</Text>
        </View>
      </Pressable>

      <View className='h-[60px]' >
        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row h-[40px] px-6 gap-2">
            {propertyCategories.map((category, index) => (
              <TouchableOpacity
                key={category}
                className={`px-6 py-3 rounded-full ${index === 0 ? 'bg-lime-400' : 'bg-gray-100'
                  }`}
              >
                <Text className={`font-medium ${index === 0 ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Properties List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {properties.map((property) => (
          <TouchableOpacity onPress={() => navigation.navigate("PropertyDetails")} key={property.id} className="mb-6">
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Property Image */}
              <View className="relative">
                <Image
                  source={{ uri: property.image }}
                  className="w-full h-48 rounded-2xl"
                  resizeMode="cover"
                />
                <View className="absolute top-3 left-3 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Text className="text-sm font-medium text-gray-700">{property.type}</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3">
                  <View className="w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full items-center justify-center">
                    <Ionicons
                      name={property.isFavorite ? "heart" : "heart-outline"}
                      size={18}
                      color={property.isFavorite ? "#EF4444" : "#6B7280"}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center pt-4 px-4 space-x-4">
                <Text className="text-gray-600 text-[12px]">
                  {property.baths} Baths • {property.beds} Beds • {property.sqft} sqft
                </Text>
              </View>
              {/* Property Details */}
              <View className="p-4">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900 mb-1">
                      {property.title}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-gray-900">{property.price}</Text>
                    <Text className="text-gray-500">{property.period}</Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                    <Text className="text-gray-500 text-[11px] ml-1">{property.location}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="font-semibold text-gray-900 mr-1">{property.rating}</Text>
                    <Ionicons name="star" size={16} color="#FCD34D" />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FiltersBottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
        initialFilters={{ city: 'Los Angeles' }}
      />
    </SafeAreaView>
  );
};
