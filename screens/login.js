import React, { useEffect, useState, memo } from 'react';
import {
  View, Image, StyleSheet, Dimensions, Platform, Pressable, Keyboard, ActivityIndicator,
  KeyboardAvoidingView, StatusBar, ScrollView, FlatList, TouchableOpacity, ImageBackground, ToastAndroid, PixelRatio
} from 'react-native';
import { Text, HelperText, Checkbox, IconButton, Provider as PaperProvider, Searchbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginPost, initializeHash } from './APIs/loginApis';
import { storeItem, getItem, removeItem, updateItem } from '../AsyncStorageHelper';
import { useAuth } from '../contexts/authContext'; // Import the AuthProvider
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';


const pizzaAnimation = require("../assets/Lotties/Animation - 1727441464459 (1).json")

// Get screen dimensions in dp (density-independent pixels)
const { width: screenWidthDp, height: screenHeightDp } = Dimensions.get('window');

// Get the screen's pixel density multiplier
const pixelDensity = PixelRatio.get();

// Convert dp to pixels
const screenWidthPx = screenWidthDp * pixelDensity;
const screenHeightPx = screenHeightDp * pixelDensity;

// Calculate the diagonal size in pixels
const screenDiagonalPx = Math.sqrt(screenWidthPx ** 2 + screenHeightPx ** 2);

// Actual screen DPI varies, you can use a standard DPI value (like 160 for mdpi)
const standardDpi = 320; // Common DPI, you may adjust based on the actual device

// Calculate the diagonal size in inches
let screenDiagonalInches = screenDiagonalPx / standardDpi;
screenDiagonalInches = Math.round(screenDiagonalInches * 100) / 100

console.log(`Screen diagonal size in inches: ${Math.round(screenDiagonalInches * 100) / 100}`);

const getFontSize = () => {
  if (screenDiagonalInches <= 4.5) { // For Pixel 3+ and similar devices (5.5 inches)
    return RFValue(15); // Increase font size for larger screens
  } else {
    return RFValue(16); // Default larger font size for even bigger screens
  }
};

const get_Times = (screenDiagonalInches) => {
  return screenDiagonalInches < 4.5 ? 24 : 20
}



