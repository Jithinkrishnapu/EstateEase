import { Heart, Home, HomeIcon, MessageCircle, Search, User } from "lucide-react-native";
import { View } from "react-native";

export const TabIcon = ({ name, color, size, focused }: {
    name: string;
    color: string;
    size: number;
    focused: boolean;
  }) => {
    const iconMap: { [key: string]: any } = {
      home:  HomeIcon,
      chat:  MessageCircle,
      search: Search,
      favorites: Heart,
      profile: User,
    };
  const Icon = iconMap[name]
    return (
      <View className={`items-center justify-center w-12 h-12 rounded-full ${
        focused ? 'bg-lime-400' : 'bg-transparent'
      }`}>
        <Icon
          size={size} 
          color={focused ? '#000' : color} 
        />
      </View>
    );
  };