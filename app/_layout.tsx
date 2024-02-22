import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import * as SecureStore from "expo-secure-store";
import { View } from 'react-native';

const clerkPublishableKey :string = Constants.expoConfig?.extra?.clerkPublishableKey ?? ""

console.log('clerkPublishableKey :>> ', clerkPublishableKey);
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {

  const router = useRouter();
  const segments = useSegments();
  const {isLoaded, isSignedIn} = useAuth()

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if(!isLoaded)
      return;

    const inTabsGroup = segments[0] === '(tabs)';

    if(isSignedIn && !inTabsGroup){
      router.replace("/(tabs)/chats");
    }
  
  }, [isSignedIn])
  

  if (!loaded || !isLoaded) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="otp"
        options={{
          headerTitle: "Enter Your Phone Number",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "Verify your phone number",
          headerBackTitle: 'Edit number',
        }}
      />
    </Stack>
  )
}

const RootLayoutNav = () =>  {

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>

      <InitialLayout />
    </ClerkProvider>

  );
}

export default RootLayoutNav;



