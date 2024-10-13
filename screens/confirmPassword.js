import React, { useEffect, useState } from 'react';
import {
  View, Image, StyleSheet, Dimensions, Platform, Pressable, Keyboard, ActivityIndicator,
  KeyboardAvoidingView, StatusBar, ScrollView, FlatList, TouchableOpacity, ImageBackground, ToastAndroid
} from 'react-native';
import { Text, Checkbox, IconButton, Provider as PaperProvider, HelperText, Searchbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginPost } from './APIs/loginApis';
import { storeItem, getItem, removeItem, updateItem } from '../AsyncStorageHelper';
import { useAuth } from '../contexts/authContext'; // Import the AuthProvider
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleSendNotification, validatePassword } from '../functions';

const screenWidth = Dimensions.get('window').width;


export default function ConfirmPassword({ navigation }) {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [response, setResponse] = useState('');
  const [snackBarGreenVisible, setSnackBarGreenVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { handleLogin } = useAuth()

  const onDismissGreenSnackBar = () => setSnackBarGreenVisible(false);


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

  //const onDismissSnackBar = () => setSnackBarVisible(false);
  // const onDismissErrorSnackBar = () => setErrorSnackBarVisible(false);

  const handleConfirm = async () => {
    Keyboard.dismiss()
    setIsLoading(true)
    if (!password || !confirmPassword) {
      setErrorMessage("Enter both fields please!")
      setIsErrorVisible(true)
      setIsLoading(false)

    }
    else if (confirmPassword !== password) {
      setErrorMessage("Passwords mismatches, Retry")
      setIsErrorVisible(true)
      setIsLoading(false)
    }
    else if (!validatePassword(password)) {
      setErrorMessage("STRONG password needed")
      setIsErrorVisible(true)
      setIsLoading(false)
    }
    else {
      setSnackBarGreenVisible(true)
      setTimeout(() => {
        handleLogin({ username: "Mario", password: "Fioli" })
        setSnackBarGreenVisible(false)
        setIsLoading(false)
      }, 2000);

    }
  };

  useEffect(() => {
    setIsErrorVisible(false)
  }, [confirmPassword, password])


  /*  if (!fontsLoaded) {
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
          <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>Hey !</Text>
          <Text variant='titleLarge' style={{ fontWeight: '600', color: "gray" }}>Conferma la tua password</Text>

        </View>
        <View style={styles.middleContainer}>

          <TextInput mode='outlined' value={password}
            onChangeText={password => setPassword(password)}
            label={"Password"}
            error={isErrorVisible && !password}
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
          <TextInput mode='outlined' value={confirmPassword}
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            label={"Confirm Password"}
            style={styles.inputField}
            error={isErrorVisible && !confirmPassword}
            outlineStyle={{ borderRadius: wp(6), borderColor: "#2a2a2f", borderWidth: 2 }}
            left={<TextInput.Icon icon="lock-outline" color="black" size={wp(6)} />}
            right={<TextInput.Icon icon={!isVisible2 ? "eye-off-outline" : "eye-outline"}
              color="black" size={wp(6)} onPress={() => setIsVisible2(!isVisible2)} forceTextInputFocus={false} />}
            secureTextEntry={!isVisible2 ? true : false}
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
            {errorMessage}
          </HelperText>
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



        </View>
        <View style={styles.bottomContainer}>

          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: hp(1) }}>
            <Text style={{ fontSize: RFValue(12) }}>By continuing, you agree DeliziamiPizza Terms of Service
            </Text>
            <Text style={{ fontSize: RFValue(12) }}>and Privacy Policy.</Text>

          </View>

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
            <Text style={{ color: 'white', fontSize: RFValue(13) }}>You've successfully confirmed the password</Text>
          </Snackbar>

        </View>
      </KeyboardAwareScrollView>

    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 2,
    borderColor: "red",
    borderWidth: 0,
    justifyContent: "flex-end",
    paddingHorizontal: wp(6),
    paddingTop: wp(8)
  },
  middleContainer: {
    flex: 2,
    paddingBottom: wp(1),
    borderColor: "blue",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: wp(2),
    paddingVertical: hp(2)
  },
  bottomContainer: {
    flex: 1,
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
    fontSize: RFPercentage(2.2)
  },
  confirmButton: {
    width: wp(80),
    borderRadius: wp(20),
    marginTop: hp(4),
    marginBottom: hp(4),
    borderWidth: 1

  },

})