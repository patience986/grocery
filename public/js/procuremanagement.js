const form = document.getElementById("produceForm");
let error = 0;

const formValidation = (event) => {
  error = 0; // Reset the error count

  const showError = (element, errorElement, message) => {
    element.style.border = "1px solid red";
    errorElement.textContent = message;
    errorElement.style.display = "block";
    error++;
  };

  const hideError = (element, errorElement) => {
    element.style.border = "1px solid green";
    errorElement.textContent = "";
    errorElement.style.display = "none";
  };

  // Produce Name Validation (Alpha-numeric, minimum 2 characters)
  const produceName = document.getElementById("produce");
  const produceNameError = document.getElementById("productNameError");
  const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
  if (produceName.value === "" || !produceName.value.match(alphaNumericRegex) || produceName.value.length < 2) {
    showError(produceName, produceNameError, "Produce name must be at least 2 characters long and alpha-numeric.");
  } else {
    hideError(produceName, produceNameError);
  }

  // Produce Type Validation (Alphabetic only, minimum 2 characters)
  const produceType = document.getElementById("type");
  const typeError = document.getElementById("typeError");
  const alphabeticRegex = /^[a-zA-Z]+$/;
  if (produceType.value === "" || !produceType.value.match(alphabeticRegex) || produceType.value.length < 2) {
    showError(produceType, typeError, "Type must be at least 2 characters and alphabetic only.");
  } else {
    hideError(produceType, typeError);
  }

  // Date Validation (Not empty)
  const date = document.getElementById("date");
  const dateError = document.getElementById("dateError");
  if (date.value === "") {
    showError(date, dateError, "Please enter the date of purchase.");
  } else {
    hideError(date, dateError);
  }

  // Tonnage Validation (Numeric, not less than 3 digits)
  const tonnage = document.getElementById("tonnage");
  const tonnageError = document.getElementById("tonnageError");
  if (tonnage.value === "" || tonnage.value.length < 3 || isNaN(tonnage.value)) {
    showError(tonnage, tonnageError, "Tonnage must be numeric and at least 3 characters long.");
  } else {
    hideError(tonnage, tonnageError);
  }

  // Produce Cost Validation (Numeric, not less than 10,000 UGX)
  const cost = document.getElementById("cost");
  const costError = document.getElementById("costError");
  if (cost.value === "" || cost.value < 10000 || isNaN(cost.value)) {
    showError(cost, costError, "Produce cost must be numeric and at least 10,000 UGX.");
  } else {
    hideError(cost, costError);
  }

  // Contact Validation (10-digit valid phone number)
  const contact = document.getElementById("contact");
  const contactError = document.getElementById("contactError");
  const phoneRegex = /^\d{10}$/;
  if (contact.value === "" || !contact.value.match(phoneRegex)) {
    showError(contact, contactError, "Please enter a valid 10-digit phone number.");
  } else {
    hideError(contact, contactError);
  }

  // Selling Price Validation (Must be numeric)
  const sellingPrice = document.getElementById("selling_price");
  if (sellingPrice.value === "" || isNaN(sellingPrice.value)) {
    sellingPrice.style.border = "1px solid red";
    error++;
  } else {
    sellingPrice.style.border = "1px solid green";
  }

  // Prevent form submission if there are errors
  if (error > 0) {
    event.preventDefault();
  }
};

// Attach the validation function to the form submission event
form.addEventListener("submit", formValidation);
