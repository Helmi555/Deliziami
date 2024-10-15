import { constants } from './constants';
import { Vibration, PixelRatio, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import moment from 'moment-timezone'; // Ensure you import moment-timezone
import uuid from 'react-native-uuid';
//import { Notifications } from 'react-native-notifications'; // Changed import for notifications
//import RNFS from 'react-native-fs'; // Changed import for filesystem
import notifee, { AndroidImportance, EventType, AndroidColor } from '@notifee/react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const checkApplicationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
    }
    catch (e) {
      console.log(e)
    }
  }
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Notification permission denied");
      }
    } catch (e) {
      console.log("Error requesting notification permission", e);
    }
  }

}


async function onDisplayNotification(uuidCode) {
  await checkApplicationPermission()
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    //sound: 'hollow', // Custom sound (should match the file name in res/raw)
    importance: AndroidImportance.HIGH, // Make sure the notification pops up
    vibration: true, // Enable vibration
    vibrationPattern: [300, 500, 300, 500], // Changed to an even-length pattern
    lights: true,
    lightColor: AndroidColor.WHITE,
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Verification Code',
    body: `Your verification code is: ${uuidCode}`,
    android: {
      channelId,
      largeIcon: require("./assets/splash/notifIcon.png"), // Custom large icon
      //sound: 'hollow', // Use custom sound for the notification
      vibrationPattern: [300, 500], // Changed to an even-length pattern
      importance: AndroidImportance.HIGH,
      color: "#e06030",
      pressAction: {
        id: 'default', // Required for handling notification press
      },

    },
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS && detail.pressAction.id === 'default') {
      // When the notification is pressed, copy the code to the clipboard
      copyToClipboard(detail.notification.body.split(': ')[1]);
    }
  });
}


async function handleSendNotification() {
  const uuidCode = generateUUIDCode();
  console.log("Code: ", uuidCode);
  //await sendUUIDCodeAsNotification(uuidCode);
  await onDisplayNotification(uuidCode)
  return uuidCode;
}

const copyToClipboard = (uuidCode) => {
  Clipboard.setString(uuidCode); // Copy the code to the clipboard
  console.log("Verification code copied to clipboard:", uuidCode);
}

function generateUUIDCode() {
  const uuidCode = uuid.v4().replace(/-/g, '').toUpperCase().slice(0, 6);
  return uuidCode;
}


async function currentAdmin_KEY() {
  const currentDate = moment().tz('Europe/Rome');
  const day = currentDate.date();
  const month = currentDate.month();
  const year = currentDate.year();
  const formattedDate = `${year}/${month}/${day}`;

  const adminCode_Key = constants.adminCode_Key;
  //console.log("the constants:",adminCode_Key)
  return formattedDate + adminCode_Key;
}

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength + 4) {
    return text
  }
  else {
    return text.substring(0, maxLength) + "..."
  }
}
const getScreenDimension = () => {
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

  return Math.round(screenDiagonalInches * 100) / 100
}


function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email pattern
  return regex.test(email);
}
function isEightDigitNumber(value) {
  const regex = /^\d{8}$/; // Matches exactly 8 digits
  return regex.test(value);
}

export { currentAdmin_KEY, handleSendNotification, validatePassword, truncateText, getScreenDimension, isEightDigitNumber, isValidEmail };  // Use ES module export


///////// npm expo start



/* // Updated file path
const soundUri = `${RNFS.DocumentDirectoryPath}/assets/sounds/i_want_pizza.mp3`;

async function requestPermissions() {
  // Requesting permissions is handled differently in CLI, usually through the Permissions API
  const hasPermission = await Notifications.requestPermission();

  if (hasPermission !== 'granted') {
    alert('You need to enable notifications in settings');
    return false;
  }
  return true;
}

async function sendUUIDCodeAsNotification(uuidCode) {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  Vibration.vibrate();
  setTimeout(() => {
    Vibration.vibrate();
  }, 600);

  await Notifications.postLocalNotification({
    title: 'Verification Code',
    body: `Your verification code is: ${uuidCode}`,
    sound: soundUri ? soundUri : 'default', // Use 'default' for the default notification sound
  });
}
// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  // Ensures pop-up shows in the foreground
    shouldPlaySound: true,  // Ensures sound plays
    shouldSetBadge: true,
  }),
});
 */