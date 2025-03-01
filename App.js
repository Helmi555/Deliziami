import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './screens/home';
import Product from './screens/product';
import AnimTab3, { TabButton } from './components/AnimTab3';
import { Icons } from './components/Icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useKeyboard } from '@react-native-community/hooks';
import { AuthProvider, useAuth } from './contexts/authContext'; // Import the AuthProvider
import AuthNavigator from './screens/Stacks/AuthStackNavigator';
import HomeStack from './screens/Stacks/HomeStack';
import LoadingScreen from './components/LoadingScreen';
import Favorites from './screens/Favorites';
import { AppProvider } from './contexts/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabArr = [
  { route: 'Home menu', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeStack, color: "#2a2a2f", alphaClr: "#2a2a2f" },
  { route: 'Product', label: 'Product', type: Icons.Feather, icon: 'shopping-cart', component: Product, color: "#2a2a2f", alphaClr: "#2a2a2f" },
  { route: 'Favorites', label: 'Favorites', type: Icons.Feather, icon: 'heart', component: Favorites, color: "#2a2a2f", alphaClr: "#2a2a2f" },
  { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: Product, color: "#2a2a2f", alphaClr: "#2a2a2f" },
];

// Bottom Tab Navigator (Home, Product, etc.)
function BottomTabs() {
  const keyboard = useKeyboard();
  return (
    <AppProvider>
      <Tab.Navigator
        screenOptions={(route) => ({
          headerShown: false,
          //tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: keyboard.keyboardShown ? "transparent" : "#2a2a2f",
            height: keyboard.keyboardShown ? 0 : hp("8%"),
            borderColor: "transparent",
            overflow: 'hidden',
            //display: route == "Product Details" ? "none" : "flex"
          }
        })}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{

              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />

            }}
          />
        ))}
      </Tab.Navigator>
    </AppProvider>
  );
}

// AuthStack for conditional rendering based on authentication
function AuthStack() {
  const { isAuthenticated, isLoading } = useAuth(); // Access the authentication state


  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={BottomTabs} />
      )}
    </Stack.Navigator>
  );



  {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // If not authenticated, show the Login screen
        <Stack.Screen name="Login" component={Login} />
      ) : (
        // If authenticated, show the BottomTabs (Home, Product, etc.)
        <Stack.Screen name="Main" component={BottomTabs} />
      )}
    </Stack.Navigator> */}
  ;
}

// Main App Component
export default function App() {

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle="dark-content" translucent={true} />
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
