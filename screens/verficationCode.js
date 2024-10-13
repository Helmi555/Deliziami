import React, { useEffect, useState } from 'react';
import {
  View, Image, StyleSheet, Dimensions, Platform, Pressable, Keyboard, ActivityIndicator,
  KeyboardAvoidingView, StatusBar, ScrollView, FlatList, TouchableOpacity, ImageBackground, ToastAndroid
} from 'react-native';
import { Text, Checkbox, HelperText, IconButton, Provider as PaperProvider, Searchbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginPost } from './APIs/loginApis';
import { useAuth } from '../contexts/authContext'; // Import the AuthProvider
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleSendNotification } from '../functions';

const screenWidth = Dimensions.get('window').width;


export default function VerificationCode({ navigation }) {

  const [verifCode, setVerifCode] = useState("")
  const [snackBarVisible, setSnackBarVisible] = useState(false)
  const [snackBarGreenVisible, setSnackBarGreenVisible] = useState(false)
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { handleSaveCode, uuidCode } = useAuth()
  const [isErrorVisible, setIsErrorVisible] = useState(false)

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


  const onDismissSnackBar = () => setSnackBarVisible(false);
  const onDismissErrorSnackBar = () => setErrorSnackBarVisible(false);
  const onDismissGreenSnackBar = () => setSnackBarGreenVisible(false);

  const handleConfirm = () => {
    Keyboard.dismiss()
    setIsLoading(true);
    if (verifCode !== uuidCode) {
      setIsErrorVisible(true)
      setIsLoading(false)
    }
    else {
      setSnackBarGreenVisible(true)
      console.log("green true")
      setTimeout(() => {
        setIsLoading(false)
        navigation.navigate("Confirm Password")
        setSnackBarGreenVisible(false)
      }, 2000);
    }

  };
  const handleResendCode = async () => {
    Keyboard.dismiss()
    setSnackBarVisible(true)
    setIsErrorVisible(false)
    setVerifCode("")
    const uuidCode = await handleSendNotification()
    handleSaveCode(uuidCode)
  }

  useEffect(() => {
    const handleStart = async () => {
      const uuidCode = await handleSendNotification()
      handleSaveCode(uuidCode)

    }
    handleStart()
    setTimeout(() => {
      setSnackBarVisible(true)
    }, 500)

  }, [])

  const handleChangeText = (verifCode) => {
    setVerifCode(verifCode)
    setIsErrorVisible(false)

  }

  /*     if (!fontsLoaded) {
        return (<View style={{flex:1,justifyContent:"center",backgroundColor:"#f9a85e"}}>
          <StatusBar hidden={true}/>
          <ActivityIndicator  size="large" color="#e4643b" />
          </View>) // Show a loading spinner while fonts are loading
      } */
  return (

    <ImageBackground style={{ flex: 1, justifyContent: "center" }} source={require("../assets/login/verification_backImage.png")}
      resizeMode='cover'>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled" // or "always"
        showsVerticalScrollIndicator={false}

      >
        <StatusBar hidden={true} />
        <View style={styles.topContainer}>
          <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>Bentornato</Text>
          <Text variant='titleLarge' style={{ fontWeight: '600', color: "gray" }}>Verifica per continuare</Text>

        </View>
        <View style={styles.middleContainer}>
          <Text variant='bodySmall' style={{ fontSize: RFValue(14) }}  >
            We have sent a verification code to your phone number{"\n"}Please enter it here so we can process to the next phase
          </Text>
          <TextInput mode='outlined' value={verifCode}
            onChangeText={verifCode => handleChangeText(verifCode)}
            label={"Code"}
            maxLength={6}
            style={styles.inputField}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="account-outline" color="black" size={wp(6)} />}
            autoCapitalize="none"
            autoCorrect={false}
            error={isErrorVisible}
            theme={{
              colors: {
                primary: 'black', // The outline colors
                background: 'white', // The background for the input field
              },
              roundness: wp(6), // Apply roundness to control the border radius
            }}
          >
          </TextInput>
          <HelperText type='error' visible={isErrorVisible} style={{ fontSize: RFValue(16), marginTop: isErrorVisible ? hp(1) : 0 }}>
            Invilid Code, Please retry
          </HelperText>

          <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginLeft: wp(10) }}>

          </View>
          <Button style={styles.confirmButton} mode="elevated" onPress={handleConfirm}
            textColor='#fff'
            buttonColor='#2a2a2f'
            loading={isLoading}
            labelStyle={{
              fontWeight: "600", fontSize: RFValue(16),
            }}
            contentStyle={{ height: hp(6.8) }}

          >
            Confirm
          </Button>

          <View style={{ flexDirection: "row" }}>
            <Text variant='bodyLarge' style={{ fontWeight: "700" }} >You didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text variant='bodyLarge' style={{ fontWeight: "700", color: "blue" }} >Resend Code</Text>

            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomContainer}>

          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: hp(1) }}>
            <Text style={{ fontSize: RFValue(12) }}>By continuing, you agree DeliziamiPizza Terms of Service
            </Text>
            <Text style={{ fontSize: RFValue(12) }}>and Privacy Policy.</Text>

          </View>
          <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            duration={2000}

            style={{
              backgroundColor: '#FFEB8B', // Green for success
              borderRadius: wp(2), // Rounded corners

            }}
            action={{
              label: 'OK',
              onPress: () => {
                // Perform any additional action if needed
              },
              textColor: "#a88006"
            }}
          >
            <Text style={{ color: '#eab00a', fontWeight: 'bold', fontSize: RFValue(14) }}>Success!</Text>
            <Text style={{ color: '#eab00a', fontSize: RFValue(13) }}>Code send, CHECK NOTIFICATIONS !</Text>
          </Snackbar>

          <Snackbar
            visible={snackBarGreenVisible}
            onDismiss={onDismissGreenSnackBar}
            duration={1500}
            style={{
              backgroundColor: '#4CAF50', // Green for success
              borderRadius: wp(2), // Rounded corners
            }}
            action={{
              label: 'OK',
              onPress: () => {
                // Perform any additional action if needed
              },
              color: 'white',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: RFValue(14) }}>Success!</Text>
            <Text style={{ color: 'white', fontSize: RFValue(13) }}>You've successfully verified the code</Text>
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
      </KeyboardAwareScrollView>

    </ImageBackground>

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
    flex: 1,
    paddingBottom: wp(1),
    borderColor: "blue",
    borderWidth: 0,
    alignItems: "center",
    marginTop: hp(3),
    paddingHorizontal: wp(2)
  },
  bottomContainer: {
    flex: 1.5,
    borderColor: "pink",
    borderWidth: 0,
    paddingBottom: hp(1),
    justifyContent: "flex-end"
  },
  inputField: {
    height: hp(7.6),
    width: wp(80),
    //borderRadius:wp(0),
    marginTop: hp(4),
    fontSize: RFPercentage(2.6)
  },
  confirmButton: {
    width: wp(80),
    borderRadius: wp(20),
    marginTop: hp(4),
    marginBottom: hp(4),
    borderWidth: 1

  },

})