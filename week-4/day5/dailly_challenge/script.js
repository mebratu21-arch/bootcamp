// =================== CONFIGURATION ===================
// IMPORTANT: Replace 'YOUR-API-KEY' with your actual ExchangeRate-API key
const API_KEY = 'f0ecb751d7a787fdc44bc5bf';
const API_BASE_URL = 'https://v6.exchangerate-api.com/v6';

// DOM Elements
const fromCurrencyEl = document.getElementById('fromCurrency');
const toCurrencyEl = document.getElementById('toCurrency');
const fromAmountEl = document.getElementById('fromAmount');
const toAmountEl = document.getElementById('toAmount');
const convertBtn = document.getElementById('convertBtn');
const switchBtn = document.getElementById('switchBtn');
const resultEl = document.getElementById('result');
const loaderEl = document.getElementById('loader');
const errorMessageEl = document.getElementById('errorMessage');

// State
let supportedCurrencies = [];
let lastConversionRate = null;

// =================== INITIALIZATION ===================
document.addEventListener('DOMContentLoaded', function() {
    fetchSupportedCurrencies();
    fromAmountEl.focus();
    
    // Add event listeners
    setupEventListeners();
});

// =================== EVENT LISTENERS SETUP ===================
function setupEventListeners() {
    // Convert button click
    convertBtn.addEventListener('click', performConversion);
    
    // Switch button click
    switchBtn.addEventListener('click', switchCurrencies);
    
    // Convert when "From" amount changes
    fromAmountEl.addEventListener('input', function() {
        if (this.value && parseFloat(this.value) > 0) {
            performConversion();
        } else {
            toAmountEl.value = '';
            resultEl.innerHTML = '<div class="result-amount">-</div><p class="result-text">Enter amount and click convert</p>';
        }
    });
    
    // Convert when currency selection changes
    fromCurrencyEl.addEventListener('change', performConversion);
    toCurrencyEl.addEventListener('change', performConversion);
    
    // Allow Enter key to trigger conversion
    fromAmountEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performConversion();
        }
    });
}

// =================== API FUNCTIONS ===================

/**
 * Fetches all supported currency codes and names from the API.
 * Populates the dropdown select elements with the data.
 */
async function fetchSupportedCurrencies() {
    showLoader(true);
    hideError();
    
    try {
        const response = await fetch(`${API_BASE_URL}/${API_KEY}/codes`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === "success") {
            supportedCurrencies = data.supported_codes;
            populateCurrencyDropdowns();
            
            // Set default selections
            setDefaultSelections();
            showLoader(false);
            
            // Perform initial conversion
            setTimeout(() => performConversion(), 500);
        } else {
            throw new Error(`API Error: ${data['error-type'] || 'Unknown error'}`);
        }
    } catch (error) {
        showError(`Failed to load currency list: ${error.message}. Please check your API key.`);
        showLoader(false);
    }
}

/**
 * Converts an amount from one currency to another using the Pair Conversion endpoint.
 * @param {string} from - Base currency code (e.g., "USD")
 * @param {string} to - Target currency code (e.g., "EUR")
 * @param {number} amount - Amount to convert
 * @returns {Promise<Object>} Conversion result with rate and converted amount
 */
