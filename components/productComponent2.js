import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import FastImage from 'react-native-fast-image';
//import SkeletonContent from 'react-native-skeleton-content';
import CustomSkeletonLoader from './CustomSkeletonLoader';
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getScreenDimension } from '../functions';


const screenDimension = getScreenDimension()
const ProductComponent2 = React.memo(({ product, navigation }) => {

  const [isFavorite, setIseFavorite] = useState(false)




  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Product")}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: product.photoUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.text} numberOfLines={1} >{product.name}
          </Text>
          <Text style={styles.sizeText}>{product.sizePrice[0].size}
          </Text>
        </View>
        {/* <View>
     <Text style={{fontSize:RFPercentage(3.2),marginRight:16,marginBottom:0}} >👋</Text>

     </View> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: hp("1%") }}>
          <Text style={[styles.priceText]}>€{product.sizePrice[0].price}</Text>

          <IconButton icon="heart" mode="contained" onPress={() => setIseFavorite(!isFavorite)}

            containerColor={isFavorite ? '#e4643b' : "#fff"}

            iconColor={!isFavorite ? '#e4643b' : "#f9f9f9"}
            size={wp("6.2%")}
            style={{ borderRadius: wp("3.5%") }}

          >
          </IconButton>


        </View>
      </View>
    </TouchableOpacity>

  );
})

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    height: screenDimension > 4.5 ? hp(24) : hp(27),
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: wp("3%"),
    paddingTop: wp("3%"),
    elevation: 5,
    marginTop: hp("8%"),
    marginHorizontal: 10,
    overflow: 'visible',
  },
  text: {
    fontSize: RFValue(20),
    color: '#2a2a2f',
    fontWeight: "700",
    fontFamily: "Questrial_400Regular",
    textAlign: "left"
  },
  sizeText: {
    fontSize: RFValue(17),
    color: '#2a2a2f',
    fontWeight: "600",
    fontFamily: "Questrial_400Regular",
    textAlign: "left"
  },
  priceText: {
    fontSize: RFPercentage(3.6),
    color: '#2a2a2f',
    fontWeight: "900",
    fontFamily: "Questrial_400Regular",
    alignItems: "flex-start",
  },
  imageWrapper: {
    marginBottom: hp(0.2)
  },
  image: {
    width: screenDimension > 4.5 ? wp("32%") : wp(32),
    height: screenDimension > 4.5 ? wp("30%") : wp(30),


    position: 'absolute',
    top: -wp(16),
    left: wp(1.6), // Adjust the left margin to position the image
    zIndex: 1,

  },

  textWrapper: {
    marginTop: wp("15%"),
  },

});

export default ProductComponent2;
