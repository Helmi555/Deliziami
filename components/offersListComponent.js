import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const offers = [
  { id: '1', source: require('../assets/images/offre1.png') },
  { id: '2', source: require('../assets/images/offre2.png') },
  { id: '3', source: require('../assets/images/offre1.png') },
  { id: '4', source: require('../assets/images/offre2.png') },
  { id: '5', source: require('../assets/images/offre1.png') },
];

const OfferItem = memo(({ source, width }) => (
  <FastImage
    source={source}
    style={[styles.image, { width }]}
    resizeMode={FastImage.resizeMode.cover}
  />
));

const OfferSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Calculate the next index
        const nextIndex = prevIndex === offers.length - 1 ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Scroll to the current index
  useEffect(() => {
    if (flatListRef.current) {
      if (currentIndex === offers.length - 1) {
        flatListRef.current.scrollToIndex({ index: 0, animated: false });
        setCurrentIndex(0);
      } else {
        flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
      }
    }
  }, [currentIndex]);

  // Handle scrollToIndex failures
  const handleScrollToIndexFailed = (info) => {
    const offset = info.averageItemLength * info.index;
    flatListRef.current.scrollToOffset({ offset, animated: true });
    setTimeout(() => {
      flatListRef.current.scrollToIndex({ index: info.index, animated: true });
    }, 100);
  };

  const renderItem = useCallback(({ item }) => (
    <OfferItem source={item.source} width={width} />
  ), [width]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={offers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: hp('1%'),
  },
  image: {
    height: hp('20%'),
  },
});