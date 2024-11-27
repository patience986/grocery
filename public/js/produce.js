const form = document.getElementById("produceForm");
let error = 0;

const formValidation = (event) => {
  error = 0; // Reset the error count
  
  // Produce Name Validation (Alpha-numeric, minimum 2 characters)
  const produceName = document.getElementById("produce");
  const produceNameError = document.getElementById("productNameError");
  const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
  if (produceName.value === "" || !produceName.value.match(alphaNumericRegex) || produceName.value.length < 2) {
    produceName.style.border = "1px solid red";
    produceNameError.textContent = "Produce name must be at least 2 characters long and alpha-numeric.";
    produceNameError.style.color = "red";
    error++;
  } else {
    produceName.style.border = "1px solid green";
    produceNameError.textContent = "";
  }

  // Produce Type Validation (Alphabetic only, minimum 2 characters)
  const produceType = document.getElementById("type");
  const typeError = document.getElementById("typeError");
  const alphabeticRegex = /^[a-zA-Z]+$/;
  if (produceType.value === "" || !produceType.value.match(alphabeticRegex) || produceType.value.length < 2) {
    produceType.style.border = "1px solid red";
    typeError.textContent = "Type must be at least 2 characters and alphabetic only.";
    typeError.style.color = "red";
    error++;
  } else {
    produceType.style.border = "1px solid green";
    typeError.textContent = "";
  }

  // Date Validation (Not empty)
  const date = document.getElementById("date");
  const dateError = document.getElementById("dateError");
  if (date.value === "") {
    date.style.border = "1px solid red";
    dateError.textContent = "Please enter the date of purchase.";
    dateError.style.color = "red";
    error++;
  } else {
    date.style.border = "1px solid green";
    dateError.textContent = "";
  }

  // Tonnage Validation (Numeric, not less than 3 digits)
  const tonnage = document.getElementById("tonnage");
  const tonnageError = document.getElementById("tonnageError");
  if (tonnage.value === "" || tonnage.value.length < 3 || isNaN(tonnage.value)) {
    tonnage.style.border = "1px solid red";
    tonnageError.textContent = "Tonnage must be numeric and at least 3 characters long.";
    tonnageError.style.color = "red";
    error++;
  } else {
    tonnage.style.border = "1px solid green";
    tonnageError.textContent = "";
  }

  // Produce Cost Validation (Numeric, not less than 5 digits)
  const cost = document.getElementById("cost");
  const costError = document.getElementById("costError");
  if (cost.value === "" || cost.value < 10000 || isNaN(cost.value)) {
    cost.style.border = "1px solid red";
    costError.textContent = "Produce cost must be at least 10,000 UGX and numeric.";
    costError.style.color = "red";
    error++;
  } else {
    cost.style.border = "1px solid green";
    costError.textContent = "";
  }

  // Branch Validation (Branch already selected so not validated)

  // // Contact Validation (10-digit valid phone number)
  // const contact = document.getElementById("contact");
  // const contactError = document.getElementById("contactError");
  // const phoneRegex = /^\d{10}$/;
  // if (contact.value === "" || !contact.value.match(phoneRegex)) {
  //   contact.style.border = "1px solid red";
  //   contactError.textContent = "Please enter a valid 10-digit phone number.";
  //   contactError.style.color = "red";
  //   error++;
  // } else {
  //   contact.style.border = "1px solid green";
  //   contactError.textContent = "";
  // }

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
