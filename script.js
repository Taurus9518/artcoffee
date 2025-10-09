// Menu data
const menuItemsData = [
    {
        id: 1,
        name: 'Эспрессо',
        description: 'Классический крепкий кофе',
        price: 120,
        category: 'coffee',
        icon: '☕'
    },
    {
        id: 2,
        name: 'Американо',
        description: 'Эспрессо с горячей водой',
        price: 140,
        category: 'coffee',
        icon: '☕'
    },
    {
        id: 3,
        name: 'Капучино',
        description: 'Эспрессо с молоком и пеной',
        price: 160,
        category: 'coffee',
        icon: '☕'
    },
    {
        id: 4,
        name: 'Латте',
        description: 'Эспрессо с большим количеством молока',
        price: 180,
        category: 'coffee',
        icon: '☕'
    },
    {
        id: 5,
        name: 'Мокко',
        description: 'Кофе с шоколадом и молоком',
        price: 200,
        category: 'coffee',
        icon: '☕'
    },
    {
        id: 6,
        name: 'Тирамису',
        description: 'Классический итальянский десерт',
        price: 250,
        category: 'dessert',
        icon: '🍰'
    },
    {
        id: 7,
        name: 'Чизкейк',
        description: 'Нежный сырный торт',
        price: 220,
        category: 'dessert',
        icon: '🧀'
    },
    {
        id: 8,
        name: 'Круассан',
        description: 'Свежая выпечка с маслом',
        price: 80,
        category: 'dessert',
        icon: '🥐'
    },
    {
        id: 9,
        name: 'Горячий шоколад',
        description: 'Густой шоколадный напиток',
        price: 150,
        category: 'drinks',
        icon: '🍫'
    },
    {
        id: 10,
        name: 'Чай Earl Grey',
        description: 'Ароматный черный чай с бергамотом',
        price: 100,
        category: 'drinks',
        icon: '🍵'
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMenu();
    initializeConstructor();
    initializeCart();
    updateCartBadge();
    showSection('home'); // Show home by default
});

// SPA Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu functionality
function initializeMenu() {
    renderMenuItems();
    initializeCategoryFilter();
    initializeAddToCart();
}

function renderMenuItems() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const filteredItems = menuItemsData.filter(item => {
        const category = document.querySelector('.filter-btn.active')?.dataset.category;
        return category === 'all' || item.category === category;
    });
    
    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">${item.icon}</div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-price">${item.price}₽</div>
                <div class="menu-item-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                        Добавить
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

function initializeCategoryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update button styles
            filterBtns.forEach(b => {
                if (b.classList.contains('active')) {
                    b.className = 'btn btn-primary filter-btn active';
                } else {
                    b.className = 'btn btn-secondary filter-btn';
                }
            });
            // Re-render menu items
            renderMenuItems();
        });
    });
}

function initializeAddToCart() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const itemId = parseInt(button.dataset.id);
            const item = menuItemsData.find(item => item.id === itemId);
            
            if (item) {
                addToCart(item);
                showNotification(`${item.name} добавлен в корзину!`);
            }
        }
    });
}

// Constructor functionality
function initializeConstructor() {
    updateConstructorSummary();
    initializeConstructorEvents();
}

