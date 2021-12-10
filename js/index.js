// ITERATION 1

function updateSubtotal(product) {
  // console.log('Calculating subtotal, yey!');
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');
  const subtotal = +price.textContent * +quantity.value;
  product.querySelector('.subtotal span').textContent = String(subtotal);
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  let total = 0;

  // getting all products in list
  const products = document.querySelectorAll('.product');
  for (const product of products) {
    // console.log(`product`, product);
    total += updateSubtotal(product);
  }

  // ITERATION 3
  // updating the total in DOM
  document.querySelector('#total-value span').textContent = String(total);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  // console.log('The target in remove is:', target);
  // getting to the grand-parent of the button to delete the entire row
  const productRow = target.closest('tr');
  // console.log(`productRow`, productRow);
  productRow.remove();
  // updating the new total after removal
  calculateAll();
}

// ITERATION 5

// Helper function to create properly the row in document
function createProductRowElement(name, price) {
  // creating the tr
  const tr = document.createElement('tr');
  tr.className = "product";
  
  // creating the td for name
  /*
      <td class="name">
        <span>${name}</span>
      </td>
   */
  const tdName = document.createElement('td');
  tdName.className = "name";
  const spanName = document.createElement('span');
  spanName.textContent = String(name);
  tdName.appendChild(spanName);
  // creating the td for price
  /*
      <td class="price">$<span>${price}</span></td>
   */
  const tdPrice = document.createElement('td');
  tdPrice.className = "price";
  tdPrice.textContent = '$';
  const spanPrice = document.createElement('span');
  spanPrice.textContent = String(price);
  tdPrice.appendChild(spanPrice);
  // creating the td for quantity
  /*
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
   */
  const tdQty = document.createElement('td');
  tdQty.className = "quantity";
  const inputQty = document.createElement('input');
  inputQty.setAttribute('type', 'number');
  inputQty.setAttribute('value', '0');
  inputQty.setAttribute('min', '0');
  inputQty.setAttribute('placeholder', 'Quantity');
  tdQty.appendChild(inputQty);
  // creating the td for subtotal
  /*
      <td class="subtotal">$<span>0</span></td>
   */
  const tdSubtotal = document.createElement('td');
  tdSubtotal.className = "subtotal";
  tdSubtotal.textContent = '$';
  const spanSubtotal = document.createElement('span');
  spanSubtotal.textContent = '0';
  tdSubtotal.appendChild(spanSubtotal);
  // creating the td for action
  /*
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
   */
  const tdAction = document.createElement('td');
  tdAction.className = "action";
  const btnAction = document.createElement('button');
  btnAction.classList.add('btn', 'btn-remove');
  btnAction.textContent = "Remove";
  btnAction.addEventListener('click', removeProduct);
  tdAction.appendChild(btnAction);
  
  // ajout des nouveaux td au tr du nouveau produit
  tr.appendChild(tdName);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQty);
  tr.appendChild(tdSubtotal);
  tr.appendChild(tdAction);
  
  // adding the new product as last line among all products
  document.getElementById('table-body').appendChild(tr);
}

function createProduct() {
  // console.log("Let's create a product!");
  // getting inputs
  const inputProductElement = document.querySelector(".create-product");
  // console.log(`inputProductElement`, inputProductElement);
  const nameInputElement = inputProductElement.firstElementChild.firstElementChild;
  const priceInputElement = inputProductElement.firstElementChild.nextElementSibling.firstElementChild;

  // creating the row for the new product
  createProductRowElement(nameInputElement.value, priceInputElement.value);

  // flushing the inputs fields
  nameInputElement.value = '';
  priceInputElement.value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  // listening to all Remove buttons
  const removeButtons = Array.from(document.getElementsByClassName('btn-remove'));
  for (button of removeButtons) {
    button.addEventListener('click', removeProduct);
  }

  // listening to the Create button
  const createBtn = document.getElementById('create');
  createBtn.addEventListener('click', createProduct);
});
