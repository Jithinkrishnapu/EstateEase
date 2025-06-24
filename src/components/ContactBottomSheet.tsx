import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  propertyTitle?: string;
  location?: string;
  price?: string;
  propertyDetails?: string;
}

export const ContactBottomSheet: React.FC<ContactBottomSheetProps> = ({
  visible,
  onClose,
  propertyTitle = "Modern 2 Bedroom Apartment In New York.",
  location = "Downtown, New York",
  price = "$1,200",
  propertyDetails = "2 Baths, • 2 Beds, • 1200 sqft"
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 20;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          closeBottomSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible]);

  const closeBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: BOTTOM_SHEET_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleSendInquiry = () => {
    // Handle form submission here
    console.log('Form data:', formData);
    // You can add validation and API call here
    closeBottomSheet();
  };

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeBottomSheet}
    >
      <View className="flex-1 bg-black/50">
        <TouchableOpacity 
          className="flex-1" 
          activeOpacity={1} 
          onPress={closeBottomSheet}
        />
        
        <Animated.View
          style={{
            transform: [{ translateY }],
            height: BOTTOM_SHEET_HEIGHT,
          }}
          className="bg-white rounded-t-3xl"
          {...panResponder.panHandlers}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >

            {/* Header */}
            <View className="flex-row items-center px-6 mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Contact Agent
              </Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {/* Property Info */}
              <View className="px-6 mb-6">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="location-outline" size={14} color="#666" />
                      <Text className="text-[12px] text-gray-600 ml-1">{location}</Text>
                    </View>
                    <Text className="text-[25px] font-bold text-gray-900 mb-1">
                      {propertyTitle}
                    </Text>
                    <Text className="text-[11px] text-gray-600">{propertyDetails}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xl font-medium text-gray-900">{price}</Text>
                    <Text className="text-[10px] text-gray-600">month</Text>
                  </View>
                </View>
              </View>

              {/* Form */}
              <View className="px-6">
                {/* Name Fields */}
                <View className="flex-row mb-4 gap-3">
                  <View className="flex-1">
                    <TextInput
                      className={` rounded-xl px-4 py-4 text-gray-900 text-base border ${focusedField === 'firstName' ? 'border-black' : 'border-gray-300'}`}
                      placeholder="First Name"
                      placeholderTextColor="#9CA3AF"
                      value={formData.firstName}
                      onChangeText={(text) => updateFormData('firstName', text)}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className={` rounded-xl px-4 py-4 text-gray-900 text-base border ${focusedField === 'lastName' ? 'border-black' : 'border-gray-300'}`}
                      placeholder="Last Name"
                      placeholderTextColor="#9CA3AF"
                      value={formData.lastName}
                      onChangeText={(text) => updateFormData('lastName', text)}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>

                {/* Phone */}
                <TextInput
                  className={` rounded-xl px-4 py-4 text-gray-900 text-base mb-4 border ${focusedField === 'phone' ? 'border-black' : 'border-gray-300'}`}
                  placeholder="Your Phone Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => updateFormData('phone', text)}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />

                {/* Email */}
                <TextInput
                  className={` rounded-xl px-4 py-4 text-gray-900 text-base mb-4 border ${focusedField === 'email' ? 'border-black' : 'border-gray-300'}`}
                  placeholder="Your Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData('email', text)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />

                {/* Message */}
                <TextInput
                  className={` rounded-xl px-4 py-4 text-gray-900 text-base mb-6 border ${focusedField === 'message' ? 'border-black' : 'border-gray-300'}`}
                  placeholder="Message"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={formData.message}
                  onChangeText={(text) => updateFormData('message', text)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{ height: 120 }}
                />

                {/* Send Button */}
                <TouchableOpacity
                  className="bg-lime-400 rounded-2xl py-4 items-center mb-8"
                  onPress={handleSendInquiry}
                  activeOpacity={0.8}
                >
                  <Text className="text-gray-900 font-semibold text-lg">
                    Send Inquiry
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};