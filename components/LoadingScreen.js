// LoadingScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const pizzaAnimation = require('../assets/Lotties/Loading'); // Example Lottie animation

const { height, width } = Dimensions.get('window');

const LoadingScreen = () => {
    return (
        <LinearGradient
            //colors={['#e4643b', '#f39c6b', '#f2e394']}
            //colors={['#e4643b', '#ff8c66', '#ffba93']}
            //colors={['#e4643b', '#ff9d5b', '#2a2a2f']}
            colors={['#ffffff', '#f9f9f9', '#f1f1f1']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                {/* Lottie animation for the loading */}
                <Lottie
                    source={pizzaAnimation}
                    autoPlay
                    loop
                    style={styles.lottie}
                    speed={1.6}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: wp(50),
        height: wp(50),
    },
});

export default LoadingScreen;
