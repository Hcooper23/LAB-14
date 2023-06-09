/* global Product, Cart */


'use strict';


// Set up an empty cart for use on this page.
state.cart = new Cart([]);


// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  // Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    const optionElement = document.createElement('option');
    optionElement.value = state.allProducts[i].name;
    optionElement.textContent = state.allProducts[i].name;
    selectElement.appendChild(optionElement);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();

}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // Suss out the item picked from the select list
  const selectedItem = document.getElementById('items').value;
  // Get the quantity
  const selectedQuantity = parseInt(document.getElementById('quantity').value);
  // Using those, add one item to the Cart
  state.cart.addItem(selectedItem, selectedQuantity);
}


// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // Get the item and quantity from the form
  const selectedItem = document.getElementById('items').value;
  const selectedQuantity = parseInt(document.getElementById('quantity').value);
  const selectedProduct = state.allProducts.find(product => product.name === selectedItem);

  // Add a new element to the cartContents div with that information
  const cartContentsElement = document.getElementById('cartContents');
  const newCartItemElement = document.createElement('p');
  newCartItemElement.innerHTML = `<img src="${selectedProduct.filePath}" alt="${selectedProduct.name}" width="50px" height="50px"> ${selectedItem} x ${selectedQuantity}`;
  cartContentsElement.appendChild(newCartItemElement);
}



// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();






