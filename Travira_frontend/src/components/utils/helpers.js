/**
 * Utility Helper Functions
 * Smart Travel Tracking System
 */

// ============================================
// Date Formatting Functions
// ============================================

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (e.g., "Jan 15, 2024")
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Format date to short format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (e.g., "15/01/2024")
 */
export const formatDateShort = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB');
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    return formatDate(date);
};

/**
 * Calculate days between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of days
 */
export const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// ============================================
// Currency & Number Formatting
// ============================================

/**
 * Format currency to Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency (e.g., "₹1,234.56")
 */
export const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '₹0';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1,234,567")
 */
export const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Parse currency string to number
 * @param {string} currencyStr - Currency string (e.g., "₹1,234.56")
 * @returns {number} Parsed number
 */
export const parseCurrency = (currencyStr) => {
    if (!currencyStr) return 0;
    return parseFloat(currencyStr.replace(/[₹,]/g, '')) || 0;
};

// ============================================
// String Manipulation
// ============================================

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "JD" from "John Doe")
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

// ============================================
// Validation Functions
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { isValid, strength, message }
 */
export const validatePassword = (password) => {
    if (!password) return { isValid: false, strength: 'none', message: 'Password is required' };

    if (password.length < 6) {
        return { isValid: false, strength: 'weak', message: 'Password must be at least 6 characters' };
    }

    if (password.length < 8) {
        return { isValid: true, strength: 'medium', message: 'Password is acceptable but could be stronger' };
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength >= 3) {
        return { isValid: true, strength: 'strong', message: 'Strong password' };
    }

    return { isValid: true, strength: 'medium', message: 'Consider adding uppercase, numbers, or special characters' };
};

// ============================================
// Array & Object Utilities
// ============================================

/**
 * Group array of objects by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        if (order === 'asc') {
            return a[key] > b[key] ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
    });
};

/**
 * Remove duplicates from array
 * @param {Array} array - Array with duplicates
 * @param {string} key - Key to check for uniqueness (optional)
 * @returns {Array} Array without duplicates
 */
export const removeDuplicates = (array, key = null) => {
    if (!key) return [...new Set(array)];

    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
    });
};

// ============================================
// Expense Calculation Utilities
// ============================================

/**
 * Calculate total expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {number} Total amount
 */
export const calculateTotalExpenses = (expenses) => {
    if (!expenses || expenses.length === 0) return 0;
    return expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
};

/**
 * Calculate expense split among members
 * @param {number} totalAmount - Total amount to split
 * @param {number} memberCount - Number of members
 * @returns {number} Amount per person
 */
export const calculateSplit = (totalAmount, memberCount) => {
    if (!memberCount || memberCount === 0) return 0;
    return totalAmount / memberCount;
};

/**
 * Calculate who owes whom
 * @param {Array} expenses - Array of expense objects with paidBy and amount
 * @param {Array} members - Array of member names
 * @returns {Array} Array of settlement objects
 */
export const calculateSettlements = (expenses, members) => {
    const totalExpense = calculateTotalExpenses(expenses);
    const sharePerPerson = calculateSplit(totalExpense, members.length);

    const balances = {};
    members.forEach(member => {
        balances[member] = -sharePerPerson; // Everyone owes sharePerPerson initially
    });

    expenses.forEach(expense => {
        balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
    });

    const settlements = [];
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([person, balance]) => {
        if (balance > 0.01) creditors.push({ person, amount: balance });
        if (balance < -0.01) debtors.push({ person, amount: -balance });
    });

    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
        const credit = creditors[i].amount;
        const debt = debtors[j].amount;
        const settleAmount = Math.min(credit, debt);

        settlements.push({
            from: debtors[j].person,
            to: creditors[i].person,
            amount: settleAmount
        });

        creditors[i].amount -= settleAmount;
        debtors[j].amount -= settleAmount;

        if (creditors[i].amount < 0.01) i++;
        if (debtors[j].amount < 0.01) j++;
    }

    return settlements;
};

// ============================================
// Local Storage Utilities
// ============================================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Stored value or null
 */
export const getFromLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

// ============================================
// File Utilities
// ============================================

/**
 * Format file size to readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Check if file is image
 * @param {File} file - File object
 * @returns {boolean} True if image
 */
export const isImageFile = (file) => {
    return file && file.type.startsWith('image/');
};

/**
 * Check if file is PDF
 * @param {File} file - File object
 * @returns {boolean} True if PDF
 */
export const isPDFFile = (file) => {
    return file && file.type === 'application/pdf';
};

// ============================================
// Color Utilities
// ============================================

/**
 * Generate random color
 * @returns {string} Hex color code
 */
export const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Get avatar color based on name
 * @param {string} name - Name to generate color from
 * @returns {string} Tailwind color class
 */
export const getAvatarColor = (name) => {
    const colors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-indigo-500',
        'bg-teal-500'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
};

// ============================================
// Trip Status Utilities
// ============================================

/**
 * Get trip status based on dates
 * @param {string|Date} startDate - Trip start date
 * @param {string|Date} endDate - Trip end date
 * @returns {string} Status: 'upcoming', 'active', 'completed'
 */
export const getTripStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'completed';
    return 'active';
};

/**
 * Get status badge color
 * @param {string} status - Status string
 * @returns {string} Tailwind color classes
 */
export const getStatusColor = (status) => {
    const colors = {
        active: 'bg-green-500/20 text-green-400',
        upcoming: 'bg-blue-500/20 text-blue-400',
        completed: 'bg-gray-500/20 text-gray-400',
        pending: 'bg-yellow-500/20 text-yellow-400',
        cancelled: 'bg-red-500/20 text-red-400'
    };
    return colors[status] || colors.pending;
};

// ============================================
// Export all functions as default
// ============================================
export default {
    formatDate,
    formatDateShort,
    getRelativeTime,
    calculateDaysBetween,
    formatCurrency,
    formatNumber,
    parseCurrency,
    truncateText,
    capitalize,
    toTitleCase,
    getInitials,
    isValidEmail,
    isValidPhone,
    validatePassword,
    groupBy,
    sortBy,
    removeDuplicates,
    calculateTotalExpenses,
    calculateSplit,
    calculateSettlements,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    formatFileSize,
    isImageFile,
    isPDFFile,
    generateRandomColor,
    getAvatarColor,
    getTripStatus,
    getStatusColor
};