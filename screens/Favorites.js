import React, { useState, UseEffect, useEffect } from "react";
import { View, Text, Image, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity, isKeyboardVisible } from 'react-native';
import { IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { getItem } from "../AsyncStorageHelper";
import ProductComponent2 from "../components/productComponent2";

const Favorites = () => {


    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            let prodList = await getItem('allProducts')
            prodList ? setProducts(prodList.bevande) : setProducts([])
            console.log("in favorites : ", prodList)
        }
        getProducts()

    }, [])

    const renderProductItem = ({ item }) => {
        return <ProductComponent2 product={item} />
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={[styles.container, {
                borderBottomLeftRadius: isKeyboardVisible ? 0 : hp("6.4%"),
                borderBottomRightRadius: isKeyboardVisible ? 0 : hp("6.4%")
            }]}>
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={item => item.id}

                />
            </View>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: "#2a2a2f",
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: "white",
        paddingHorizontal: wp(1),
        paddingVertical: hp(2),
        borderWidth: 0
    }


})


export default Favorites