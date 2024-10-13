import { LogBox } from "react-native";
import { currentAdmin_KEY } from "../../functions"
import moment from "moment";
import bcrypt from 'react-native-bcrypt';

// Generate a salt
LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);

// Pre-compute the hash at the start of the app
let hash;
let lastDate = moment().tz('Europe/Rome').format('YYYY/MM/DD')
const getHash = async () => {
    console.log("in the getHash the hash:", hash);

    if (!hash) {
        const adminKey = await currentAdmin_KEY(); // Await the async function
        const salt = bcrypt.genSaltSync(10); // Generate salt
        const computedHash = bcrypt.hashSync(adminKey, salt); // Compute hash
        return computedHash;
    }
    else {
        return hash
    }
};

// Call getHash during app initialization to set the hash
const initializeHash = async () => {
    hash = await getHash();
    // console.log("initialize app ended:", lastDate, "----", hash)

};
const updateHashIfNeeded = async () => {
    const currentDate = moment().tz('Europe/Rome').format('YYYY/MM/DD');
    if (currentDate !== lastDate) {
        console.log("Date has changed, updating hash.");
        hash = await getHash(); // Recompute the hash
        lastDate = currentDate; // Update the last date
    }
};
export const loginPost = async (username, password, setResponse) => {
    try {
        await updateHashIfNeeded()
        //const hash2 = await getHash()
        console.log("in the api hash:", hash)
        const url = 'https://deliziamipizza.onrender.com/api/v1/BackOffice/admins/login'; // Your API endpoint
        const payload = {
            username,
            password,
            adminKey: hash
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            setResponse({ status: 400, message: "Error while login" })
            console.log("problem y habibi", { status: 400, message: "Error while login" })

        }
        else {

            let data = await response.json();
            data.status = 200
            console.log('Success: response.json ', data);
            setResponse(data);
        }
    } catch (error) {
        console.error('Error:', error);
        setResponse('Failed to create user');
    }
};


export const getAllProducts = async (setResponse) => {
    try {
        await updateHashIfNeeded()
        const url = 'https://deliziamipizza.onrender.com/api/v1/BackOffice/products/getAllProducts'; // Your API endpoint
        const payload = {
            adminKey: hash
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            setResponse({ status: 400, message: "Error while fetching products" })
            console.log("problem y habibi", { status: 400, message: "Error while fetching products" }, response.json())

        }
        else {

            let data = await response.json();
            data.status = 200
            //        console.log('Success: response.json ', data);
            setResponse(data);
        }
    } catch (error) {
        console.error('Error:', error);
        setResponse('Failed to create user');
    }
};

module.exports = { loginPost, getAllProducts, initializeHash }
