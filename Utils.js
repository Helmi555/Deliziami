import { getItem, storeItem } from "./AsyncStorageHelper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const addToFavorite = async (isFavorite, setIsFavorite, prodId) => {
    /* AsyncStorage.removeItem('favoriteProducts')
    prod = await getItem('favoriteProducts')
    console.log(prod)
    return */

    try {
        let product = await findProductById(prodId)
        if (!isFavorite) {
            if (!product.isFavorite) {
                updateProductIsFavorite(prodId, true)
            }
            setIsFavorite(true);
        } else {
            if (product.isFavorite) {
                updateProductIsFavorite(prodId, false)
            }
            setIsFavorite(false);
        }
    }
    catch (e) {
        console.log("Product not found with id : ", prodId)
    }
};
const findProductById = async (prodId) => {
    let allProducts = await getItem('allProducts');

    // Assuming 'allProducts' is already an object


    let foundProduct = null;

    // Loop through each category
    for (const category in allProducts) {
        if (allProducts.hasOwnProperty(category)) {
            const products = allProducts[category];

            // Loop through each product in the category
            for (const product of products) {
                if (product.id === prodId) {
                    foundProduct = product;
                    break;
                }
            }

            if (foundProduct) {
                break;
            }
        }
    }

    return foundProduct;
};



const updateProductIsFavorite = async (prodId, newAttribute) => {
    let allProducts = await getItem('allProducts');


    let updatedProducts = { ...allProducts }; // Copy the original products object
    let found = false;

    // Loop through each category
    for (const category in updatedProducts) {
        if (updatedProducts.hasOwnProperty(category)) {
            const products = updatedProducts[category];

            // Loop through each product in the category
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === prodId) {
                    // Update the product with the new attribute
                    products[i] = { ...products[i], isFavorite: newAttribute };
                    found = true;
                    break;
                }
            }

            if (found) break;
        }
    }

    // Save the updated products back to local storage
    await storeItem('allProducts', updatedProducts);
};


// Usage example
const productId = "desiredProductId";
findProductById(productId).then(product => {
    if (product) {
        console.log("Product found:", product);
    } else {
        console.log("Product not found");
    }
})

export { addToFavorite };
