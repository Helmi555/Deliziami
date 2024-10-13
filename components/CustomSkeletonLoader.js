import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getScreenDimension } from '../functions';


const screenDimension=getScreenDimension()
const CustomSkeletonLoader = () => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);



  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, styles.image, { opacity:0.7}]} />
      <Animated.View style={[styles.skeleton, styles.title, { opacity :0.5}]} />
      <Animated.View style={[styles.skeleton, styles.title, { opacity :0.5,width:wp(30)}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:wp(42),
    height: screenDimension>4.5? hp(24):hp(27),
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: wp("3%"),
    paddingTop: wp(2),
    elevation: 5,
    marginTop: hp("8%"),
    marginHorizontal: 10,
  },
  skeleton: {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
  image: {
    width: wp(32),
    height: wp(24),
    borderRadius: 10,
    marginBottom:wp(0.6)
  },
  title: {
    width: wp(36),
    borderRadius:10,
    height: hp(2.4),
    marginVertical:hp(0.8),
  }
});

export default CustomSkeletonLoader;