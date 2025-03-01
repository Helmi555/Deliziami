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
import { addToFavorite } from '../Utils'
import ProductDetails from '../screens/productDetails';
const screenDimension = getScreenDimension()

const ProductComponent = React.memo(({ product, navigation }) => {

  const [isFavorite, setIsFavorite] = useState(product.isFavorite != null ? product.isFavorite : false)
  const [isLoading, setIsLoading] = useState(true)
  /*   if (!fontsLoaded) {
       return  (  <SkeletonContent
        containerStyle={styles.skeletonContainer}
        isLoading={loading}
        layout={[
          { key: 'image', width: wp('36%'), height: wp('34%'), marginBottom: 10, borderRadius: 10 },
          { key: 'title', width: wp('40%'), height: 20, marginBottom: 6 },
          { key: 'price', width: wp('30%'), height: 20, marginBottom: 6 },
          { key: 'emoji', width: wp('8%'), height: wp('8%'), borderRadius: wp('4%') },
        ]}
      />)  

  return (<CustomSkeletonLoader />)
}
 */

  const handleImageLoad = () => {
    setIsLoading(false)
  }
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Product Details", { product })}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <FastImage
            style={styles.image}
            source={{
              uri: product.photoUrl,
              priority: FastImage.priority.high,
            }}
            onLoad={handleImageLoad}
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

          <IconButton icon="heart" mode="contained" onPress={() => addToFavorite(isFavorite, setIsFavorite, product.id)}

            containerColor={isFavorite ? '#e4643b' : "#EeEeDe"}

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
    width: wp("50%"),
    height: hp("29.6%"),
    backgroundColor: '#f9f9f9',
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
    marginBottom: hp(3.2)
  },
  image: {
    /* width: wp("36%"),
    height: wp("34%"), */
    width: screenDimension > 4.5 ? wp(36) : wp(34),
    height: screenDimension > 4.5 ? wp(34) : wp(32),
    borderRadius: wp(2),
    position: 'absolute',
    top: -wp(16),
    left: wp("3%"), // Adjust the left margin to position the image
    zIndex: 1,

  },

  skeletonContainer: {
    width: wp("50%"),
    height: hp("32.6%"),
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: wp("3%"),
    paddingTop: wp("3%"),
    elevation: 5,
    marginTop: hp("8%"),
    marginHorizontal: 10,
  },
  imageSkeleton: {
    width: wp("36%"),
    height: wp("34%"),
    position: 'absolute',
    top: -wp(14),
    left: wp("3%"),
    borderRadius: 10,
  },
  textWrapper: {
    marginTop: wp("15%"),
  },
  textSkeleton: {
    width: wp("40%"),
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  textSkeletonShort: {
    width: wp("30%"),
    height: 20,
    borderRadius: 4,
  },
  emojiSkeleton: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    marginBottom: 16,
  },
  footerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp("1%"),
  },
  priceSkeleton: {
    width: wp("20%"),
    height: 24,
    borderRadius: 4,
  },
  iconSkeleton: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
  },

});

export default ProductComponent;
