document.addEventListener("DOMContentLoaded", () => {
    // LocalStorage'da ürünlerin olup olmadığını kontrol et
    if (!localStorage.getItem("products")) {
        const products = [
            { id: 1, name: "A Necklace", description: "Beautiful necklace", category: "necklace", price: "₺15000" },
            { id: 2, name: "Natural Necklace", description: "Eco-friendly necklace", category: "necklace", price: "₺1850" },
            { id: 3, name: "Elegant Necklace", description: "Stylish necklace", category: "necklace", price: "₺17750" },
            { id: 4, name: "Ribbon Earring", description: "Elegant earrings", category: "earrings", price: "₺18950" },
            { id: 5, name: "Star Earring", description: "Shiny earrings", category: "earrings", price: "₺1850" },
            { id: 6, name: "Pearl Earring", description: "Classic pearl earrings", category: "earrings", price: "₺13250" },
            { id: 7, name: "Guess Watch", description: "Luxury watch", category: "watch", price: "₺17850" },
            { id: 8, name: "Calvin Klein Watch", description: "Modern watch", category: "watch", price: "₺17850" },
            { id: 9, name: "Fossil Watch", description: "Durable watch", category: "watch", price: "₺10050" },
            { id: 10, name: "Diamond Ring", description: "Beautiful diamond ring", category: "ring", price: "₺16750" },
            { id: 11, name: "5 Diamond Ring", description: "Luxury ring", category: "ring", price: "₺96150" },
            { id: 12, name: "Lovely Ring", description: "Charming ring", category: "ring", price: "₺70150" },
        ];

        localStorage.setItem("products", JSON.stringify(products));
        console.log("Ürünler LocalStorage'a kaydedildi.");
    }

    // Arama formunu yakala
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("search-bar").value.trim();
        if (query) {
            searchProducts(query);
        }
    });
});

function searchProducts(query) {
    // LocalStorage'dan ürünleri al
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Arama sorgusuna göre filtreleme
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    // Sonuçları gösterme
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Önceki sonuçları temizle

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Kategori: ${product.category}</p>
                <p>Fiyat: ${product.price}</p>
            `;

            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>Aradığınız ürün bulunamadı.</p>";
    }
}
