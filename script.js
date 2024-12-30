
    // Function to add products to localStorage
    function addToCart(product) {
        // Get the existing cart from localStorage, or initialize an empty array if not present
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            // Update quantity if product already exists in cart
            existingProduct.quantity += 1;
        } else {
            // Add new product with quantity 1
            product.quantity = 1;
            cart.push(product);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to handle "Add to Cart" button click
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            // Get the product details from the DOM
            const productElement = this.closest('.product');
            const name = productElement.querySelector('h4').textContent;
            const price = productElement.querySelector('.discounted-price').textContent;
            const category = productElement.dataset.category;

            const product = {
                name: name,
                price: price,
                category: category
            };

            // Add the product to the cart
            addToCart(product);

            alert(`${name} has been added to the cart!`);
        });
    });

    // Apply Filters for Category and Price Range
    document.getElementById('applyFilters').addEventListener('click', function() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;

        // Get all products
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productCategory = product.dataset.category;
            const productPrice = parseInt(product.querySelector('.discounted-price').textContent.replace('₺', ''));

            // Show or hide products based on filters
            const showByCategory = (categoryFilter === 'all' || productCategory === categoryFilter);
            const showByPrice = (productPrice >= minPrice && productPrice <= maxPrice);

            if (showByCategory && showByPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

