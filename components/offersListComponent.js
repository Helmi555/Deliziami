import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
const offers = [
  { id: '1', source:require('../assets/images/offre1.png') },
  { id: '2', source: require('../assets/images/offre2.png') },
  { id: '3', source:require('../assets/images/offre1.png') },
  { id: '4', source: require('../assets/images/offre2.png') }
  // Add more images as needed
];

const OfferSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width } = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={offers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            
          <Image source={item.source}
          style={[styles.image, { width }]} />
          
        )}
      />
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("1%"),
  },
  image: {
    height: hp("20%"),
    resizeMode: 'cover',
  },
});
