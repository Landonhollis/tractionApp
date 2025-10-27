import { View, Text } from 'react-native';
import { useAccount } from '../providers/AccountProvider';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated, themeLoading } = useAccount();

  // Show loading state while checking authentication
  if (themeLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-lg text-gray-600 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  // Main app screen for authenticated users
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to Traction</Text>
      <Text className="text-base text-gray-600 dark:text-gray-400 mt-4">You are authenticated!</Text>
    </View>
  );
}
