// Select the input elements from the HTML document
const zipCodeInput = document.querySelector('#zip'); // ZIP code input
const streetInput = document.querySelector('#street'); // Street input
const neighborhoodInput = document.querySelector('#neighborhood'); // Neighborhood input
const cityInput = document.querySelector('#city'); // City input
const messageDisplay = document.querySelector('#message'); // Message display area

// Cache for storing previously fetched ZIP code data
const cache = {};

// Function to fetch ZIP code data from the API
async function fetchZipCodeData(zipCode) {
    // Check if the data is already in the cache
    if (cache[zipCode]) {
        return cache[zipCode]; // Return cached data
    }

    // Show loading indicator
    messageDisplay.textContent = "Loading...";

    // Making a call to the API to fetch address details
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

    // Check if the response is not OK (e.g., if the ZIP code does not exist)
    if (!response.ok) {
        throw await response.json(); // Throw the error response
    }

    const data = await response.json(); // Parse the JSON response
    cache[zipCode] = data; // Store in cache for future requests
    return data; // Return the fetched data
}

// Debounce function to limit the rate of API calls
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}

// Function to handle the ZIP code input focus out event
const handleZipCodeFocusOut = async () => {
    try {
        // Checking if the value consists only of numbers and if it has exactly 8 digits
        const onlyNumbersRegex = /^[0-9]+$/; // Regex for only numbers
        const validZipCodeRegex = /^[0-9]{8}$/; // Regex for exactly 8 digits

        // Validate the ZIP code input
        if (!onlyNumbersRegex.test(zipCodeInput.value) || !validZipCodeRegex.test(zipCodeInput.value)) {
            throw { zipCodeError: 'INVALID ZIP CODE' }; // Throw an error if validation fails
        }

        // Fetch ZIP code data
        const zipCodeData = await fetchZipCodeData(zipCodeInput.value);

        // Extracting values from the API response and populating the respective input fields
        streetInput.value = zipCodeData.logradouro; // Set the street input
        neighborhoodInput.value = zipCodeData.bairro; // Set the neighborhood input
        cityInput.value = zipCodeData.localidade; // Set the city input

        // Clear any previous messages
        messageDisplay.textContent = "";
    } catch (error) {
        // If there's an error, inform the user
        if (error?.zipCodeError) {
            messageDisplay.textContent = error.zipCodeError; // Display the error message
            // After 5 seconds, the message will be cleared
            setTimeout(() => {
                messageDisplay.textContent = ""; // Clear the message
            }, 5000);
        } else {
            console.error(error); // Log any other errors to the console
        }
    }
};

// Add an event listener for when the ZIP code input loses focus with debouncing
zipCodeInput.addEventListener('focusout', debounce(handleZipCodeFocusOut, 300)); // Adjust delay as necessary