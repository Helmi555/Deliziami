import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { RFPercentage as fp, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Questrial_400Regular, useFonts } from '@expo-google-fonts/questrial';
import { IconButton } from "react-native-paper";
import { useState } from "react";
import Colors from "../constants/Colors";

const bevandeList = [
    { id: '1', source: require('../assets/images/bevande/coca-cola-png-41664.png'), price: "1.50" },
    { id: '2', source: require('../assets/images/bevande/pepsi-logo-icon-10438.png'), price: "1.85" },
    { id: '3', source: require('../assets/images/bevande/fanta_PNG17.png'), price: "2.30" },
    { id: '4', source: require('../assets/images/bevande/sprite_PNG98773.png'), price: "1.60" }
];

export default function BevandeList({ selectedBevanda, setSelectedBevanda }) {
    //    const [selectedBevanda, setSelectedBevanda] = useState([]);

    const handleSelectBevanda = (item) => {
        if (selectedBevanda.includes(item)) {
            setSelectedBevanda(prevSelected =>
                prevSelected.filter(bev => bev.id !== item.id)
            );
        }
        else {
            console.log('element pushed ', item, selectedBevanda)
            setSelectedBevanda(prevSelected => [...prevSelected, item]);
        }
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
        >
            {bevandeList.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.bevandeContainer, selectedBevanda.includes(item) ? { width: wp(18.2), height: wp(24.2), borderWidth: 1.6, borderColor: "orange", backgroundColor: "#Fde3aa" } : {}]}
                    onPress={() => handleSelectBevanda(item)}
                >
                    <Image source={item.source} style={styles.image} />
                    <Text style={styles.priceText}>€{item.price}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingHorizontal: wp(1),
        paddingVertical: hp(1),
    },
    bevandeContainer: {
        width: wp(18),  // Adjust width to fit 4 items on screen
        height: wp(24), // Set height proportionate to width
        marginHorizontal: wp(2),  // Spacing between items
        backgroundColor: '#f0f0f0', // Optional: add background color for better visibility
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,  // For Android shadow

    },
    image: {
        width: wp(18),
        height: wp(18),
        resizeMode: 'cover',
        marginTop: hp(0.8),
        marginBottom: hp(0.5)
    },
    priceText: {
        fontSize: fp(2),
        color: '#333',
        textAlign: 'center',
        fontFamily: "Questrial_400Regular",
        fontWeight: "700",
        marginBottom: hp(0.6)
    }
});
