import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../home';
import ListOfProducts from '../listOfProducts';
import ProductDetails from '../productDetails';
import { View } from 'react-native';
import { useEffect } from 'react';


const AuthStack = createStackNavigator();

const HomeStack = () => (

  <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'  >
    <AuthStack.Screen name="Home" component={Home}
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 500 } },
          close: { animation: 'timing', config: { duration: 500 } },
        },
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid, // Slide transition
      }} />
    <AuthStack.Screen name="List of Products" component={ListOfProducts}
      options={{
        headerShown: true,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 500 } },
          close: { animation: 'timing', config: { duration: 500 } },
        },
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation // Fade transition
      }} />
    <AuthStack.Screen name="Product Details" component={ProductDetails}

      options={(navigation, route) => ({
        headerShown: true,
        tabBarStyle: { display: 'none' }, // Hide the bottom tab when in ProductDetails

        title: "",
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 500 } },
          close: { animation: 'timing', config: { duration: 500 } },
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid // Fade transition
      })} />

  </AuthStack.Navigator>

);
export default HomeStack;
