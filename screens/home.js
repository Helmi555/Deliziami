import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Pressable, Keyboard, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Icon, IconButton, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductComponent from "../components/productComponent.js"
import OfferSlider from '../components/offersListComponent.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { storeItem, getItem, removeItem, updateItem, clearAsyncStorage } from '../AsyncStorageHelper';
import { getAllProducts } from './APIs/loginApis';
import { useAuth } from '../contexts/authContext'; // Import the AuthProvider



export default function Home({ navigation }) {


  const { handleLogout, user } = useAuth()
  /** PIZZE_CLASSICHE:"pizze_classiche",
        PIZZE_SPECIALI:"pizze_speciali",
        FOCACCE:"focacce",
        FRITTI:"fritti",
        BEVANDE:"bevande",
        TEGLIA:"teglia",
        MEZZELUNE:"mezzelune" */
  const [language, setLanguage] = useState("it"); // State for current language
  const [textSearch, setTextSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: "Pizze Classiche", type: "pizze_classiche" })
  const pizzasCategories = [{ id: 0, name: "Pizze Classiche", type: "pizze_classiche" }, { id: 1, name: 'Pizze Speciali', type: "pizze_speciali" }, { id: 2, name: 'Focacce', type: "focacce" }, { id: 3, name: 'Teglie', type: "teglia" }, { id: 4, name: 'Bevande', type: "bevande" }, { id: 5, name: 'Fritti', type: "fritti" }, { id: 6, name: 'Mezzelune', type: "mezzelune" }]
  const [productsList, setProductsList] = useState({})
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [response, setResponse] = useState(null)




  useEffect(() => {
    console.log("Initial user state:", user);

    const fetchData = async () => {
      const productsDb = await getItem("products");



      // Handle product fetching
      if (productsDb) {
        setProductsList(productsDb);
      } else {
        await getAllProducts(setResponse);
      }

      // Log current user and products
      console.log("Current user:", user, "and products:", productsDb ? productsDb["fritti"].name : []);
    };

    fetchData();
  }, []); // This only runs once on component mount


  useEffect(() => {
    if (response) {
      if (response.status === 200) {

        const categorizedProducts = {
          pizze_classiche: [],
          pizze_speciali: [],
          focacce: [],
          fritti: [],
          bevande: [],
          teglia: [],
          mezzelune: []
        };
        const categorizedAllProducts = {
          pizze_classiche: [],
          pizze_speciali: [],
          focacce: [],
          fritti: [],
          bevande: [],
          teglia: [],
          mezzelune: []
        };
        const productsList = response.products
        // Group products by their category
        productsList.forEach((product) => {
          const category = product.category;
          if (categorizedProducts[category] && categorizedProducts[category].length < 6) {
            categorizedProducts[category].push(product);
          }
          categorizedAllProducts[category].push(product)
        });
        setProductsList(categorizedProducts);
        storeItem("products", categorizedProducts);
        storeItem("allProducts", categorizedAllProducts) // Save products in async storage
      }
    }
  }, [response]);

  /*  const filteredProducts = useMemo(() => {
     return productsList[selectedCategory.type] || [];
   }, [productsList, selectedCategory]);
   
  */
  // Function to switch language

  /*  useEffect(() => {
     const getLanguage = async () => {
       const firstLang = await getLang()
       if (firstLang) {
         i18n.changeLanguage(firstLang)
         setLanguage(firstLang)
       }
     }
     getLanguage()
   }, []) */

  const renderPizzaItem = ({ item }) => {
    //console.log("le iteeeem est ",item)
    return <ProductComponent product={item} navigation={navigation} />
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


  return (
    <SafeAreaView style={styles.mainContainer}>
      <PaperProvider>
        <View style={[styles.container, {
          borderBottomLeftRadius: isKeyboardVisible ? 0 : hp("6.4%"),
          borderBottomRightRadius: isKeyboardVisible ? 0 : hp("6.4%")
        }]}>
          <View style={styles.headerView}>
            <View style={styles.leftHeader}>
              <Text style={{ fontSize: wp("8%"), marginRight: 16 }} >👋</Text>
              <View>
                <Text style={styles.goodMorningtext}>Good Morning</Text>
                <Text style={styles.userNameText}>{user.username} {user.password}</Text>

              </View>
            </View>
            <View style={{ marginRight: wp(1), flexDirection: "row", justifyContent: "center", }}>
              <View>
                <IconButton icon="bell-ring-outline" size={wp(7.6)} iconColor={'#e06030'} onPress={() => { }} />
              </View>
              <View style={{ marginLeft: wp(2) }}>
                <IconButton icon="logout" size={wp(7.6)} iconColor={'#2a2a2f'} onPress={handleLogout} />
              </View>
            </View>

          </View>

          <View style={{ marginTop: hp(0.6) }}>
            <OfferSlider />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Searchbar placeholder='Cerchi una pizza ?'
              value={textSearch} onChangeText={(t) => setTextSearch(t)}
              style={styles.searchBar}
              placeholderTextColor="#999"
              inputMode='search'
              inputStyle={{ fontFamily: "Questrial_400Regular", color: "black", fontSize: RFPercentage(2.5), fontWeight: "600" }}
              iconColor='#2a2a2a'
              elevation={2}
              right={() => (
                <View style={styles.iconContainer}>
                  {textSearch ? (
                    <IconButton
                      icon="close" // Replace with your cancel icon name
                      size={wp("5%")}
                      onPress={() => {
                        setTextSearch('');
                      }}
                      iconColor="gray"
                    />
                  ) : (
                    <IconButton
                      icon="tune-variant"
                      size={wp("6%")}
                      onPress={() => console.log('Tune icon pressed')}
                      iconColor="#444" // Icon color
                    />
                  )}
                </View>
              )}


            />

          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-end", marginVertical: hp("0.6%") }} >
            <Text style={styles.populareText} >Popolari</Text>

            <ScrollView
              horizontal

              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: wp("2%") }}

            >
              {pizzasCategories.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => {
                  setSelectedCategory(item)
                }}>
                  <Text style={[styles.pizzasName, item.name == selectedCategory.name && styles.pizzasNameActive]}>
                    {item.name}
                  </Text>
                  {item.name === selectedCategory.name && <View style={styles.pizzasNameActiveBorder} />}
                </TouchableOpacity>
              ))}
            </ScrollView>

          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            ListHeaderComponent={() =>
              <View style={{ marginHorizontal: wp("2%") }}></View>
            }
            ItemSeparatorComponent={() => <View style={{ marginHorizontal: wp("1%") }}></View>}

            data={productsList[selectedCategory.type]}
            horizontal={true}
            renderItem={renderPizzaItem}
            keyExtractor={item => item.id}
            ListFooterComponent={() =>
              <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <IconButton icon="plus" size={wp(8)} iconColor={'#2a2a2f'} onPress={() => navigation.navigate("List of Products", { category: selectedCategory })} />
                <Text>Vedi di piu</Text>
              </View>
            }
            ListFooterComponentStyle={{ marginLeft: wp(1), marginRight: wp(3) }}
            bounces={false}
          />

        </View>
      </PaperProvider>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#2a2a2f",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    paddingBottom: hp("1%"),
    borderWidth: 0
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0

  },
  leftHeader: {
    flexDirection: "row",
    marginLeft: 25,
    alignItems: "center"
  },
  buttonCool: {
    backgroundColor: '#e4643b', // Primary button color
    borderRadius: 10, // Adds a subtle shadow effect
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  goodMorningtext: {
    fontSize: RFPercentage(2.5),
    color: '#b5b5b5',
    fontFamily: "Roboto"
  },
  userNameText: {
    fontFamily: "Questrial_400Regular",
    fontWeight: 'bold',
    fontSize: RFPercentage(3.5),
    color: "#282a2f"
  },
  button: {
    padding: 4,
    margin: 2,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#e4643b',
    elevation: 10,


  },
  iconButtonWrapper: {
    borderRadius: 20, // Change to your desired border radius
    shadowColor: '#222', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 10, // For Android shadow
  },
  populareText: {
    fontSize: RFPercentage(3.8),
    fontFamily: "Questrial_400Regular",
    color: "#2a2a2f",
    fontWeight: "900",
    marginLeft: wp("6%"),
    marginRight: wp("2%")
  },
  searchBar: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: wp("1%"),
    marginTop: hp(1),
    marginBottom: hp("0.4%"),
    borderRadius: wp("4%"),
    height: hp(7),
    width: wp(78),

  },
  pizzasName: {
    fontSize: RFPercentage(2.3),
    color: "#b2b2b2",
    fontWeight: "00",
    fontFamily: "Questrial_400Regular",
    marginHorizontal: wp("1.2%"),
  },
  pizzasNameActive: {
    color: "#e4643b",
    fontWeight: "bold"
  },
  pizzasNameActiveBorder: {
    borderBottomWidth: wp("1%"), // Adjust the thickness of the border
    borderColor: "#e4643b",
    width: '80%', // Make the border a bit less long than the text
    borderRadius: 20, // Rounded edges to create a cylindrical effect
    alignSelf: 'center', // Center the border under the text
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});



{/*       <View  style={styles.iconButtonWrapper}>
      <IconButton icon="heart" mode="contained" onPress={() => console.log('Pressed')}
        
        containerColor='#e4643b' iconColor='#fff'
        size={40}
        style={{borderRadius:16}}
      
        >
    </IconButton>
    </View> */}
{/* 
    <View style={{paddingHorizontal:100}}>
    <Pressable style={styles.button} onPress={() => switchLanguage('en')}>
      <Text style={styles.buttonText}>
        Switch to English
      
      </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => switchLanguage('fr')} >
      <Text  style={styles.buttonText}>
        Switch to French
        </Text>
      </Pressable  >
      <Pressable style={styles.button}  onPress={() => switchLanguage('it')} >
      <Text  style={styles.buttonText}>
        Switch to Italian
        
        </Text>
      </Pressable>
      </View> */}