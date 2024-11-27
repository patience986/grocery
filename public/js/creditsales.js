document.getElementById('myForm').addEventListener('submit', function(event) {
  let valid = true;

  // Clear previous error messages
  document.querySelectorAll('.error').forEach(function(span) {
      span.style.display = 'none';
  });

  // Validate Buyer's Name
  const name = document.getElementById('name').value;
  const nameError = document.getElementById('errorName');
  if (name.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(name)) {
      nameError.textContent = "Buyer's Name must be at least 2 characters long and alphanumeric.";
      nameError.style.display = 'inline';
      valid = false;
  }

  // Validate National ID
  const nationalId = document.getElementById('nationalId').value;
  const nationalIdError = document.getElementById('errorNationalId');
  if (!/^[A-Z0-9]{8,15}$/.test(nationalId)) {
      nationalIdError.textContent = "National ID must be between 8 and 15 characters long and alphanumeric.";
      nationalIdError.style.display = 'inline';
      valid = false;
  }

  // Validate Location
  const location = document.getElementById('location').value;
  const locationError = document.getElementById('errorLocation');
  if (location.length < 2 || !/^[A-Za-z0-9\s]+$/.test(location)) {
      locationError.textContent = "Location must be at least 2 characters long and alphanumeric.";
      locationError.style.display = 'inline';
      valid = false;
  }

  // Validate Contact
  const contact = document.getElementById('contact').value;
  const contactError = document.getElementById('errorContact');
  if (!/^\+?([0-9]{10,15})$/.test(contact)) {
      contactError.textContent = "Contact must be a valid phone number format.";
      contactError.style.display = 'inline';
      valid = false;
  }

  // Validate Amount Due
  const amountDue = document.getElementById('amountDue').value;
  const amountDueError = document.getElementById('errorAmountDue');
  if (amountDue < 10000) {
      amountDueError.textContent = "Amount Due must be at least 10,000 UgX.";
      amountDueError.style.display = 'inline';
      valid = false;
  }

  // Validate Sales Agent
  const salesAgent = document.getElementById('salesAgent').value;
  const salesAgentError = document.getElementById('errorSalesAgent');
  if (salesAgent.length < 2 || !/^[A-Za-z0-9\s]+$/.test(salesAgent)) {
      salesAgentError.textContent = "Sales Agent must be at least 2 characters long and alphanumeric.";
      salesAgentError.style.display = 'inline';
      valid = false;
  }

  // Validate Product Name
  const productName = document.getElementById('produce').value;
  const productNameError = document.getElementById('errorProductName');
  if (productName === '') {
      productNameError.textContent = "Please select a Product Name.";
      productNameError.style.display = 'inline';
      valid = false;
  }

  // Validate Product Type
  const productType = document.getElementById('productType').value;
  const productTypeError = document.getElementById('errorProductType');
  if (productType.length < 2 || !/^[A-Za-z0-9\s]+$/.test(productType)) {
      productTypeError.textContent = "Product Type must be at least 2 characters long and alphanumeric.";
      productTypeError.style.display = 'inline';
      valid = false;
  }

  // Validate Tonnage
  const tonnage = document.getElementById('tonnage').value;
  const tonnageError = document.getElementById('errorTonnage');
  if (tonnage < 1) {
      tonnageError.textContent = "Tonnage must be at least 1 kg.";
      tonnageError.style.display = 'inline';
      valid = false;
  }

  // Validate Dispatch Date
  const dispatchDate = document.getElementById('dispatchDate').value;
  const dispatchDateError = document.getElementById('errorDispatchDate');
  if (!dispatchDate) {
      dispatchDateError.textContent = "Date of Dispatch is required.";
      dispatchDateError.style.display = 'inline';
      valid = false;
  }

  if (!valid) {
      event.preventDefault(); // Prevent form submission
  }
});
