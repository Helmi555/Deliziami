import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, Keyboard, ActivityIndicator, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { IconButton, Text, Button, Searchbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomSkeletonLoader from '../components/CustomSkeletonLoader';
import { storeItem, getItem, removeItem, updateItem, clearAsyncStorage } from '../AsyncStorageHelper';
import ProductComponent2 from '../components/productComponent2';


const pizzasCategories = [{ id: 0, name: "Pizze Classiche", type: "pizze_classiche" }, { id: 1, name: 'Pizze Speciali', type: "pizze_speciali" }, { id: 2, name: 'Focacce', type: "focacce" }, { id: 3, name: 'Teglie', type: "teglia" }, { id: 4, name: 'Bevande', type: "bevande" }, { id: 5, name: 'Fritti', type: "fritti" }, { id: 6, name: 'Mezzelune', type: "mezzelune" }]

const ListOfProducts = React.memo(({ navigation, route }) => {
  const { category } = route.params
  const [textSearch, setTextSearch] = useState('')
  const [isFavorite, setIseFavorite] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [products, setProducts] = useState({})
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
            inputStyle={{ fontFamily: "Questrial_400Regular", color: "black", textAlignVertical: "center", fontSize: RFPercentage(2.4), fontWeight: "600" }}
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
    console.log("all products setted")
  }, [])

  const renderPizzaItem = ({ item }) => {
    return <ProductComponent2 product={item} navigation={navigation} />
  }

  useEffect(() => {
    // Add event listeners
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    console.log(isKeyboardVisible)
    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


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
      <View style={[styles.container2, {
        borderBottomLeftRadius: isKeyboardVisible ? 0 : hp("6.4%"),
        borderBottomRightRadius: isKeyboardVisible ? 0 : hp("6.4%")
      }]}>
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
              alignItems: 'flex-start',     // Centers items horizontally
              paddingHorizontal: wp(2), // Adjust padding to control spacing from edges
            }}

            columnWrapperStyle={{
              justifyContent: 'center', // Ensure items spread evenly across the row

            }}
            showsHorizontalScrollIndicator={true}
            initialNumToRender={8}
            maxToRenderPerBatch={6}
            ListHeaderComponent={() =>
              <View style={{ margin: wp(2.4) }}>

              </View>
            }
            ListFooterComponent={() =>
              <View style={{ margin: hp(1) }}>
              </View>
            }
            ItemSeparatorComponent={() => <View style={{ marginHorizontal: wp(20), marginVertical: hp(0.6) }}></View>}
            ListEmptyComponent={() => { !products && <Text style={{ fontWeight: "bold", fontSize: RFValue(20) }}>Nessun prodotto trovato</Text> }}
            data={products[selectedCategory.type]}
            renderItem={renderPizzaItem}
            keyExtractor={(item) => item.id.toString()}

            windowSize={5}
            bounces={false}
          />

        </View>

      </View>
    </View>


  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2f",
    overflow: "hidden"
  },
  container2: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  headerContainer: {
    borderWidth: 0,
    width: wp(80),
    marginVertical: hp(2),
    padding: wp(0.1),

  },
  searchBar: {
    backgroundColor: "#f5f5f5",
    marginVertical: hp(2),
    borderRadius: wp(6),
    width: wp(90),
    height: hp(7),
    maxWidth: '95%', // Adjust the width as needed
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1


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
    alignItems: "center",
    paddingBottom: hp(1.4)
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

  }

});

export default ListOfProducts;