function Login({ navigation }) {

  const [phone_email, setPhoneEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [snackBarVisible, setSnackBarVisible] = useState(false)
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { handleLogin } = useAuth()

  /* useEffect(() => {
    const calculateTextWidth = async () => {
      if (TextSize) {
        try {
          const size = await TextSize.measure({
            text: '_', // Text to measure
            fontSize: RFValue(20), // Use RFValue for responsive font size
            fontFamily: 'System', // Font family (can be customized)
          });
          setLetterWidth(size.width); // Set the width of the letter
        } catch (error) {
          console.error("Error measuring text size:", error);
        }
      } else {
        console.error("TextSize module is null");
      }
    };
  
    calculateTextWidth();
  }, []); */

  useEffect(() => {
    const init = async () => {
      await initializeHash()
    }
    init()
  }, [])

  const onDismissSnackBar = () => setSnackBarVisible(false);
  const onDismissErrorSnackBar = () => setErrorSnackBarVisible(false);

  const handleSubmit = async () => {
    Keyboard.dismiss()
    setIsLoading(true);
    if (!phone_email || !password) {
      setErrorMessage("Enter both fields please!")
      setIsErrorVisible(true)
      setIsLoading(false);
    }
    else {
      //console.log('Loading state before login:', isLoading); // This will still show the old state
      try {
        await loginPost(phone_email, password, setResponse); // Ensure loginPost is awaited
        // Handle success response if needed
        //ToastAndroid.show('Successfully Logged In ♥', ToastAndroid.SHORT);


      } catch (error) {
        console.error("Error during login:", error);
        setErrorSnackBarVisible(true)


      } finally {
        setIsLoading(false); // Set loading state back to false
        // Log after state change (will still show old value due to async)
        //console.log('Loading state after login attempt:', isLoading); 
      }
    }
  };

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        setSnackBarVisible(true)
        if (checked) {
          storeItem("user", { username: phone_email, password })
        }
        setTimeout(() => {
          handleLogin({ username: phone_email, password })

        }, 1500);
      }
      else {
        setErrorSnackBarVisible(true)
      }
    }
  }, [response]);

  useEffect(() => {
    setErrorMessage("")
    setIsErrorVisible(false)
  }, [password, phone_email])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled" // or "always"
      showsVerticalScrollIndicator={false}


    >
      <ImageBackground style={{ flex: 1, justifyContent: "center" }} source={require("../assets/login/sign_In_background.png")}
        resizeMode='cover'>
        <StatusBar hidden={true} />
        <View style={styles.topContainer}>
          <View style={{ borderWidth: 0, justifyContent: "center" }}>
            <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>Bentornato</Text>
            <Text variant='titleLarge' style={{ fontWeight: '600', color: "lightgray" }}>Accedi per continuare</Text>
          </View>
          <View style={{ borderWidth: 0 }}>
            <LottieView source={pizzaAnimation} autoPlay={true}
              loop={true} style={{ width: wp(30), height: wp(30) }}
              speed={0.7}
            />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <TextInput mode='outlined' value={phone_email}
            onChangeText={phone_email => setPhoneEmail(phone_email)}
            error={isErrorVisible}
            label={"Phone-Email"}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="account-outline" color="black" size={wp(6)} />}
            autoCapitalize="none"
            autoCorrect={false}
            theme={{
              colors: {
                primary: 'black', // The outline colors
                background: 'white', // The background for the input field
              },
              roundness: wp(6), // Apply roundness to control the border radius
            }}
          >
          </TextInput>
          <TextInput mode='outlined' value={password}
            onChangeText={pass => setPassword(pass)}
            error={isErrorVisible}
            label={"Password"}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="lock-outline" color="black" size={wp(6)} />}
            right={<TextInput.Icon icon={!isVisible ? "eye-off-outline" : "eye-outline"}
              color="black" size={wp(6)} onPress={() => setIsVisible(!isVisible)} forceTextInputFocus={false} />}
            secureTextEntry={!isVisible ? true : false}
            autoCapitalize="none"
            autoCorrect={false}
            theme={{
              colors: {
                primary: 'black', // change the label text color to gray
              }
            }}
          >
          </TextInput>
          <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginLeft: wp(10) }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='black'
              uncheckedColor='black'
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <TouchableOpacity onPress={() => setChecked(!checked)} activeOpacity={0.6}>
              <Text variant='bodyLarge' style={{ fontWeight: "600" }} >Remember me</Text>
            </TouchableOpacity>
          </View>

          <HelperText type='error' visible={isErrorVisible} style={{ fontSize: RFValue(16), color: "yellow", marginTop: isErrorVisible ? hp(1) : 0 }}>
            {errorMessage}
          </HelperText>
          <Button style={styles.signInButton} mode="elevated" onPress={handleSubmit}
            textColor='#fff'
            buttonColor='#2a2a2f'
            loading={isLoading}
            labelStyle={{
              fontWeight: "600", fontSize: RFValue(16),
            }}
            contentStyle={{ height: hp(6.8) }}

          >
            Sign In
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate("Verification Code")} style={{ marginBottom: hp(7) }}>
            <Text variant='bodyMedium' style={{ textDecorationLine: 'underline', textDecorationStyle: "solid", fontWeight: "700" }} >Forgot your password?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text variant='bodyLarge' style={{ fontWeight: Platform.OS === 'ios' ? "500" : "700" }} >Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text variant='bodyLarge' style={{ fontWeight: Platform.OS === "ios" ? "600" : "bold", color: "blue" }} >Sign Up</Text>

            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: hp(3) }}>
            <Text style={{ fontSize: getFontSize(), textDecorationStyle: "solid" }}
            >{"_".repeat(get_Times(screenDiagonalInches))}</Text>
            <Text style={{ fontSize: getFontSize() - 2 }}> or </Text>
            <Text style={{ fontSize: getFontSize(), textDecorationStyle: "solid" }}
            >{"_".repeat(get_Times(screenDiagonalInches))}</Text>



          </View>
          <View style={{ paddingVertical: hp(1), flexDirection: "row", marginTop: hp(2), justifyContent: "space-evenly", marginHorizontal: wp(8) }}>
            <View>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={require('../assets/logos/Facebook_Logo_Primary.png')} style={{ width: wp(10), height: wp(10) }} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={require('../assets/logos/gmail_logo.png')} style={{ width: wp(10), height: wp(8) }} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={require('../assets/logos/iphone_logo.png')} style={{ width: wp(10), height: wp(11) }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: hp(1) }}>
            <Text style={{ fontSize: RFValue(12) }}>By continuing, you agree DeliziamiPizza Terms of Service
            </Text>
            <Text style={{ fontSize: RFValue(12) }}>and Privacy Policy.</Text>

          </View>
          <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            style={{
              backgroundColor: '#4CAF50', // Green for success
              borderRadius: 8, // Rounded corners
            }}
            action={{
              label: 'OK',
              onPress: () => {
                // Perform any additional action if needed
              },
              color: 'white',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Success!</Text>
            <Text style={{ color: 'white' }}>You are now logged in</Text>
          </Snackbar>
          <Snackbar
            visible={errorSnackBarVisible}
            onDismiss={onDismissErrorSnackBar}
            duration={3000}
            style={{
              backgroundColor: 'red', // Green for success
              borderRadius: 8, // Rounded corners
            }}
            action={{
              label: 'OK',
              onPress: () => {
                // Perform any additional action if needed
              },
              color: 'white',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Error!</Text>
            <Text style={{ color: 'white' }}>Error trying to login</Text>
          </Snackbar>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>

  )
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    borderColor: "red",
    borderWidth: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: wp(6),
    paddingRight: wp(1),
    paddingTop: wp(8)
  },
  middleContainer: {
    flex: 3,
    paddingBottom: wp(1),
    borderColor: "blue",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    flex: 1.5,
    borderColor: "pink",
    borderWidth: 0,
    paddingBottom: hp(1)
  },
  inputField: {
    height: hp(7.6),
    width: wp(80),
    //borderRadius:wp(0),
    marginTop: hp(1.6),
    fontSize: RFPercentage(2.2)
  },
  signInButton: {
    width: wp(80),
    borderRadius: wp(20),
    marginTop: hp(4),
    marginBottom: hp(1),
    borderWidth: 1

  },

})

export default memo(Login)