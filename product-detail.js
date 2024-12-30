// Ürün detay bilgilerini al
const productName = document.querySelector('.product-title').textContent.trim();
const productPrice = document.querySelector('.discounted-price').textContent.trim();
const productImage = document.querySelector('.product-image img').src;

// "Sepete Ekle" butonunu seç
const addToCartButton = document.querySelector('.add-to-cart');

// Sepete ekleme işlevi
function addToCart(product) {
    // LocalStorage'den mevcut sepeti al
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sepette aynı ürün var mı kontrol et
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        // Ürün zaten sepetteyse miktarı artır
        existingProduct.quantity += 1;
    } else {
        // Yeni ürünü sepete ekle
        cart.push({ ...product, quantity: 1 });
    }

    // Güncellenmiş sepeti tekrar localStorage'a kaydet
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} sepete eklendi!`);
}

// "Sepete Ekle" butonuna tıklama olayını tanımla
addToCartButton.addEventListener('click', () => {
    // Ürün nesnesini oluştur
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
    };

    // Sepete ekle
    addToCart(product);
});
