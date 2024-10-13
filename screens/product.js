import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity, Pressable, StatusBar } from "react-native";
import { RFPercentage as fp, RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IconButton } from "react-native-paper";
import { useState } from "react";
import BevandeList from "../components/BevandeList";
const pizzaSizes = [
  { id: '1', label: '14 cm' },
  { id: '2', label: '16 cm' },
  { id: '3', label: '18 cm' },
];



export default function Product({ navigation }) {
  const [numberOfBevande, setNumberOfBevande] = useState(0)
  const [numberOfPizza, setNumberOfPizza] = useState(1)
  const [selectedSize, setSelectedSize] = useState(pizzaSizes[1].label)
  const [selectedBevanda, setSelectedBevanda] = useState([]);

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
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>

        <View style={styles.bottomView}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>

            <>
              <Text style={styles.pizzaName} >Pizza Napoletana</Text>
            </>
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <IconButton icon="minus" mode="contained-tonal" onPress={() => { numberOfPizza > 1 ? setNumberOfPizza(numberOfPizza - 1) : null }}

                  containerColor={'#e4643b'}
                  iconColor={"#fff"}
                  size={wp("5%")}
                  style={{ borderRadius: wp("2%") }}

                >
                </IconButton>
                <Text style={styles.pizzaNumber}> {numberOfPizza < 10 ? "0" + numberOfPizza : numberOfPizza} </Text>
                <IconButton icon="plus" mode="contained-tonal" onPress={() => { setNumberOfPizza(numberOfPizza + 1) }}

                  containerColor={'#e4643b'}

                  iconColor={"#fff"}
                  size={wp("5%")}
                  style={{ borderRadius: wp("2%") }}

                >
                </IconButton>
              </View>
            </>
          </View>
          <Text style={styles.numberBevande} >Bevande    x  {selectedBevanda.length == 0 ? "0" + selectedBevanda.length : selectedBevanda.length}</Text>

          <BevandeList selectedBevanda={selectedBevanda}
            setSelectedBevanda={setSelectedBevanda} />


        </View>
        <ImageBackground
          source={require("../assets/images/pizza_for_product_page.png")}
          style={styles.whiteRoundContainer}
          resizeMode="stretch"
        >
          <View style={styles.header} >
            <IconButton icon="arrow-left" mode="contained" onPress={() => handleReturn()}

              containerColor={'#fff'}

              iconColor={"#e4643b"}
              size={wp("7%")}
              style={{ borderRadius: wp("3.5%") }}

            >
            </IconButton>
            <IconButton icon="cart-variant" mode="contained" onPress={() => handleGoToCart()}

              containerColor={'#fff'}
              iconColor={"#e4643b"}
              size={wp("7%")}
              style={{ borderRadius: wp("3.5%") }}

            >
            </IconButton>
          </View>
          <View style={{ top: hp("34%") }}>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
              <View style={styles.unselectedSizeCont}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => changeFirstSize()}
                >

                  <Text style={styles.unselectedSize}>{pizzaSizes[0].label}</Text>

                </TouchableOpacity>
              </View>

              <View style={styles.unselectedSizeCont}>

                <TouchableOpacity
                  onPress={() => changeSecondSize()}
                  activeOpacity={0.4}
                >

                  <Text style={styles.unselectedSize}>{pizzaSizes[2].label}</Text>

                </TouchableOpacity>

              </View>

            </View>
            <View style={{ alignItems: "center" }}>
              <View style={styles.selectedSizeCont}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => { }}
                >

                  <Text style={styles.selectedSize}>{selectedSize}</Text>

                </TouchableOpacity>

              </View>
            </View>

          </View>
        </ImageBackground>


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
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    borderBottomLeftRadius: hp("6.4%"),
    borderBottomRightRadius: hp("6.4%"),
    backgroundColor: "#fefefe",
    zIndex: 1
  },
  whiteRoundContainer: {
    backgroundColor: "#fefefe",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: hp("35%"),
    borderBottomLeftRadius: wp("40%"),
    borderBottomRightRadius: wp("40%"),
    zIndex: 2,
    paddingHorizontal: wp("1%"),
    paddingTop: hp("1%"),
    paddingBottom: hp("2%"),
  },
  secondGrayRoundContainer: {
    backgroundColor: "#efefef",
    position: "relative",
    top: hp("0%"),
    left: 0,
    right: 0,
    bottom: hp("10%"),
    borderBottomLeftRadius: wp("40%"),
    borderBottomRightRadius: wp("40%"),
    zIndex: 3,
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1.5%")
  }
  , bottomView: {
    marginTop: ("60%"),
    paddingTop: hp(20)

  },
  pizzaName: {
    fontSize: fp(3.4),
    fontWeight: "800",
    //fontFamily: "Questrial_400Regular"
  },
  pizzaImage: {
    resizeMode: "contain",
    width: wp("70%"),
    height: wp("70%")
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("1%")
  },
  unselectedSize: {
    fontSize: fp(2.4),
    //fontFamily: "Questrial_400Regular",
    color: "#999",
    marginHorizontal: wp(1),
    fontWeight: "700"
  },
  selectedSize: {
    fontSize: fp(2.8),
    //fontFamily: "Questrial_400Regular",
    color: "#fff",
    marginHorizontal: wp(1),
    fontWeight: "700"

  },
  unselectedSizeCont: {
    borderRadius: wp("8%"),
    backgroundColor: "#eee",
    paddingVertical: wp(0.8),
    paddingHorizontal: wp(1.4),
    elevation: 5
  },
  selectedSizeCont: {
    borderRadius: wp("10%"),
    backgroundColor: "#e4643b",
    paddingVertical: wp(0.8),
    paddingHorizontal: wp(1.4),
    elevation: 5
  },
  pizzaNumber: {
    fontFamily: "Questrial_400Regular",
    fontSize: fp(3),
    fontWeight: "bold",
    paddingHorizontal: wp(2),

  },
  numberBevande: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    fontFamily: "Questrial_400Regular",
    fontSize: fp(2.6),

    color: "#666"
  }
})