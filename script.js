function fetchAndDisplayProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const productsContainer = document.getElementById('products');
      products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });
      addOrderButtonListeners(); // Add event listener after appending products
    })
    .catch(error => {
      console.error('An error occurred while fetching products:', error);
    });
}

function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  productElement.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}">
    <p>Price: ${product.price}</p>
    <p>Category: ${product.category}</p>
    <p>Description: ${product.description}</p>
    <button type="button" class="order-button">Order</button>`;

  return productElement;
}

function addOrderButtonListeners() {
  const productsContainer = document.getElementById('products');
  productsContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('order-button')) {
      const productTitle = target.closest('.product').querySelector('h2').textContent;
      localStorage.setItem('productName', productTitle); // Store the product name in localStorage
      window.location.href = 'order.html';
    }
  });
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const postalCode = document.getElementById('postalCode').value.trim();
  const city = document.getElementById('city').value.trim();

  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d()-]{0,50}$/;
  const addressRegex = /^.{2,50}$/;
  const postalCodeRegex = /^\d{5}$/;
  const cityRegex = /^.{2,50}$/;

  if (!nameRegex.test(name)) {
    alert('Please enter a valid name (2-50 characters).');
    return false;
  }
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address (max 50 characters).');
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number (max 50 characters).');
    return false;
  }
  if (!addressRegex.test(address)) {
    alert('Please enter a valid address (2-50 characters).');
    return false;
  }
  if (!postalCodeRegex.test(postalCode)) {
    alert('Please enter a valid postal code (exactly 5 digits).');
    return false;
  }
  if (!cityRegex.test(city)) {
    alert('Please enter a valid city (2-50 characters).');
    return false;
  }

  // Additional validation for Swedish address and postal code
  const swedishAddressRegex = /^.{2,50}$/;
  const swedishPostalCodeRegex = /^\d{5}$/;

  if (!swedishAddressRegex.test(address) || !swedishPostalCodeRegex.test(postalCode)) {
    alert('Please enter a valid Swedish address and postal code.');
    return false;
  }

  return true; // Form is valid
}

function submitOrderForm(event) {
  event.preventDefault(); // Prevent default form submission
  if (validateForm()) {
    // Form is valid, proceed with submission
    alert('Din beställning är mottagen! Tack för din beställning.'); // Confirmation message

    // Clear the form fields after submission (optional)
    document.getElementById('orderForm').reset();

    // Redirect back to the start page after a brief delay
    setTimeout(function() {
      window.location.href = 'Startsida.html';
    }, 3000);
  }
}

window.onload = function() {
  fetchAndDisplayProducts();
  const productName = localStorage.getItem('productName');
  document.getElementById("productLabel").textContent += productName ? ` ${productName}` : '';
  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', submitOrderForm);
};
// Function to handle scroll event
window.onscroll = function() {
  // Get the slider element
  var slider = document.getElementById("slider");
  
  // If the user scrolls down, show the slider
  if (window.scrollY > 20) {
    slider.classList.add("show");
  } else {
    // Otherwise, hide the slider
    slider.classList.remove("show");
  }
}
