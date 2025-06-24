import { Search } from "lucide-react-native";
import { SafeAreaView,Text } from "react-native";

export const SearchScreen = () => (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Search size={48} color="#9CA3AF" />
      <Text className="text-xl font-semibold text-gray-900 mt-4">Search</Text>
      <Text className="text-gray-500 mt-2">Find your perfect property</Text>
    </SafeAreaView>
  );