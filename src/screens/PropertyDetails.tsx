import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ContactBottomSheet } from '~/components/ContactBottomSheet';

interface PropertyDetailsProps {
    navigation?: any; // Replace with proper navigation type if using React Navigation
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ navigation }) => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView className="flex-1 relative" showsVerticalScrollIndicator={false}>
                <View className="top-2 left-5 z-10 absolute">
                    <TouchableOpacity
                        onPress={() => navigation?.goBack()}
                        className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
                    >
                        <Ionicons name="chevron-back" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                {/* Property Image */}
                <View className="mb-4 h-1/2">
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                <View className='flex-1 bg-white top-[-25] rounded-t-2xl' >

                    {/* Handle bar */}
                    <View className="items-center py-5">
                        <View className="w-[100px] h-1 bg-gray-300 rounded-full" />
                    </View>

                    {/* Location and Rating */}
                    <View className="flex-row items-center justify-between px-4 mb-2">
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={16} color="#666" />
                            <Text className="text-gray-600 ml-1">Downtown, New York</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-lg font-bold text-gray-800 mr-1">4.5</Text>
                            <Ionicons name="star" size={16} color="#FFD700" />
                        </View>
                    </View>

                    {/* Title */}
                    <View className="px-4 mb-3">
                        <Text className="text-2xl font-bold text-gray-900 leading-7">
                            Modern 2 Bedroom{'\n'}Apartment In New York.
                        </Text>
                    </View>

                    {/* Property Stats */}
                    <View className="flex-row items-center px-4 mb-6">
                        <Text className="text-gray-600 mr-4">2 Baths</Text>
                        <View className="w-1 h-1 bg-gray-400 rounded-full mr-4" />
                        <Text className="text-gray-600 mr-4">2 Beds</Text>
                        <View className="w-1 h-1 bg-gray-400 rounded-full mr-4" />
                        <Text className="text-gray-600">1200 sqft</Text>
                    </View>

                    {/* Tab Navigation */}
                    <View className=" flex-row px-4 gap-3 mb-6">
                        <TouchableOpacity className="bg-lime-400 px-6 py-2 rounded-full mr-3">
                            <Text className="text-gray-800 font-medium">Overview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="px-6 py-2 rounded-full bg-gray-200">
                            <Text className="text-gray-500 font-medium">Features</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="px-6 py-2 rounded-full bg-gray-200">
                            <Text className="text-gray-500 font-medium">Reviews</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="px-6 py-2 rounded-full bg-gray-200">
                            <Text className="text-gray-500 font-medium">Direction</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Property Details Section */}
                    <View className="px-4 mb-8">
                        <Text className="text-xl font-bold text-gray-900 mb-4">Property Details</Text>
                        <Text className="text-gray-600 leading-6 text-base">
                            A beautiful and spacious apartment located in the heart of downtown New York. This modern apartment offers an open floor plan, updated kitchen, and stunning city views. Perfect for professionals and families alike, it features hardwood floors, high ceilings, and abundant natural light. With easy access to public transportation, shopping, and dining, this apartment provides the ideal blend of comfort and convenience.
                        </Text>
                    </View>

                    {/* Add some bottom padding for the fixed bottom section */}
                    <View className="h-24" />
                </View>
            </ScrollView>

            {/* Bottom Fixed Section */}
            <View className="absolute bottom-10 left-5 right-5 bg-black rounded-3xl px-6 py-4">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-400 text-sm">Rent</Text>
                        <View className="flex-row items-baseline">
                            <Text className="text-white text-2xl font-bold">$1,200</Text>
                            <Text className="text-gray-400 text-base ml-1">/Month</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setShowBottomSheet(true)} className="bg-lime-400 px-8 py-3 rounded-xl flex-row items-center">
                        <Ionicons name="call" size={20} color="#000" className="mr-2" />
                        <Text className="text-black font-semibold text-base ml-2">Contact Agent</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ContactBottomSheet
                visible={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
            />
        </SafeAreaView>
    );
};

export default PropertyDetails;