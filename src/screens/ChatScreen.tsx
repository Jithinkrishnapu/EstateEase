import { MessageCircle } from "lucide-react-native";
import { SafeAreaView,Text} from "react-native";

// Placeholder screens for other tabs
export const ChatScreen = () => (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <MessageCircle size={48} color="#9CA3AF" />
      <Text className="text-xl font-semibold text-gray-900 mt-4">Messages</Text>
      <Text className="text-gray-500 mt-2">Your conversations will appear here</Text>
    </SafeAreaView>
  );