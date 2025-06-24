import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterData } from '~/types/types';
import RangeSlider, { PriceRangeSlider } from './RangeSlider';
import BedroomBathroomFilter from './BedroomBathroomFilter';

interface FiltersBottomSheetProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterData) => void;
    initialFilters?: Partial<FilterData>;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FiltersBottomSheet({
    visible,
    onClose,
    onApply,
    initialFilters = {},
}: FiltersBottomSheetProps) {
    const [filters, setFilters] = useState<FilterData>({
        saleType: 'For Rent',
        city: 'New York',
        country: 'United States',
        category: 'Apartments',
        priceRange: [250, 1000],
        bedrooms: 3,
        bathrooms: 2,
        facilities: ['Parking'],
        ...initialFilters,
    });

    const saleTypes = ['For Sale', 'For Rent', 'For Buy'] as const;
    const categories = ['Apartments', 'House', 'All', 'Hotel', 'Penthouse', 'Land', 'Villa'];
    const facilities = ['Parking', 'Kitchen', 'Free Wifi', 'Garden', 'Pool'];

    const updateFilter = (key: keyof FilterData, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const toggleFacility = (facility: string) => {
        setFilters(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility],
        }));
    };

    const handlePriceChange = (newRange: [number, number]) => {
        updateFilter('priceRange', newRange);
    };

    const clearAll = () => {
        setFilters({
            saleType: 'For Rent',
            city: '',
            country: '',
            category: 'All',
            priceRange: [0, 2000],
            bedrooms: 1,
            bathrooms: 1,
            facilities: [],
        });
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50">
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View
                    className="bg-white rounded-t-3xl"
                    style={{ height: SCREEN_HEIGHT * 0.9 }}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-center p-6 border-b border-gray-100">
                        <Text className="text-xl font-semibold text-gray-900">Filters</Text>
                        <TouchableOpacity onPress={clearAll}>
                            <Text className="text-gray-500">Clear All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                        {/* Sale Type */}
                        <View className="py-4">
                            <View className="flex-row gap-3 rounded-full p-1">
                                {saleTypes.map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        className={`flex-1 py-3 rounded-full ${filters.saleType === type ? 'bg-black' : 'bg-[#CFD2D94D]'
                                            }`}
                                        onPress={() => updateFilter('saleType', type)}
                                    >
                                        <Text
                                            className={`text-center font-medium ${filters.saleType === type ? 'text-white' : 'text-gray-600'
                                                }`}
                                        >
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Location */}
                        <View className="py-4">
                            <View className="flex-row gap-3">
                                <View className="flex-1">
                                    <Text className="text-gray-700 font-medium mb-2">City</Text>
                                    <TextInput
                                        className={`border rounded-lg p-4 text-gray-900  ${focusedField === 'city' ? 'border-black' : 'border-gray-200'}`}
                                        value={filters.city}
                                        onChangeText={(text) => updateFilter('city', text)}
                                        placeholder="Enter city"
                                        onFocus={() => setFocusedField('city')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-700 font-medium mb-2">Country</Text>
                                    <TextInput
                                        className={`border rounded-lg p-4 text-gray-900  ${focusedField === 'country' ? 'border-black' : 'border-gray-200'}`}
                                        value={filters.country}
                                        onChangeText={(text) => updateFilter('country', text)}
                                        placeholder="Enter country"
                                        onFocus={() => setFocusedField('country')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Category */}
                        <View className="py-4">
                            <Text className="text-gray-700 font-medium mb-3">Select Category</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {categories.map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        className={`px-4 py-2 rounded-full border ${filters.category === category
                                            ? 'bg-black border-black'
                                            : 'bg-gray-100 border-gray-200'
                                            }`}
                                        onPress={() => updateFilter('category', category)}
                                    >
                                        <Text
                                            className={`font-medium ${filters.category === category ? 'text-white' : 'text-gray-600'
                                                }`}
                                        >
                                            {category}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Price Range */}
                        <View className="py-4">
                            <Text className="text-gray-700 font-medium mb-3">Price Range</Text>
                            <RangeSlider
                                min={0}
                                max={2000}
                                initialMin={filters.priceRange[0]}
                                initialMax={filters.priceRange[1]}
                                step={25}
                                onValueChange={handlePriceChange}
                                trackColor="#e5e7eb"
                                activeTrackColor="#a3e635"
                                thumbColor="#000000"
                                labelColor="#ffffff"
                                labelBackgroundColor="#000000"
                            />
                        </View>

                        {/* Bedrooms and Bathrooms
                        <View className="py-4">
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-gray-700 font-medium mb-2">Bed Room</Text>
                                    <View className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center">
                                        <Text className="text-gray-900">{filters.bedrooms} Rooms</Text>
                                        <Ionicons name="chevron-down" size={20} color="#666" />
                                    </View>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-700 font-medium mb-2">Bathrooms</Text>
                                    <View className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center">
                                        <Text className="text-gray-900">{filters.bathrooms} Bathrooms</Text>
                                        <Ionicons name="chevron-down" size={20} color="#666" />
                                    </View>
                                </View>
                            </View>
                        </View> */}

                        <BedroomBathroomFilter
                            filters={filters}
                            onFiltersChange={updated => setFilters(prev => ({ ...prev, ...updated }))}
                        />

                        {/* Facilities */}
                        <View className="py-4 pb-6">
                            <Text className="text-gray-700 font-medium mb-3">Facility Place</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {facilities.map((facility) => (
                                    <TouchableOpacity
                                        key={facility}
                                        className={`px-4 py-2 rounded-full ${filters.facilities.includes(facility)
                                            ? 'bg-black'
                                            : 'bg-gray-100'
                                            }`}
                                        onPress={() => toggleFacility(facility)}
                                    >
                                        <Text
                                            className={`font-medium ${filters.facilities.includes(facility) ? 'text-white' : 'text-gray-600'
                                                }`}
                                        >
                                            {facility}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Apply Button */}
                    <View className="p-6 pt-4 border-t border-gray-100">
                        <TouchableOpacity
                            className="bg-lime-400 rounded-2xl py-4"
                            onPress={handleApply}
                        >
                            <Text className="text-center text-black font-semibold text-lg">
                                Apply Filters
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}