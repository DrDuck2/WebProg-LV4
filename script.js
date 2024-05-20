// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');


function attachButtonListeners(selector, listenerFunction){
    const addToCartButtons = document.querySelectorAll(selector);
    addToCartButtons.forEach(button => {
        button.addEventListener('click', listenerFunction);
    })
}

function fillItemsGrid(items) {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}" style="width: 15em; height: 15em;">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

    }
    attachButtonListeners('.add-to-cart-btn', addToCart);
}

function addToCart(event){
    const itemId = event.target.dataset.id;
    fetch('product.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id: itemId })
    })
        .then(response => {
            if(response.ok){
                console.log('Item added to cart successfully');
                // If response is ok update the cart amount display
                updateCartBadge();

            }else{
                console.error('Failed to add item to cart');
            }
        })
        .catch(error => console.error('Error', error));
}

function updateCartList(){
    cartItemsList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const itemImage = itemImages.find(img => img.id === item.id)

        let listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        let imageElement = document.createElement('img');

        imageElement.src = itemImage.src;
        imageElement.alt = item.name;
        imageElement.style.width = '5em';
        imageElement.style.height = '5em';

        listItem.appendChild(imageElement);

        let itemInfoDiv = document.createElement('div');
        itemInfoDiv.classList.add('item-info');

        itemInfoDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <p>Type: ${item.type} - Subtype: ${item.subtype}</p>
        `;

        listItem.appendChild(itemInfoDiv);

        let itemIncDec = document.createElement('div');
        itemIncDec.classList.add('incdec-buttons');

        itemIncDec.innerHTML = `
            <button class="increment-btn" data-id="${item.id}">+</button>
            <p>${item.quantity} </p>
            <button class="decrement-btn" data-id="${item.id}">-</button>
            <button class ="delete-btn" data-id="${item.id}">X</button>
        `;

        itemIncDec.querySelector('.increment-btn').addEventListener('click', () => incrementQuantity(item.id));
        itemIncDec.querySelector('.decrement-btn').addEventListener('click', () => decrementQuantity(item.id));
        itemIncDec.querySelector('.delete-btn').addEventListener('click', () => removeCartItem(item.id));

        listItem.appendChild(itemIncDec);

        cartItemsList.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });


    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function updateCartBadge(){

    fetch('cart_badge.php')
        .then(response => {
            if (response.ok) {
                return response.text(); // Extract the text from the response
            } else {
                throw new Error('Failed to fetch cart badge');
            }
        })
        .then(data => {
            cartBadge.textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchItems() {
    fetch('products.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            fillItemsGrid(data);
        })
        .catch(error => console.error('Error:', error));
}

function fetchCartItems(){
    fetch('fetch_cart_items.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            console.log('Cart Items:', data);
            // You can now use `data` to update your UI accordingly
            updateCartUI(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateCartUI(cartItems){
    cartItemsList.innerHTML = '';

    let totalPrice = 0;
    cartItems.forEach(item =>{

        let listItem = document.createElement('li');
        listItem.classList.add('cart-item');

        let imageElement = document.createElement('img');
        imageElement.src = item.image_url;
        imageElement.alt = item.name;
        imageElement.style.width = '5em';
        imageElement.style.height = '5em';

        listItem.appendChild(imageElement);

        let itemInfoDiv = document.createElement('div');
        itemInfoDiv.classList.add('item-info');

        itemInfoDiv.innerHTML = `
        <p>${item.name} - $${item.price}</p>
        <p>Type: ${item.type} - Subtype: ${item.subtype}</p>
        `;

        listItem.appendChild(itemInfoDiv);

        let itemIncDec = document.createElement('div');
        itemIncDec.classList.add('incdec-buttons');

        itemIncDec.innerHTML = `
            <button class="increment-btn" data-id="${item.item_id}">+</button>
            <p>${item.amount}</p>
            <button class="decrement-btn" data-id="${item.item_id}">-</button>
            <button class="delete-btn" data-id="${item.item_id}">X</button>
        `;
        itemIncDec.querySelector('.increment-btn').addEventListener('click', () => incrementQuantity(item.id));
        itemIncDec.querySelector('.decrement-btn').addEventListener('click', () => decrementQuantity(item.id));
        itemIncDec.querySelector('.delete-btn').addEventListener('click', () => removeCartItem(item.id));

        listItem.appendChild(itemIncDec);

        cartItemsList.appendChild(listItem);

        totalPrice += parseFloat(item.price) * item.amount;
    });

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function incrementQuantity(id){

}

function decrementQuantity(id){

}

function removeCartItem(id){

}

function openModal() {
  modal.classList.toggle('show-modal');
  fetchCartItems();
}

function closeModal(){
    modal.classList.toggle('show-modal');
}

fetchItems();

cartButton.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);