import React, { useEffect, useState, memo } from 'react';
import {
  View, Image, StyleSheet, Dimensions, Platform, Pressable, Keyboard, ActivityIndicator,
  KeyboardAvoidingView, StatusBar, TouchableOpacity, ImageBackground, ToastAndroid, PixelRatio
} from 'react-native';
import { Text, Checkbox, HelperText, IconButton, Provider as PaperProvider, Searchbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../contexts/authContext'; // Import the AuthProvider
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { isValidEmail, isEightDigitNumber } from '../functions';
import moment from 'moment';

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

function SignUp({ navigation }) {

  const { handleSaveCode } = useAuth()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone_email, setPhoneEmail] = useState("")
  const [birthDay, setBirthday] = useState(null)
  const [address, setAddress] = useState("")
  const [snackBarVisible, setSnackBarVisible] = useState(false)
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  //  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleConfirm = (event, selectedDate) => {
    hideDatePicker()

    if (event.type === 'set') {
      const currentDate = selectedDate || birthDay;
      setBirthday(currentDate);
    }
  };

  const showDatepicker = () => {
    Keyboard.dismiss()
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };


  const onDismissSnackBar = () => setSnackBarVisible(false);
  const onDismissErrorSnackBar = () => setErrorSnackBarVisible(false);

  const handleRegister = async () => {
    Keyboard.dismiss()
    setIsLoading(true);
    if (!name || !lastName || !phone_email || !birthDay || !address || (!isEightDigitNumber(phone_email) && !isValidEmail(phone_email))) {
      setIsErrorVisible(true)
    }
    else {
      navigation.navigate("Verification Code")
    }
    setIsLoading(false)

  }

  useEffect(() => {
    setIsErrorVisible(false)
  }, [name, lastName, phone_email, birthDay, address])


  /*  if (!fontsLoaded) {
     return (<View style={{flex:1,justifyContent:"center",backgroundColor:"#e4643b"}}>
       <StatusBar hidden={true}/>
       <ActivityIndicator  size="large" color="#f9a85e" />
       </View>) // Show a loading spinner while fonts are loading
   } */
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled" // or "always"
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground style={{ flex: 1, justifyContent: "center" }} source={require("../assets/login/signup_background.png")}
        resizeMode='cover'>
        <StatusBar hidden={true} />
        <View style={styles.topContainer}>
          <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>Ciao!</Text>
          <Text variant='titleLarge' style={{ fontWeight: '600', color: "gray" }}>Registrati per continuare</Text>

        </View>
        <View style={styles.middleContainer}>


          <View style={styles.nameLastNameContainer}>
            <TextInput mode='outlined' value={name}
              onChangeText={name => setName(name)}
              error={isErrorVisible && !name}
              label={"Name"}
              style={[styles.inputField, { width: wp(39) }]}
              outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
              left={<TextInput.Icon icon="account-outline" color="black" size={wp(5.6)} />}
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
            <TextInput mode='outlined' value={lastName}
              onChangeText={lastName => setLastName(lastName)}
              error={isErrorVisible && !lastName}
              label={"Last Name"}
              style={[styles.inputField, { width: wp(39) }]}
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
          </View>
          <TextInput mode='outlined' value={phone_email}
            onChangeText={phone_email => setPhoneEmail(phone_email)}
            error={isErrorVisible && !phone_email}
            label={"Phone-email"}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="account" color="black" size={wp(6)} />}
            autoCapitalize="none"
            autoCorrect={false}
            theme={{
              colors: {
                primary: 'black', // change the label text color to gray
              }
            }}
          >
          </TextInput>
          <TextInput mode='outlined' value={birthDay ? moment(birthDay).format('DD/MM/YYYY') : ""}
            onChangeText={() => { }}
            error={isErrorVisible && !birthDay}
            label={"BirthDay"}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="cake-variant-outline" color="black" size={wp(6)} />}
            right={<TextInput.Icon icon="calendar-today" color="black" size={wp(6)} onPress={showDatepicker} />}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            theme={{
              colors: {
                primary: 'black', // change the label text color to gray
              }
            }}
          >
          </TextInput>
          {show && (
            <DateTimePicker

              testID="dateTimePicker"
              value={birthDay ? birthDay : new Date()}
              mode="date"  // Set the mode to 'date' to show only the date picker
              display="default"
              onChange={handleConfirm}
              maximumDate={new Date()}


            />
          )}
          <TextInput mode='outlined' value={address}
            onChangeText={address => setAddress(address)}
            error={isErrorVisible && !address}
            label={"Address"}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="map-marker-outline" color="black" size={wp(6)} />}
            autoCapitalize="none"
            autoCorrect={false}
            theme={{
              colors: {
                primary: 'black', // change the label text color to gray
              }
            }}
          >
          </TextInput>
          <HelperText type='error' visible={isErrorVisible} style={{ fontSize: RFValue(16), marginTop: isErrorVisible ? hp(1) : 0 }}>
            There are empty/invalid fields
          </HelperText>

          <Button mode='elevated' textColor='#fff' buttonColor='#2a2a2f' loading={isLoading}
            onPress={handleRegister}
            contentStyle={{ height: hp(6.6) }}  // Adjust height of the button
            style={styles.signUpButton}
            labelStyle={{ fontSize: RFValue(17) }}
          >
            Sign Up
          </Button>


          <View style={{ flexDirection: "row", marginTop: hp(2) }}>
            <Text variant='bodyLarge' style={{ fontWeight: Platform.OS === 'ios' ? "500" : "700" }} >You already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text variant='bodyLarge' style={{ fontWeight: Platform.OS === "ios" ? "600" : "bold", color: "blue" }} >Sign In</Text>

            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "baseline", marginTop: hp(3) }}>

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
    justifyContent: "flex-end",
    paddingHorizontal: wp(6),
    paddingTop: wp(8)
  },
  middleContainer: {
    flex: 3,
    paddingBottom: wp(1),
    borderColor: "blue",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  nameLastNameContainer: {
    width: wp(80),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0,

  },
  bottomContainer: {
    flex: 1.5,
    borderColor: "pink",
    borderWidth: 0,
    paddingBottom: hp(1)
  },
  inputField: {
    height: hp(7.4),
    width: wp(80),
    //borderRadius:wp(0),
    marginTop: hp(1.6),
    fontSize: RFPercentage(2.2)
  },
  signUpButton: {
    width: wp(80),
    borderRadius: wp(20),
    marginTop: hp(4),
    marginBottom: hp(2),
    borderWidth: 1
  },

})

export default memo(SignUp)