import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import FastImage from 'react-native-fast-image';
//import SkeletonContent from 'react-native-skeleton-content';
import CustomSkeletonLoader from './CustomSkeletonLoader';
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getScreenDimension } from '../functions';
import CustomProdSkeleton2 from './CustomProdSkeleton2';
import CustomImageSkeleton from './CustomImageSkeleton';
import { addToFavorite } from '../Utils';

const screenDimension = getScreenDimension()
const ProductComponent2 = React.memo(({ product, navigation }) => {

  const [isFavorite, setIseFavorite] = useState(product.isFavorite != null ? product.isFavorite : false)
  const [isLoading, setIsLoading] = useState(false); // State to handle loading status

  const handleImageLoad = () => {
    //console.log("LOAD: setting isloading to false", isLoading)
    setIsLoading(false); // Set loading to false once the image is loaded
  };
  const handleImageLoadEnd = () => {
    setIsLoading(false); // Set loading to false once the image is loaded
  };

  const handleImageLoadError = () => {
    console.error('Image failed to load');
    setIsLoading(false);
  }


  /* if (isLoading) {
    return <CustomSkeletonLoader />
  } 
*/



  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Product Details", { product })}>
      < View style={styles.container} >
        <View style={styles.imageWrapper}>
          {/*{isLoading && <CustomImageSkeleton />}*/}
          <FastImage
            style={styles.image}
            source={{
              uri: product.photoUrl,
              priority: FastImage.priority.high,
            }}
            onLoad={handleImageLoad}
            onError={handleImageLoadError}
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
        < View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: hp("1%") }}>
          <Text style={[styles.priceText]}>€{product.sizePrice[0].price}</Text>

          <IconButton icon="heart" mode="contained" onPress={() =>
            addToFavorite(isFavorite, setIseFavorite, product.id)
          }

            containerColor={isFavorite ? '#e4643b' : "#fff"}

            iconColor={!isFavorite ? '#e4643b' : "#f9f9f9"}
            size={wp("6.2%")}
            style={{ borderRadius: wp("3.5%") }}

          >
          </IconButton>


        </View>
      </View >

    </TouchableOpacity >

  );
})

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    height: screenDimension > 4.5 ? hp(24) : hp(27),
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: wp(2),
    paddingTop: wp("3%"),
    elevation: 5,
    marginTop: hp("8%"),
    marginHorizontal: wp(2),
    overflow: 'visible',
  },
  text: {
    fontSize: RFValue(19),
    color: '#2a2a2f',
    fontWeight: "700",
    fontFamily: "Questrial_400Regular",
    textAlign: "left"
  },
  sizeText: {
    fontSize: RFValue(16),
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
    marginBottom: hp(0.2),
  },
  image: {
    width: screenDimension > 4.5 ? wp(34) : wp(32),
    height: screenDimension > 4.5 ? wp(32) : wp(30),
    borderRadius: wp(2),
    position: 'absolute',
    top: -wp(16),
    left: wp(1.6), // Adjust the left margin to position the image
    zIndex: 1,
    borderWidth: 0

  },
  hiddenImage: {
    position: 'absolute', // Position the image absolutely
    left: 0,
    top: 0,
    opacity: 0, // Hide the image while loading
  },

  textWrapper: {
    marginTop: wp("15%"),
  },

});

export default ProductComponent2;
