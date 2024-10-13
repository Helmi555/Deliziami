import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import SignUp from '../signup';
import Login from '../login';
import VerificationCode from '../verficationCode';
import ConfirmPassword from '../confirmPassword';

const AuthStack = createStackNavigator();

const  AuthNavigator = () => (
  <AuthStack.Navigator  screenOptions={{headerShown:false}} initialRouteName='Login' >
    <AuthStack.Screen name="Login" component={Login} 
     options={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 500 } },
        close: { animation: 'timing', config: { duration: 500 } },
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide transition
    }}/>
    <AuthStack.Screen name="SignUp" component={SignUp} 
     options={{
      headerShown: false,
      gestureEnabled: true,
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 500 } },
        close: { animation: 'timing', config: { duration: 500 } },
      },
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid, // Fade transition
    }}/>
     <AuthStack.Screen name="Verification Code" component={VerificationCode} 
     options={{
      headerShown: false,
      gestureEnabled: true,
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 500 } },
        close: { animation: 'timing', config: { duration: 500 } },
      },
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid, // Fade transition
    }}/>
    <AuthStack.Screen name="Confirm Password" component={ConfirmPassword} 
     options={{
      headerShown: false,
      gestureEnabled: true,
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 500 } },
        close: { animation: 'timing', config: { duration: 500 } },
      },
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid, // Fade transition
    }}/>
   
  </AuthStack.Navigator>
);
export default AuthNavigator;