function initializeConstructorEvents() {
    // Base selection
    document.querySelectorAll('input[name="base"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    // Size selection
    document.querySelectorAll('input[name="size"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    // Milk selection
    document.querySelectorAll('input[name="milk"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    // Extras selection
    document.querySelectorAll('input[name="extras"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addConstructorToCart);
    }
    
    // Reset button
    const resetBtn = document.getElementById('reset-constructor');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetConstructor);
    }
}

function updateConstructorSummary() {
    const base = document.querySelector('input[name="base"]:checked')?.value || 'espresso';
    const size = document.querySelector('input[name="size"]:checked')?.value || 'medium';
    const milk = document.querySelector('input[name="milk"]:checked')?.value || 'regular';
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(input => input.value);
    
    // Update summary display
    const baseNames = {
        espresso: 'Эспрессо',
        americano: 'Американо',
        cappuccino: 'Капучино'
    };
    
    const sizeNames = {
        small: 'Маленький',
        medium: 'Средний',
        large: 'Большой'
    };
    
    const milkNames = {
        regular: 'Обычное молоко',
        oat: 'Овсяное молоко',
        almond: 'Миндальное молоко'
    };
    
    const extraNames = {
        vanilla: 'Ванильный сироп',
        caramel: 'Карамельный сироп',
        chocolate: 'Шоколадный сироп'
    };
    
    document.getElementById('summary-base').textContent = baseNames[base];
    document.getElementById('summary-size').textContent = sizeNames[size];
    document.getElementById('summary-milk').textContent = milkNames[milk];
    
    // Update extras
    const extrasElement = document.getElementById('summary-extras');
    const extrasTextElement = document.getElementById('summary-extras-text');
    
    if (extras.length > 0) {
        extrasTextElement.textContent = extras.map(extra => extraNames[extra]).join(', ');
        extrasElement.style.display = 'flex';
    } else {
        extrasElement.style.display = 'none';
    }
    
    // Calculate total price
    let total = 0;
    
    // Base price
    const basePrices = { espresso: 0, americano: 0, cappuccino: 0 };
    total += basePrices[base];
    
    // Size price
    const sizePrices = { small: 0, medium: 30, large: 60 };
    total += sizePrices[size];
    
    // Milk price
    const milkPrices = { regular: 0, oat: 20, almond: 25 };
    total += milkPrices[milk];
    
    // Extras price
    const extraPrices = { vanilla: 15, caramel: 15, chocolate: 20 };
    extras.forEach(extra => {
        total += extraPrices[extra];
    });
    
    document.getElementById('summary-total').textContent = `${total}₽`;
}

function addConstructorToCart() {
    const base = document.querySelector('input[name="base"]:checked')?.value || 'espresso';
    const size = document.querySelector('input[name="size"]:checked')?.value || 'medium';
    const milk = document.querySelector('input[name="milk"]:checked')?.value || 'regular';
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(input => input.value);
    
    const baseNames = {
        espresso: 'Эспрессо',
        americano: 'Американо',
        cappuccino: 'Капучино'
    };
    
    const sizeNames = {
        small: 'Маленький',
        medium: 'Средний',
        large: 'Большой'
    };
    
    const milkNames = {
        regular: 'Обычное молоко',
        oat: 'Овсяное молоко',
        almond: 'Миндальное молоко'
    };
    
    const extraNames = {
        vanilla: 'Ванильный сироп',
        caramel: 'Карамельный сироп',
        chocolate: 'Шоколадный сироп'
    };
    
    let name = `${baseNames[base]} (${sizeNames[size]}, ${milkNames[milk]})`;
    if (extras.length > 0) {
        name += ` + ${extras.map(extra => extraNames[extra]).join(', ')}`;
    }
    
    // Calculate price
    let price = 0;
    const sizePrices = { small: 0, medium: 30, large: 60 };
    const milkPrices = { regular: 0, oat: 20, almond: 25 };
    const extraPrices = { vanilla: 15, caramel: 15, chocolate: 20 };
    
    price += sizePrices[size];
    price += milkPrices[milk];
    extras.forEach(extra => {
        price += extraPrices[extra];
    });
    
    const customItem = {
        id: Date.now(),
        name: name,
        price: price,
        category: 'custom',
        icon: '☕',
        custom: true
    };
    
    addToCart(customItem);
    showNotification('Ваш кофе добавлен в корзину!');
}

function resetConstructor() {
    // Reset to default values
    document.querySelector('input[name="base"][value="espresso"]').checked = true;
    document.querySelector('input[name="size"][value="medium"]').checked = true;
    document.querySelector('input[name="milk"][value="regular"]').checked = true;
    
    // Uncheck all extras
    document.querySelectorAll('input[name="extras"]').forEach(input => {
        input.checked = false;
    });
    
    updateConstructorSummary();
}

// Cart functionality
function initializeCart() {
    renderCart();
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.extras || {}) === JSON.stringify(item.extras || {})
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    saveCart();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
}

function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            renderCart();
        }
    }
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары из меню или создайте свой кофе в конструкторе</p>
                <div class="empty-actions">
                    <a href="#" class="btn btn-primary" data-section="menu">Перейти к меню</a>
                    <a href="#" class="btn btn-secondary" data-section="constructor">Создать кофе</a>
                </div>
            </div>
        `;
    } else {
        let total = 0;
        
        cartContent.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">${item.icon}</div>
                    <div class="cart-item-content">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}₽ за шт.</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-number">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-total">
                        <div class="cart-item-total-price">${itemTotal}₽</div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('') + `
            <div class="card" style="margin-top: 2rem;">
                <div class="flex justify-between text-2xl font-bold text-coffee py-4 border-t-2 border-coffee">
                    <span>Общая сумма:</span>
                    <span>${total}₽</span>
                </div>
                <div class="flex gap-4 mt-6">
                    <button class="btn btn-primary flex-1" onclick="checkout()">
                        <i class="fas fa-credit-card"></i>
                        Оформить заказ
                    </button>
                    <button class="btn btn-outline" onclick="clearCart()">
                        <i class="fas fa-trash"></i>
                        Очистить корзину
                    </button>
                </div>
            </div>
        `;
    }
}

function clearCart() {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        cart = [];
        saveCart();
        renderCart();
        showNotification('Корзина очищена');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (confirm(`Оформить заказ на сумму ${total}₽?`)) {
        // Simulate checkout
        showNotification('Заказ оформлен! Спасибо за покупку!', 'success');
        cart = [];
        saveCart();
        renderCart();
    }
}

// Utility functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}