// AppContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, storeItem } from "../AsyncStorageHelper";
import { getAllProducts } from '../screens/APIs/loginApis';

// Create the AppContext
const AppContext = createContext();


// Provider component
export const AppProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([])
    const [favorites, setFavorites] = useState([]);
    const [chart, setChart] = useState([]);
    const [settings, setSettings] = useState({});
    const [variants, setVariants] = useState([])
    const [response, setResponse] = useState(null)
    useEffect(() => {
        console.log("App contexts fetchData :")

        const fetchData = async () => {
            try {
                const storedFavorites = await getItem('favorites')
                //const storedProducts = await getItem("products")
                const storedChart = await getItem("chart")
                const storedVariants = await getItem("variants")
                const storedAllProducts = await getItem("allProducts")


                if (storedFavorites && storedFavorites.length > 0) {
                    setFavorites(storedFavorites)
                }
                if (!storedAllProducts || storedAllProducts.length == 0) {

                    await getAllProducts(setResponse)
                }
                else {
                    console.log("App context getAllProducts")
                    setAllProducts(storedAllProducts)
                }

                /* if (storedProducts) {
                    console.log("App context getProducts")
                    setAllProducts(storedProducts)
                } */
                if (chart) {
                    setChart(storedChart)
                }
                if (variants) {
                    setVariants(storedVariants)
                }

            } catch (error) {
                console.log("Error in AppContext fetchData:", error)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        console.log("App context getAllProducts effect")
        if (response) {
            if (response.status === 200) {
                const categorizedAllProducts = {
                    pizze_classiche: [],
                    pizze_speciali: [],
                    focacce: [],
                    fritti: [],
                    bevande: [],
                    teglia: [],
                    mezzelune: []
                };
                const categorized6Products = {
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
                    /*  if (categorized6Products[category] && categorized6Products[category].length < 6) {
                         categorized6Products[category].push(product);
                     } */
                    categorizedAllProducts[category].push(product)
                });

                //setProducts(categorized6Products)
                setAllProducts(categorizedAllProducts);

                storeItem("allProducts", categorizedAllProducts);
                //storeItem("products", categorized6Products);
            }
        }
    }, [response]);




    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const addToFavorites = (product) => {
        setFavorites((prevFavorites) => [...prevFavorites, product]);
    };

    const addToChart = (item) => {
        setChart((prevChart) => [...prevChart, item]);
    };

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
    };

    return (
        <AppContext.Provider
            value={{
                //products,
                allProducts,
                favorites,
                chart,
                settings,
                addProduct,
                addToFavorites,
                addToChart,
                updateSettings,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    return useContext(AppContext);
};
