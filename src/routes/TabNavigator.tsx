import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { TabIcon } from "~/components/TabIcon";
import { ChatScreen } from "~/screens/ChatScreen";
import { FavoritesScreen } from "~/screens/FavouriteScreen";
import { HomeScreen } from "~/screens/HomeScreen";
import { ProfileScreen } from "~/screens/ProfileScreen";
import { SearchScreen } from "~/screens/SearchScreen";
import { BlurView } from 'expo-blur';
import { View, Platform } from 'react-native';

const Tab = createBottomTabNavigator()

// Custom Tab Bar Background Component
const CustomTabBarBackground = () => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={20}
        tint="dark"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          borderRadius: 35,
          margin: 20,
          marginBottom: 30,
          overflow: 'hidden'
        }}
      />
    );
  }
  
  // Fallback for Android with semi-transparent background
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 35,
        margin: 20,
        marginBottom: 30,
      }}
    />
  );
};

export const TabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'HomeScreen':
                iconName = 'home';
                break;
              case 'Chat':
                iconName = 'chat';
                break;
              case 'Search':
                iconName = 'search';
                break;
              case 'Favorites':
                iconName = 'favorites';
                break;
              case 'Profile':
                iconName = 'profile';
                break;
            }

            return (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.3)' : '#FDFDFD',
                transform: [{ scale: focused ? 1.1 : 1 }],
                shadowColor: focused ? '#000' : 'transparent',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: focused ? 0.15 : 0,
                shadowRadius: 8,
                elevation: focused ? 8 : 0,
              }}>
                <TabIcon
                  name={iconName}
                  color={focused ? '#FFFFFF' : "#17161A"}
                  size={focused ? size + 2 : size}
                  focused={focused}
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          tabBarBackground: () => <CustomTabBarBackground />,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: 'transparent',
            height: 120,
            paddingBottom: 25,
            paddingTop: 15,
            paddingHorizontal: 20,
          },
          tabBarItemStyle: {
            backgroundColor: 'transparent',
            borderRadius: 25,
            marginHorizontal: 5,
            paddingVertical: 18,
          },
          tabBarLabelStyle: {
            fontSize: 0, // Hide labels
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  )
}