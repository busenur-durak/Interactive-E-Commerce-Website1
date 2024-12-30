// Sepeti LocalStorage'den al
function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Sepetteki ürünleri göster
function displayCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Önce mevcut içeriği temizle

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = 'Total price: 0₺';
        return;
    }

    // Sepetteki ürünleri listele
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Fiyat: ${item.price}</p>
            <p>Adet: ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove the product</button>
        `;

        cartItemsContainer.appendChild(itemElement);

        // Toplam fiyatı güncelle
        const price = parseFloat(item.price.replace('₺', ''));
        totalPrice += price * item.quantity;
    });

    totalPriceElement.textContent = `Total Price: ${totalPrice}₺`;
}

// Ürünü kaldır
function removeItemFromCart(index) {
    const cartItems = getCartItems();
    cartItems.splice(index, 1); // Belirtilen index'teki ürünü kaldır
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems(); // Sepeti güncelle
}

// Sepeti temizle
function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems(); // Sepeti güncelle
}

// Event Listener'ları ekle
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Ürünü kaldır düğmelerine tıklama
    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            removeItemFromCart(index);
        }
    });

    // Sepeti temizle düğmesine tıklama
    document.getElementById('clear-cart').addEventListener('click', clearCart);
});
