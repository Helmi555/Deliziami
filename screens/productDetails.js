import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity, Pressable, StatusBar } from "react-native";
import { RFPercentage as fp, RFValue } from 'react-native-responsive-fontsize';
import { Text, SegmentedButtons, Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IconButton } from "react-native-paper";
import BevandeList from "../components/BevandeList";
import FastImage from "react-native-fast-image";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { ButtonGroup } from '@rneui/themed';
//import ColorThief from 'color-thief-browser';
import LinearGradient from 'react-native-linear-gradient';
import { getDominantColor } from "./APIs/loginApis";
const pizzaSizes = [
    { id: '1', label: '14 cm' },
    { id: '2', label: '16 cm' },
    { id: '3', label: '18 cm' },
];


const lightenColor = (rgbString, amount) => {
    // Extract the RGB values from the string using regex
    const rgbValues = rgbString.match(/\d+/g).map(Number); // Extracts numbers and converts them to integers

    // Make sure we have valid RGB values (length should be 3 for RGB)
    if (rgbValues.length >= 3) {
        const [r, g, b] = rgbValues;
        const newR = Math.min(r + amount, 255);
        const newG = Math.min(g + amount, 255);
        const newB = Math.min(b + amount, 255);

        // Return the new color in RGBA format, keeping the original alpha if present
        const alpha = rgbValues.length === 4 ? rgbValues[3] / 255 : 0.2; // Default to 0.5 opacity if not provided
        return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`;
    }

    return rgbString; // If the input is invalid, return the original string
};


export default function ProductDetails({ navigation, route }) {
    const { product } = route.params
    /* useEffect(() => {
        console.log(navigation.getParent())
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }                             
                1  1
                2  1
                3  2
                4  2
                5  3
        });
    }, [navigation]); */

    const [numberOfBevande, setNumberOfBevande] = useState(0)
    const [numberOfPizza, setNumberOfPizza] = useState(1)
    const [selectedIndex, setSelectedIndex] = useState(Math.trunc(product.sizePrice.length / 2));
    const [selectedSize, setSelectedSize] = useState(product.sizePrice[0])
    const [selectedBevanda, setSelectedBevanda] = useState([]);
    const [sizePrice, setSizePrice] = useState(product.sizePrice ? product.sizePrice : []);
    const [numberOfVariants, setNumberOfVariants] = useState(0)
    const [response, setResponse] = useState({ color: { rgb: "rgb(250,540,250)" } })
    const [bgColor, setBgColor] = useState("rgba(250,540,250,0.7803921568627451)"); // Default background color

    const returnSizes = () => {
        return product.sizePrice.map((item) => item.size)
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                await getDominantColor(product.photoUrl, setResponse)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        if (response.status === 200) {
            //console.log(response)
            setBgColor(lightenColor(response.color.rgb, 30))
        }

    }, [response])



    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#f9f9f9",

            },
            headerLeft: () => (
                <IconButton icon="arrow-left" onPress={() => navigation.goBack()} size={wp(7)} iconColor='#e4643b' />
            ),
            headerRight: () => (
                <IconButton icon="basket-outline" onPress={() => console.log('Right button pressed')} size={wp(7)} iconColor='#e4643b' style={{ marginRight: wp(2) }} />
            ),

        });
    }, [])
    const handleReturn = () => {
        navigation.goBack()
        console.log("Return button clicked")
    }
    const handleGoToCart = () => {
        console.log("Go to cart button clicked")
    }

    const changeFirstSize = () => {
        const aux = pizzaSizes[0]
        setSelectedSize(pizzaSizes[0].label)
        pizzaSizes[0] = pizzaSizes[1]
        pizzaSizes[1] = aux
    }

    const changeSecondSize = () => {
        const aux = pizzaSizes[2]
        setSelectedSize(pizzaSizes[2].label)
        pizzaSizes[2] = pizzaSizes[1]
        pizzaSizes[1] = aux
    }
    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar hidden={false} />
            <View style={styles.secondMainContainer}>

                <View style={[styles.topContainer, { backgroundColor: bgColor, borderColor: response.color.rgb, borderWidth: wp(0.3) }]}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: product.photoUrl,
                            priority: FastImage.priority.high,

                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                </View>
                <View style={{
                    flex: 4, backgroundColor: "#efefef",
                    borderBottomLeftRadius: hp("6.4%"),
                    borderBottomRightRadius: hp("6.4%"),
                }}>
                    <View style={styles.midContainer}>

                        <ButtonGroup
                            buttons={returnSizes()}
                            selectedIndex={selectedIndex}
                            onPress={setSelectedIndex}
                            containerStyle={styles.buttonGroupContainer(sizePrice.length)}
                            buttonStyle={styles.buttonStyle}
                            selectedButtonStyle={styles.selectedButtonStyle}
                            textStyle={styles.buttonTextStyle}
                            selectedTextStyle={styles.selectedButtonTextStyle}
                            innerBorderStyle={{
                                color: "transparent",
                                width: 0
                            }}
                            activeOpacity={2}
                            underlayColor={'#f1f1f1'} // Change the press underlay color

                        />
                    </View >
                    <View style={styles.bottomContainer}>
                        <View style={styles.nameQuantContainer}>
                            <View style={{ borderWidth: 0, maxWidth: wp(60) }}>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: RFValue(26), fontWeight: "bold", borderWidth: 0 }}>{product.name}</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 0, marginRight: wp(1) }}>
                                    <IconButton icon="minus" mode="contained-tonal" onPress={() => { numberOfPizza > 1 ? setNumberOfPizza(numberOfPizza - 1) : null }}

                                        containerColor={'#e4643b'}
                                        iconColor={"#fff"}
                                        size={wp(5.2)}
                                        style={{ borderRadius: wp("2%") }}

                                    >
                                    </IconButton>
                                    <Text style={styles.pizzaNumber}>{numberOfPizza < 10 ? "0" + numberOfPizza : numberOfPizza}</Text>
                                    <IconButton icon="plus" mode="contained-tonal" onPress={() => { setNumberOfPizza(numberOfPizza + 1) }}

                                        containerColor={'#e4643b'}

                                        iconColor={"#fff"}
                                        size={wp(5.2)}
                                        style={{ borderRadius: wp("2%") }}

                                    >
                                    </IconButton>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: hp(2) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ borderWidth: 0, maxWidth: wp(70) }}>
                                    <Text style={styles.description} numberOfLines={2}  >
                                        {product.description ? product.description : "No descriptions"}
                                    </Text>
                                </View>
                                <Text style={styles.price} >
                                    €{product.sizePrice[selectedIndex].price * numberOfPizza}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: hp(3), justifyContent: "space-between", alignItems: "center" }}>
                            <View>

                                <Text style={{ color: "#a0a0a0", fontSize: RFValue(20), fontWeight: "900" }}>
                                    Variants  x  <Text style={{ color: "#707070", fontSize: RFValue(20), fontWeight: "900" }}>{numberOfVariants < 10 ? "0" + numberOfVariants : numberOfVariants}</Text>
                                </Text>

                            </View>
                            <View>
                                <LinearGradient
                                    colors={['#ff9966', '#e4643b']} // Define the gradient colors
                                    style={styles.gradientButton}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}  // Gradient ends at bottom-right

                                >
                                    <Button mode="text"
                                        buttonColor="transparent" textColor="#fff" labelStyle={{ fontWeight: "500", fontSize: RFValue(15) }}
                                        onPress={() => setNumberOfVariants(numberOfVariants + 1)}
                                        style={{ borderRadius: wp(2) }}
                                    >
                                        Manage variants
                                    </Button>
                                </LinearGradient>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#2a2a2f",
    },
    secondMainContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        borderBottomLeftRadius: hp("6.4%"),
        borderBottomRightRadius: hp("6.4%"),

    },
    topContainer: {
        flex: 3,
        //backgroundColor: "#f9f9f9",
        borderWidth: 0,
        paddingHorizontal: wp(1),
        paddingVertical: hp(0.6),
        borderTopRightRadius: wp(1),
        borderTopLeftRadius: wp(1),
        marginHorizontal: wp(2),
        borderBottomLeftRadius: hp(10),
        borderBottomRightRadius: hp(10),
    },
    midContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        borderBottomLeftRadius: hp(200),
        borderBottomRightRadius: hp(200),
    },
    bottomContainer: {
        flex: 3,
        backgroundColor: "#efefef",
        borderWidth: 0,
        paddingTop: hp(1),
        paddingHorizontal: wp(4),
        borderBottomLeftRadius: hp("6.4%"),
        borderBottomRightRadius: hp("6.4%"),
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: wp(4),
        borderWidth: 0,
        borderColor: "#e55e5e",
        borderBottomLeftRadius: hp(10),
        borderBottomRightRadius: hp(10),

    },
    buttonGroupContainer: (size) => ({
        borderRadius: wp(8), // Curve the edges of the entire button group
        backgroundColor: 'transparent', // Make it transparent to show background
        marginHorizontal: wp(10),
        borderColor: "transparent", // Optional: Space around the button group
        borderWidth: 0,
        height: hp(5),
        width: wp(24) * size,

    }),
    buttonStyle: {
        backgroundColor: '#efefef', // Background for unselected buttons
        marginHorizontal: wp(1), // Space between buttons
        borderRadius: wp(12), // Curve the edges of individual buttons
        borderWidth: 0,

    },
    selectedButtonStyle: {
        backgroundColor: '#e4643b', // Background for selected button
        borderWidth: 0,
        opacity: 1, // Full opacity for selected button

    },
    buttonTextStyle: {
        color: '#909090', // Text color for unselected buttons
        fontWeight: 'bold',
        fontSize: RFValue(16)
    },
    selectedButtonTextStyle: {
        color: '#fff', // Text color for selected button
        fontWeight: 'bold',

    },
    nameQuantContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    pizzaNumber: {
        fontSize: RFValue(18),
        fontWeight: "bold"
    },
    description: {
        fontSize: RFValue(19),
        fontWeight: "700",
        color: "#707070"
    },
    gradientButton: {
        borderRadius: wp(3), // Same radius as your button
        padding: wp(1),
        elevation: 2 // Add some padding around the button for the gradient background
    },
    price: {
        fontSize: RFValue(25),
        fontWeight: "bold",
        marginRight: wp(2)

    }
})
