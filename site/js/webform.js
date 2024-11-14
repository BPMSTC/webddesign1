/**
 * AI Conference Registration Form Handler
 * 
 * This script manages form validation and submission for the AI Conference registration.
 * It implements real-time validation for all form fields and ensures data integrity
 * before submission.
 * 
 * Key Features:
 * - Real-time field validation
 * - Custom validation rules for each field type
 * - Visual feedback for validation states
 * - Session selection management (2-5 sessions required)
 * - Form submission handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get references to all form elements
    // Using const as these references won't change
    const form = document.getElementById('seminarForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const dateInput = document.getElementById('registration-date');
    const companyInput = document.getElementById('company');
    const checkboxes = document.querySelectorAll('input[name="sessions"]');
    const sessionCount = document.getElementById('sessionCount');
    
    // Define important dates as constants
    const CONFERENCE_DATE = new Date('2024-12-01');
    const TODAY = new Date();
    
    /**
     * Set up date input restrictions
     * - Minimum date: Today (can't register for past dates)
     * - Maximum date: Conference date (can't register after conference)
     * The dates are converted to YYYY-MM-DD format as required by the date input
     */
    dateInput.min = TODAY.toISOString().split('T')[0];
    dateInput.max = CONFERENCE_DATE.toISOString().split('T')[0];

    // Add real-time validation listeners
    // These fire every time the user types or modifies the field
    nameInput.addEventListener('input', function() {
        validateName(this.value);
    });

    emailInput.addEventListener('input', function() {
        validateEmail(this.value);
    });

    dateInput.addEventListener('input', function() {
        validateDate(this.value);
    });

    companyInput.addEventListener('input', function() {
        validateCompany(this.value);
    });

    /**
     * Name Validation Function
     * Rules:
     * - Must be between 2 and 25 characters
     * - Shows specific error messages for different validation failures
     * 
     * @param {string} name - The name to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateName(name) {
        const isValid = name.length >= 2 && name.length <= 25;
        const errorElement = document.getElementById('nameError');
        
        if (!isValid) {
            // Show specific error message based on the type of validation failure
            if (name.length < 2) {
                errorElement.textContent = 'Name must be at least 2 characters long';
            } else {
                errorElement.textContent = 'Name must not exceed 25 characters';
            }
            showError('nameError');
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
        } else {
            hideError('nameError');
            nameInput.classList.add('valid');
            nameInput.classList.remove('invalid');
        }
        return isValid;
    }

    /**
     * Email Validation Function
     * Uses a regular expression to verify email format:
     * - Must have characters before @
     * - Must have @ symbol
     * - Must have characters after @
     * - Must have a domain extension after a dot
     * 
     * @param {string} email - The email to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (!isValid) {
            showError('emailError');
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
        } else {
            hideError('emailError');
            emailInput.classList.add('valid');
            emailInput.classList.remove('invalid');
        }
        return isValid;
    }

    /**
     * Date Validation Function
     * Ensures the selected date:
     * - Is not in the past
     * - Is not after the conference date
     * 
     * @param {string} date - The date to validate in YYYY-MM-DD format
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateDate(date) {
        const selectedDate = new Date(date);
        const isValid = selectedDate >= TODAY && selectedDate <= CONFERENCE_DATE;
        
        if (!isValid) {
            // Show specific error message based on the type of date validation failure
            document.getElementById('dateError').textContent = 
                selectedDate < TODAY ? 'Date cannot be in the past' : 'Date cannot be after the conference';
            showError('dateError');
            dateInput.classList.add('invalid');
            dateInput.classList.remove('valid');
        } else {
            hideError('dateError');
            dateInput.classList.add('valid');
            dateInput.classList.remove('invalid');
        }
        return isValid;
    }

    /**
     * Company Validation Function
     * Simple validation to ensure the company field is not empty
     * 
     * @param {string} company - The company name to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateCompany(company) {
        const isValid = company.trim().length > 0;
        
        if (!isValid) {
            showError('companyError');
            companyInput.classList.add('invalid');
            companyInput.classList.remove('valid');
        } else {
            hideError('companyError');
            companyInput.classList.add('valid');
            companyInput.classList.remove('invalid');
        }
        return isValid;
    }

    /**
     * Session Selection Validation
     * Rules:
     * - Minimum 2 sessions required
     * - Maximum 5 sessions allowed
     * - Automatically disables checkboxes when max is reached
     * - Updates the session counter display
     * 
     * @returns {boolean} - True if valid number of sessions selected, false otherwise
     */
    function validateSessions() {
        const checked = document.querySelectorAll('input[name="sessions"]:checked').length;
        sessionCount.textContent = checked;
        
        const isValid = checked >= 2 && checked <= 5;
        
        if (isValid) {
            hideError('sessionsError');
            checkboxes.forEach(cb => {
                cb.closest('.checkbox-group').classList.add('valid');
                cb.closest('.checkbox-group').classList.remove('invalid');
            });
        } else {
            showError('sessionsError');
            checkboxes.forEach(cb => {
                cb.closest('.checkbox-group').classList.add('invalid');
                cb.closest('.checkbox-group').classList.remove('valid');
            });
        }
        
        // Disable/enable checkboxes based on selection count
        if (checked >= 5) {
            checkboxes.forEach(cb => {
                if (!cb.checked) cb.disabled = true;
            });
        } else {
            checkboxes.forEach(cb => cb.disabled = false);
        }
        
        return isValid;
    }
    
    // Add change event listeners to all session checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateSessions);
    });
    
    /**
     * Form Submission Handler
     * Validates all fields before allowing submission
     * Shows success message if all validations pass
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate all fields and store results
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isDateValid = validateDate(dateInput.value);
        const isCompanyValid = validateCompany(companyInput.value);
        const areSessionsValid = validateSessions();
        
        // Log validation results for debugging
        console.log('Validation Results:', {
            name: isNameValid,
            email: isEmailValid,
            date: isDateValid,
            company: isCompanyValid,
            sessions: areSessionsValid
        });
        
        // Only proceed if all validations pass
        if (isNameValid && isEmailValid && isDateValid && isCompanyValid && areSessionsValid) {
            // Show success message and hide form
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            form.style.display = 'none';
        } else {
            // If any validation fails, show all relevant error messages
            validateName(nameInput.value);
            validateEmail(emailInput.value);
            validateDate(dateInput.value);
            validateCompany(companyInput.value);
            validateSessions();
        }
    });
    
    /**
     * Form Reset Handler
     * Clears all validation states and error messages
     */
    form.addEventListener('reset', function() {
        // Use setTimeout to ensure this runs after the form is reset
        setTimeout(() => {
            // Reset all validation states and error messages
            hideError('nameError');
            hideError('emailError');
            hideError('dateError');
            hideError('companyError');
            hideError('sessionsError');
            
            // Remove all validation classes
            nameInput.classList.remove('valid', 'invalid');
            emailInput.classList.remove('valid', 'invalid');
            dateInput.classList.remove('valid', 'invalid');
            companyInput.classList.remove('valid', 'invalid');
            
            // Reset session checkboxes
            checkboxes.forEach(cb => {
                cb.closest('.checkbox-group').classList.remove('valid', 'invalid');
                cb.disabled = false;
            });
            
            // Reset session count
            sessionCount.textContent = '0';
        }, 0);
    });
});

/**
 * Utility function to show error messages
 * @param {string} errorId - The ID of the error element to show
 */
function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
}

/**
 * Utility function to hide error messages
 * @param {string} errorId - The ID of the error element to hide
 */
function hideError(errorId) {
    document.getElementById(errorId).style.display = 'none';
}