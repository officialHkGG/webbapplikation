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
      <button type="button" class="order-button">Order</button>
  `;

  return productElement;
}

function addOrderButtonListeners() {
  const productsContainer = document.getElementById('products');
  productsContainer.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('order-button')) {
          const productTitle = target.closest('.product').querySelector('h2').textContent;
          var productName = productTitle; // Update productName with the selected product title
          localStorage.setItem('productName', productName); // Store the updated productName in localStorage
          console.log("productName:", productName); // For debugging
          window.location.href = 'order.html';
      }
  });
}

productName = localStorage.getItem('productName');

window.onload = fetchAndDisplayProducts;

const productLabel = document.getElementById("productLabel");
productLabel.innerHTML += ` ${productName}`;
