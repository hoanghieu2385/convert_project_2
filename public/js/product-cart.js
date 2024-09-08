// product-cart.js
(function () {
    if (document.querySelector('script[data-cart-initialized]')) {
        console.log("Cart script already initialized. Skipping...");
        return;
    }
    document.currentScript.dataset.cartInitialized = 'true';

    console.log("Cart script loaded. Version: " + new Date().getTime());

    function initializeCart() {
        console.log("Initializing cart...");

        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        const cartIcon = document.getElementById('cart-icon');
        const cart = document.querySelector('.cart');
        const closeCartBtn = document.querySelector('.cart .close');
        const cartItems = document.querySelector('.cart-items');
        const subtotalElem = document.querySelector('.subtotal');
        const checkoutBtn = document.querySelector('.view-cart');

        function addToCart(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("addToCart function called at: " + new Date().getTime());
        
            const productContainer = e.target.closest('.productcontainer') || e.target.closest('.album-item');
            if (!productContainer) {
                console.error('Product container not found');
                return;
            }
        
            const productId = e.target.dataset.productId || productContainer.dataset.productId;
            const productTitle = productContainer.querySelector('.album-title, .title')?.textContent.trim() || '';
            const productPrice = productContainer.querySelector('.album-price, .price')?.textContent.trim() || '';
        
            // Extract numeric value from price
            const priceMatch = productPrice.match(/\$?(\d+(\.\d{1,2})?)/);
            if (!priceMatch) {
                console.error('Invalid price format:', productPrice);
                return;
            }
            const formattedPrice = '$' + priceMatch[1];
        
            const productImage = productContainer.querySelector('img')?.src || '';
            const quantity = productContainer.querySelector('.quantity-box .quantity') ?
                parseInt(productContainer.querySelector('.quantity-box .quantity').textContent) : 1;
        
            console.log('Product details:', { productId, productTitle, formattedPrice, productImage, quantity });
        
            if (!productTitle || !formattedPrice) {
                console.error('Missing product information');
                return;
            }
        
            updateCart(productId, productTitle, formattedPrice, productImage, quantity);
            updateSubtotal();
            openCart();
            saveCart();
        }

        function updateCart(productId, productTitle, productPrice, productImage, quantity) {
            const existingItem = Array.from(cartItems.children).find(item =>
                item.querySelector('h3') &&
                item.querySelector('h3').textContent === productTitle &&
                !item.style.display.includes('none')
            );

            if (existingItem) {
                const quantityInput = existingItem.querySelector('.quantity input');
                quantityInput.value = parseInt(quantityInput.value) + quantity;
                console.log('Updated quantity for existing item:', quantityInput.value);
            } else {
                const template = cartItems.querySelector('.item[style*="display: none"]');
                if (!template) {
                    console.error('Template item not found');
                    return;
                }
                const newItem = template.cloneNode(true);
                newItem.style.display = 'flex';

                newItem.querySelector('img').src = productImage;
                newItem.querySelector('h3').textContent = productTitle;
                newItem.querySelector('.price').textContent = productPrice;
                newItem.querySelector('.quantity input').value = quantity;
                newItem.dataset.productId = productId;

                cartItems.appendChild(newItem);
                console.log('New item added to cart');
            }
        }

        function saveCart() {
            const items = Array.from(cartItems.querySelectorAll('.item:not([style*="display: none"])'))
                .map(item => ({
                    id: item.dataset.productId,
                    title: item.querySelector('h3').textContent,
                    price: item.querySelector('.price').textContent,
                    quantity: item.querySelector('.quantity input').value,
                    image: item.querySelector('img').src
                }));
            localStorage.setItem('cart', JSON.stringify(items));
            console.log('Cart saved to localStorage');
        }

        function loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const items = JSON.parse(savedCart);
                items.forEach(item => {
                    updateCart(item.id, item.title, item.price, item.image, parseInt(item.quantity));
                });
                updateSubtotal();
                console.log('Cart loaded from localStorage');
            }
        }

        function updateSubtotal() {
            const cartCountElement = document.getElementById('cart-count');
            if (!cartCountElement) {
                console.error("Cart count element not found");
                return;
            }

            const items = cartItems.querySelectorAll('.item:not([style*="display: none"])');
            let totalItems = 0;
            let total = 0;

            items.forEach(function (item) {
                const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
                const quantity = parseInt(item.querySelector('.quantity input').value);
                totalItems += quantity;
                total += price * quantity;
            });

            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
            console.log('Cart count updated:', totalItems);

            subtotalElem.textContent = '$' + total.toFixed(2);
            console.log('New subtotal:', subtotalElem.textContent);
        }

        function openCart() {
            if (cart && !cart.classList.contains('open')) {
                cart.classList.add('open');
                console.log('Cart opened');
            }
        }

        function closeCart() {
            if (cart && cart.classList.contains('open')) {
                cart.classList.remove('open');
                console.log('Cart closed');
            }
        }

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', addToCart);
        });

        if (cartIcon) {
            cartIcon.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Cart icon clicked");
                cart.classList.contains('open') ? closeCart() : openCart();
            });
        } else {
            console.error("Cart icon not found");
        }

        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', closeCart);
        } else {
            console.error("Close cart button not found");
        }

        cartItems.addEventListener('click', function (e) {
            e.stopPropagation();
            const item = e.target.closest('.item');
            if (!item) return;

            if (e.target.classList.contains('increase') || e.target.classList.contains('decrease')) {
                const input = item.querySelector('.quantity input');
                const newValue = e.target.classList.contains('increase') ? 
                    parseInt(input.value) + 1 : 
                    Math.max(parseInt(input.value) - 1, 1);
                input.value = newValue;
                console.log(`${e.target.classList.contains('increase') ? 'Increased' : 'Decreased'} quantity:`, newValue);
            } else if (e.target.classList.contains('remove')) {
                item.remove();
                console.log('Item removed from cart');
            }
            updateSubtotal();
            saveCart();
        });

        document.addEventListener('click', function (e) {
            if (!e.target.classList.contains('quantity-input')) {
                updateSubtotal();
                saveCart();
            }
            if (cart && cart.classList.contains('open') && !cart.contains(e.target) && e.target !== cartIcon) {
                console.log('Closing cart due to outside click');
                closeCart();
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('minus-btn') || e.target.classList.contains('plus-btn')) {
                const quantityBox = e.target.closest('.quantity-box');
                const quantitySpan = quantityBox.querySelector('.quantity');
                let quantity = parseInt(quantitySpan.textContent);

                if (e.target.classList.contains('minus-btn') && quantity > 1) {
                    quantity--;
                } else if (e.target.classList.contains('plus-btn')) {
                    quantity++;
                }

                quantitySpan.textContent = quantity;
                updateSubtotal();
                saveCart();
            }
        });

        checkoutBtn.addEventListener('click', function () {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                fetch('includes/check_login_status.php')
                    .then(response => response.json())
                    .then(data => {
                        if (data.isLoggedIn) {
                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = '../checkout.php';

                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = 'cartData';
                            input.value = cartData;

                            form.appendChild(input);
                            document.body.appendChild(form);
                            form.submit();
                        } else {
                            window.location.href = 'login/login.php';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                    });
            } else {
                alert('Your cart is empty!');
            }
        });

        loadCart();
        updateSubtotal();

        console.log("Cart initialization complete");
    }

    document.addEventListener('DOMContentLoaded', initializeCart);
})();