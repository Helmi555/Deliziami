import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure you have this package installed
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getScreenDimension } from '../functions';

const screenDimension = getScreenDimension();

const CustomImageSkeleton = () => {
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
        width: screenDimension > 4.5 ? wp(34) : wp(32),
        height: screenDimension > 4.5 ? wp(32) : wp(30),
        borderRadius: 10,
        marginBottom: wp(0.6),
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

export default CustomImageSkeleton;