async function convertCurrency(from, to, amount) {
    showLoader(true);
    hideError();
    
    try {
        // The API allows including amount directly in the URL for conversion
        const response = await fetch(`${API_BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === "success") {
            showLoader(false);
            lastConversionRate = data.conversion_rate;
            return {
                rate: data.conversion_rate,
                result: data.conversion_result,
                lastUpdate: data.time_last_update_utc
            };
        } else {
            throw new Error(`Conversion failed: ${data['error-type'] || 'Unknown error'}`);
        }
    } catch (error) {
        showLoader(false);
        showError(`Conversion error: ${error.message}`);
        return null;
    }
}

// =================== UI FUNCTIONS ===================

/**
 * Populates both "From" and "To" dropdowns with currency codes and names.
 */
function populateCurrencyDropdowns() {
    // Clear existing options
    fromCurrencyEl.innerHTML = '';
    toCurrencyEl.innerHTML = '';
    
    // Create and append options for each currency
    supportedCurrencies.forEach(currency => {
        const [code, name] = currency;
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        
        // Clone for both dropdowns
        fromCurrencyEl.appendChild(option.cloneNode(true));
        toCurrencyEl.appendChild(option);
    });
}

/**
 * Sets intelligent default selections for the dropdowns.
 */
function setDefaultSelections() {
    // Try to get user's location for default "from" currency
    const userLocale = navigator.language || 'en-US';
    let userCurrency = 'USD'; // Fallback
    
    if (userLocale.includes('en-GB')) userCurrency = 'GBP';
    else if (userLocale.includes('en-') || userLocale.includes('US')) userCurrency = 'USD';
    else if (userLocale.includes('eu') || userLocale.includes('DE') || userLocale.includes('FR')) userCurrency = 'EUR';
    else if (userLocale.includes('JP')) userCurrency = 'JPY';
    else if (userLocale.includes('CN')) userCurrency = 'CNY';
    
    // Set "from" currency
    if (supportedCurrencies.some(curr => curr[0] === userCurrency)) {
        fromCurrencyEl.value = userCurrency;
    } else {
        fromCurrencyEl.value = 'USD'; // Fallback
    }
    
    // Set "to" currency (default to EUR)
    toCurrencyEl.value = 'EUR';
}

/**
 * Performs the conversion and updates the UI with the result.
 */
async function performConversion() {
    const from = fromCurrencyEl.value;
    const to = toCurrencyEl.value;
    const amount = parseFloat(fromAmountEl.value);
    
    // Validate input
    if (isNaN(amount) || amount <= 0) {
        showError("Please enter a valid amount greater than 0.");
        return;
    }
    
    if (from === to) {
        toAmountEl.value = amount;
        updateResultDisplay(amount, from, to, 1);
        hideError();
        return;
    }
    
    // Disable button during conversion
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i> Converting...';
    
    const conversion = await convertCurrency(from, to, amount);
    
    // Re-enable button
    convertBtn.disabled = false;
    convertBtn.innerHTML = '<i class="fas fa-calculator"></i> Convert Currency';
    
    if (conversion) {
        toAmountEl.value = conversion.result.toFixed(2);
        updateResultDisplay(conversion.result, from, to, conversion.rate);
    }
}

/**
 * Updates the result display box with conversion details.
 */
function updateResultDisplay(resultAmount, fromCode, toCode, rate) {
    const formattedAmount = resultAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    resultEl.innerHTML = `
        <div class="result-amount">${formattedAmount} ${toCode}</div>
        <p class="result-text">
            ${parseFloat(fromAmountEl.value).toLocaleString()} ${fromCode} = 
            <strong>${formattedAmount} ${toCode}</strong><br>
            <small>1 ${fromCode} = ${rate.toFixed(6)} ${toCode}</small>
        </p>
    `;
}

/**
 * Switches the "From" and "To" currencies and recalculates.
 * This implements the requested "switch" button functionality.
 */
function switchCurrencies() {
    const fromCurrency = fromCurrencyEl.value;
    const fromAmount = fromAmountEl.value;
    const toCurrency = toCurrencyEl.value;
    
    // Swap currency selections
    fromCurrencyEl.value = toCurrency;
    toCurrencyEl.value = fromCurrency;
    
    // If we have a previous conversion rate, calculate the inverse
    if (lastConversionRate && fromAmount) {
        const newAmount = parseFloat(fromAmount) / lastConversionRate;
        fromAmountEl.value = newAmount.toFixed(2);
        
        // Trigger conversion with swapped values
        performConversion();
    } else if (fromAmount) {
        // Just swap the amounts if no rate is available
        const currentToAmount = toAmountEl.value;
        if (currentToAmount && currentToAmount !== '-') {
            fromAmountEl.value = currentToAmount;
        }
        performConversion();
    }
    
    // Focus on amount input for quick editing
    fromAmountEl.focus();
    fromAmountEl.select();
}

/**
 * Shows or hides the loading indicator.
 */
function showLoader(show) {
    loaderEl.style.display = show ? 'block' : 'none';
}

/**
 * Displays an error message to the user.
 */
function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.style.display = 'block';
    resultEl.innerHTML = '<div class="result-amount">-</div><p class="result-text">Error occurred</p>';
}

/**
 * Hides the error message.
 */
function hideError() {
    errorMessageEl.style.display = 'none';
}

// =================== UTILITY FUNCTIONS ===================

/**
 * Format currency amount with proper separators
 */
function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Debounce function to limit API calls during rapid input
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        convertCurrency,
        populateCurrencyDropdowns,
        switchCurrencies,
        formatCurrency
    };
}