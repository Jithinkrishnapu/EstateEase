import { Heart } from "lucide-react-native";
import { SafeAreaView, Text } from "react-native";

export const FavoritesScreen = () => (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Heart size={48} color="#9CA3AF" />
      <Text className="text-xl font-semibold text-gray-900 mt-4">Favorites</Text>
      <Text className="text-gray-500 mt-2">Your saved properties</Text>
    </SafeAreaView>
  );