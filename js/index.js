const itemsContainer = document.getElementById('items-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const lastOrderTotal = document.getElementById('last-order-total');
let total = 0;
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeItem(index));
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total;
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function checkout() {
    alert(`Total: $${total}\nGracias por tu compra`);
    lastOrderTotal.textContent = `Total: $${total}`;
    total = 0;
    cart = [];
    updateCart();
}

checkoutButton.addEventListener('click', checkout);

const items = [
    { id: 'pizza', name: 'Pizza', price: 6000, description: 'Irresistible pizza con sabores auténticos y queso fundido, una delicia para el paladar.', image: '../img/menu-images/pizza.jpg' },
    { id: 'burger', name: 'Burger', price: 7500, description: 'Jugosa hamburguesa gourmet con ingredientes frescos y sabrosa salsa, simplemente deliciosa.', image: '../img/menu-images/burger.png' },
    { id: 'arrollado', name: 'Arollado', price: 3500, description: 'Exquisito arrollado relleno con finas hierbas y sabrosas especias, una experiencia culinaria única.', image: '../img/menu-images/arrollado.jpg' },
    { id: 'ensalada', name: 'Ensalada', price: 4000, description: 'Ensalada fresca con ingredientes crujientes y aderezo ligero, un festín saludable y delicioso.', image: '../img/menu-images/ensalada.jpg' },
    { id: 'salmon', name: 'Salmon', price: 10000, description: 'Salmón a la parrilla con sabor ahumado y textura tierna, una opción elegante y saludable.', image: '../img/menu-images/salmon.jpg' },
    { id: 'huevos', name: 'Huevos', price: 4000, description: 'Huevos preparados a tu gusto, un desayuno clásico y nutritivo para empezar el día.', image: '../img/menu-images/eggs.png' },
    { id: 'burga', name: 'Burga', price: 6000, description: 'Jugosa hamburguesa gourmet con ingredientes frescos y sabrosa salsa, simplemente deliciosa.', image: '../img/menu-images/burga.jpg' },
    { id: 'soup', name: 'Soup', price: 2500, description: 'Sopa reconfortante con sabores auténticos y ingredientes frescos, el placer acogedor en cada cucharada.', image: '../img/menu-images/soup.png' },
];

function createItemCard(item) {
    const div = document.createElement('div');
    div.classList.add('card-container', 'col-lg-3', 'col-sm-4', 'col-6');
    div.innerHTML = `
    <div class="card">
        <div class="position-relative card-container-item">
            <img class="position-absolute h-100 top-0 start-0 bottom-0 end-0 card-img-top" src="${item.image}" alt="${item.name}" />
        </div>
        <div class="card-body d-flex flex-column">
            <h4 class="card-title cartita__titulo">${item.name}</h4>
            <p class="card-text cartita__parrafo flex-grow-1">${item.description}</p>
            <p class="price-tag">$${item.price}</p>
            <button id="${item.id}" class="card-button default-button">Order Now</button>
        </div>
    </div>
    `;
    return div;
}

function loadItems() {
    items.forEach(item => {
        const itemCard = createItemCard(item);
        itemsContainer.appendChild(itemCard);
    });
}

loadCart();
loadItems();

const cardButtons = document.querySelectorAll('.card-button')
cardButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        console.log(event)
        const itemId = event.target.id;
        const selectedItem = items.find(item => item.id === itemId);
        addToCart(selectedItem.name, selectedItem.price);
    });
});
