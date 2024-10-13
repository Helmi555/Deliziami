import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { Icons } from './Icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import { RFPercentage,RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Define a static component to use in place of ColorScreen
const StaticScreen = ({ route }) => {
  const bgColor = Colors[route.name.toLowerCase()] || Colors.white;

  return (
    <SafeAreaView  style={styles.mainContainer}>
    <View style={[styles.screen, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{route.name}</Text>
    </View>
    </SafeAreaView>
  );
};

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: StaticScreen, color: "#e4643b", alphaClr: "#2a2a2f" },
  { route: 'Panier', label: 'Panier', type: Icons.Feather, icon: 'shopping-cart', component: StaticScreen, color: "#e4643b", alphaClr: "#2a2a2f" },
  { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: StaticScreen, color: "#e4643b", alphaClr: "#2a2a2f"},
  { route: 'Add', label: 'Add New', type: Icons.Feather, icon: 'plus-square', component: StaticScreen, color: "#e4643b",  alphaClr: "#2a2a2f"},

];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: wp("3%") }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.myPrimary} />
          <Animatable.View ref={textViewRef}>
            {focused && <Text style={{ color: Colors.white, paddingHorizontal: wp("2%") }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AnimTab3() {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"green" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor:"#2a2a2f",
            height:hp("8%"),
            borderColor:"transparent",

          }
        }}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#2a2a2f",
    },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp("2.5%"),
    borderRadius:wp("3%") ,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius:hp("10%"),
    borderBottomRightRadius:hp("10%")
  },
  text: {
    fontSize: 24,
    color: "green",
  }
});
