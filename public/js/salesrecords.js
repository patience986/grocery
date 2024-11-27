
// Get the form element
const form = document.getElementById('myForm');

// Get all form fields by their IDs
const producename = document.getElementById('producename');
const tonnage = document.getElementById('tonnage');
const amountPaid = document.getElementById('amountPaid');
const buyerName = document.getElementById('buyerName');
const salesAgent = document.getElementById('salesAgent');
const branch = document.getElementsByName('branch')[0]; // Fixed the ID
const dateTime = document.getElementById('dateTime');

// Get the error message spans by their IDs
const producenameError = document.getElementById('productnameError');
const tonnageError = document.getElementById('tonnageError');
const amountPaidError = document.getElementById('amountPaidError');
const buyerNameError = document.getElementById('buyerNameError');
const salesAgentError = document.getElementById('salesAgentError');
const branchError = document.getElementById('salesAgentError'); // Using the same error ID here
const dateTimeError = document.getElementById('dateTimeError');

// Add form submit event listener
form.addEventListener('submit', function(event) {
    // Prevent form submission by default
    event.preventDefault();

    // Initialize validation flag
    let isValid = true;

    // Clear all previous error messages
    clearErrors();

    // Validate Produce Name (must be selected)
    if (producename.value === '') {
        producenameError.textContent = 'Please select a produce.';
        producename.classList.add('error');
        isValid = false;
    }

    // Validate Tonnage (must be a positive number and not empty)
    if (tonnage.value === '' || tonnage.value <= 0) {
        tonnageError.textContent = 'Please enter a valid tonnage (kg).';
        tonnage.classList.add('error');
        isValid = false;
    }

    // Validate Amount Paid (must not be empty and at least 5 characters long)
    if (amountPaid.value === '' || amountPaid.value.length < 5) {
        amountPaidError.textContent = 'Amount Paid must be at least 5 characters long.';
        amountPaid.classList.add('error');
        isValid = false;
    }

    // Validate Buyer Name (alpha-numeric, minimum 2 characters)
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(buyerName.value)) {
        buyerNameError.textContent = 'Buyer name must be alphanumeric and at least 2 characters long.';
        buyerName.classList.add('error');
        isValid = false;
    }

    // Validate Sales Agent Name (alpha-numeric, minimum 2 characters)
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(salesAgent.value)) {
        salesAgentError.textContent = 'Sales agent name must be alphanumeric and at least 2 characters long.';
        salesAgent.classList.add('error');
        isValid = false;
    }

    // Validate Branch (alpha-numeric, minimum 2 characters)
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(branch.value)) {
        branchError.textContent = 'Branch name must be alphanumeric and at least 2 characters long.';
        branch.classList.add('error');
        isValid = false;
    }

    // Validate Date and Time (must not be empty)
    if (dateTime.value === '') {
        dateTimeError.textContent = 'Please select a valid date and time.';
        dateTime.classList.add('error');
        isValid = false;
    }

    // If all validations pass, submit the form
    if (isValid) {
        form.submit();
    }
});

// Function to clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });

    const formElements = document.querySelectorAll('input, select');
    formElements.forEach(element => {
        element.classList.remove('error');
    });
}
