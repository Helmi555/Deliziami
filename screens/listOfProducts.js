import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { IconButton, Text, Button, Searchbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomSkeletonLoader from '../components/CustomSkeletonLoader';
import { storeItem, getItem, removeItem, updateItem, clearAsyncStorage } from '../AsyncStorageHelper';
import ProductComponent2 from '../components/productComponent2';


const ListOfProducts = React.memo(({ navigation }) => {

  const [textSearch, setTextSearch] = useState('')
  const [isFavorite, setIseFavorite] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: "Pizze Classiche", type: "pizze_classiche" })
  const pizzasCategories = [{ id: 0, name: "Pizze Classiche", type: "pizze_classiche" }, { id: 1, name: 'Pizze Speciali', type: "pizze_speciali" }, { id: 2, name: 'Focacce', type: "focacce" }, { id: 3, name: 'Teglie', type: "teglia" }, { id: 4, name: 'Bevande', type: "bevande" }, { id: 5, name: 'Fritti', type: "fritti" }, { id: 6, name: 'Mezzelune', type: "mezzelune" }]
  const [products, setProducts] = useState({})

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#f9f9f9",
      },
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Searchbar placeholder='Cosa cerchi ?'
            value={textSearch} onChangeText={(t) => setTextSearch(t)}
            style={styles.searchBar}

            placeholderTextColor="#999"
            inputMode='search'
            inputStyle={{ fontFamily: "Questrial_400Regular", color: "black", fontSize: RFPercentage(2.5), fontWeight: "600" }}
            iconColor='#2a2a2a'
            elevation={1}
          />
        </View>
      ),
      headerLeft: () => (
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} size={wp(6)} iconColor='#e4643b' />
      ),


    });
  }, [textSearch, navigation])

  useEffect(() => {
    const getProducts = async () => {
      const products = await getItem("allProducts")
      if (products) {
        setProducts(products)
      }
    }
    getProducts()
    console.log("all products setted", products[0])


  }, [])

  const renderPizzaItem = ({ item }) => {
    return <ProductComponent2 product={item} navigation={navigation} />
  }



  /*  if (!fontsLoaded) {
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
   } */


  return (

    <View style={styles.container}>

      <View style={styles.categoriesContainer}>
        <View >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: wp(6) }}

          >
            {pizzasCategories.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => {
                setSelectedCategory(item)
              }}>
                <View style={[styles.categoryContainer, item.name == selectedCategory.name ? styles.selectedCategory : styles.unselectedCategory]}>
                  <Text style={[styles.pizzasName, item.name == selectedCategory.name && styles.pizzasNameActive]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            alignItems: 'center',     // Centers items horizontally
            paddingHorizontal: wp(2), // Adjust padding to control spacing from edges
          }}


          showsHorizontalScrollIndicator={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          ListHeaderComponent={() =>
            <View style={{ margin: wp(3) }}>

            </View>
          }
          ListFooterComponent={() =>
            <View style={{ margin: hp(1) }}>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ marginHorizontal: wp(2), marginVertical: hp(0.6) }}></View>}
          ListEmptyComponent={() => <Text>Nessun prodotto trovato</Text>}
          data={products[selectedCategory.type]}
          renderItem={renderPizzaItem}
          keyExtractor={(item) => item.id.toString()}
          windowSize={5}
          bounces={false}
        />

      </View>


    </View>


  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  headerContainer: {
    flex: 1,
    borderWidth: 0,
    width: wp(80),
    margin: wp(0.1),
    padding: wp(0.1),

  },
  searchBar: {
    backgroundColor: "#f5f5f5",
    marginVertical: hp(0.4),
    borderRadius: wp(6),
    height: hp(6),
    width: wp(80),
    maxWidth: '90%', // Adjust the width as needed

  },
  categoriesContainer: {
    flex: 1,
    borderWidth: 0,
    justifyContent: "center",
    alignContent: "center",
    borderColor: "green",
    marginTop: hp(2)
  },
  listContainer: {
    flex: 9,
    borderColor: "blue",
    borderWidth: 0,
    paddingHorizontal: wp(1)
  },
  categoryContainer: {
    marginHorizontal: wp(0.6),
    borderWidth: 1,
    paddingHorizontal: wp(0.8),
    paddingVertical: wp(0.6),
    borderRadius: wp(6)

  },
  selectedCategory: {
    backgroundColor: "#f5865f",
    borderWidth: 0,
    paddingHorizontal: wp(1.6),
    paddingVertical: wp(1.4)

  },
  unselectedCategory: {

  },
  pizzasName: {
    fontSize: RFPercentage(2.3),
    color: "#111",
    fontWeight: "00",
    fontFamily: "Questrial_400Regular",
    marginHorizontal: wp("1.2%"),
  },
  pizzasNameActive: {
    color: "#f5f5f5",
    fontWeight: "bold",
    fontSize: RFValue(18)
  }





  , image: {
    width: wp("36%"),
    height: wp("34%"),

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
  }

});

export default ListOfProducts;
