import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure you have this package installed
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getScreenDimension } from '../functions';

const screenDimension = getScreenDimension();

const CustomSkeletonLoader = () => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-wp(100), wp(100)], // Controls the shimmer movement
  });

  const shimmerStyle = {
    transform: [{ translateX }],
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust this for shimmer color
  };

  return (
    <View style={styles.container}>
      {/* Image Skeleton */}
      <View style={styles.image}>
        <LinearGradient
          colors={['#E1E9EE', '#f9f9f9', '#E1E9EE']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.2, 0.5, 0.8]}
        />
        <Animated.View style={shimmerStyle} />
      </View>

      {/* Title Skeleton 1 */}
      <View style={[styles.skeleton, styles.titleContainer, { width: wp(32) }]}>
        <Animated.View style={shimmerStyle} />
      </View>
      {/* Title Skeleton 2 */}
      <View style={[styles.skeleton, styles.titleContainer, { width: wp(24) }]}>
        <Animated.View style={shimmerStyle} />
      </View>

      {/* Price */}
      <View style={[styles.skeleton, { width: wp(7), height: wp(6), marginLeft: wp(10), borderRadius: 4 }]}>
        <Animated.View style={shimmerStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    height: screenDimension > 4.5 ? hp(24) : hp(27),
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: wp('3%'),
    paddingTop: wp(2),
    elevation: 5,
    marginTop: hp('8%'),
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  image: {
    width: wp(30),
    height: wp(24),
    borderRadius: 10,
    marginBottom: wp(0.6),
    overflow: 'hidden',
    backgroundColor: '#E1E9EE', // Fallback color
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    opacity: 0.7,
  },
  skeleton: {
    height: hp(2),
    backgroundColor: '#E1E9EE', // Fallback color for title
  },
  titleContainer: {
    borderRadius: 10,
    marginVertical: hp(0.6),
    overflow: 'hidden',
  },
});

export default CustomSkeletonLoader;













/* import React from 'react';
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

export default CustomSkeletonLoader; */