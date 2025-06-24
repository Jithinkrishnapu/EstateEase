import { User } from "lucide-react-native";
import { SafeAreaView,Text } from "react-native";

export const ProfileScreen = () => (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <User size={48} color="#9CA3AF" />
      <Text className="text-xl font-semibold text-gray-900 mt-4">Profile</Text>
      <Text className="text-gray-500 mt-2">Manage your account</Text>
    </SafeAreaView>
  );