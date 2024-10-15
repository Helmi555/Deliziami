import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getScreenDimension } from '../functions';

const screenDimension = getScreenDimension();

const CustomProdSkeleton2 = () => {
    return (
        <SkeletonPlaceholder borderRadius={4} >
            <View style={{ alignItems: 'center', height: hp(27) }}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                </View>
            </View>
        </SkeletonPlaceholder>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(42),
        height: screenDimension > 4.5 ? hp(24) : hp(27),
        padding: wp(1),
        borderWidth: 3

    },
    image: {
        width: wp(32),
        height: wp(24),
        borderRadius: 10,
    },
    title: {
        width: wp(36),
        borderRadius: 10,
        height: hp(2.4),
        marginVertical: hp(0.8),
    },
});

export default CustomProdSkeleton2;
