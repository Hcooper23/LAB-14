/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tbody = document.querySelector('#cart tbody');
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// All for the show cart function
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
// TODO: Find the table body
// TODO: Iterate over the items in the cart
// TODO: Create a TR
// TODO: Create a TD for the delete link, quantity,  and the item
// TODO: Add the TR to the TBODY and each of the TD's to the TR
function showCart() {
  // Get the table body element
  const tbody = document.querySelector('#cart tbody');

  // Loop through each item in the cart
  for (let i = 0; i < state.cart.items.length; i++) {
    const item = state.cart.items[i];

    // Create a table row element
    const tr = document.createElement('tr');

    // Create a table cell element for the delete link
    const deleteTd = document.createElement('td');
    const deleteLink = document.createElement('a');
    deleteLink.textContent = 'X';
    deleteLink.setAttribute('href', '#');
    deleteLink.setAttribute('data-index', i);
    deleteTd.appendChild(deleteLink);

    // Create a table cell element for the item quantity
    const quantityTd = document.createElement('td');
    quantityTd.textContent = item.quantity;

    // Create a table cell element for the item name
    const itemTd = document.createElement('td');
    itemTd.textContent = item.product;

    // Add each table cell element to the table row, and add the table row to the table body
    tr.appendChild(deleteTd);
    tr.appendChild(quantityTd);
    tr.appendChild(itemTd);
    tbody.appendChild(tr);
  }
}

// TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
// TODO: Save the cart back to local storage
// TODO: Re-draw the cart table

function removeItemFromCart(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const index = event.target.getAttribute('data-index');
    state.cart.removeItem(index);
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();