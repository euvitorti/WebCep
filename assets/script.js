// Select the input elements from the HTML document
const zipCodeInput = document.querySelector('#zip'); // ZIP code input
const streetInput = document.querySelector('#street'); // Street input
const neighborhoodInput = document.querySelector('#neighborhood'); // Neighborhood input
const cityInput = document.querySelector('#city'); // City input
const messageDisplay = document.querySelector('#message'); // Message display area

// Function to fetch ZIP code data from the API
async function fetchZipCodeData(zipCode) {
    // Show loading indicator
    messageDisplay.textContent = "Loading...";

    try {
        // Make a call to the API to fetch address details
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

        // Check if the response is not OK (e.g., if the ZIP code does not exist)
        if (!response.ok) {
            throw await response.json(); // Throw the error response
        }

        const data = await response.json(); // Parse the JSON response
        return data; // Return the fetched data
    } finally {
        messageDisplay.textContent = ""; // Clear the loading indicator
    }
}

// Function to handle the ZIP code input focus out event
const handleZipCodeFocusOut = async () => {
    try {
        // Checking if the value consists only of numbers and if it has exactly 8 digits
        const onlyNumbersRegex = /^[0-9]+$/; // Regex for only numbers
        const validZipCodeRegex = /^[0-9]{8}$/; // Regex for exactly 8 digits

        // Validate the ZIP code input
        if (!onlyNumbersRegex.test(zipCodeInput.value) || !validZipCodeRegex.test(zipCodeInput.value)) {
            throw { zipCodeError: 'Invalid ZIP code. Please enter exactly 8 digits.' }; // Throw an error if validation fails
        }

        // Fetch ZIP code data
        const zipCodeData = await fetchZipCodeData(zipCodeInput.value);

        // Populate the respective input fields with the API response
        streetInput.value = zipCodeData.logradouro || ""; // Set the street input
        neighborhoodInput.value = zipCodeData.bairro || ""; // Set the neighborhood input
        cityInput.value = zipCodeData.localidade || ""; // Set the city input

    } catch (error) {
        // If there's an error, show an alert
        if (error?.zipCodeError) {
            window.alert(error.zipCodeError); // Display the error message
        } else {
            window.alert("An error occurred while fetching ZIP code data."); // Generic error message
            console.error(error); // Log the error details to the console
        }
    }
};

// Add an event listener for when the ZIP code input loses focus
zipCodeInput.addEventListener('focusout', handleZipCodeFocusOut);
