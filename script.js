// Menu data
const menuItems = [
    { id: 'espresso', name: 'Эспрессо', description: 'Классический итальянский кофе, крепкий и ароматный', price: 150, category: 'coffee' },
    { id: 'americano', name: 'Американо', description: 'Эспрессо с добавлением горячей воды', price: 180, category: 'coffee' },
    { id: 'cappuccino', name: 'Капучино', description: 'Эспрессо с молочной пеной и молоком', price: 200, category: 'coffee' },
    { id: 'latte', name: 'Латте', description: 'Эспрессо с большим количеством молока', price: 220, category: 'coffee' },
    { id: 'mocha', name: 'Мокко', description: 'Эспрессо с шоколадом и молоком', price: 250, category: 'coffee' },
    { id: 'macchiato', name: 'Макиато', description: 'Эспрессо с каплей молочной пены', price: 190, category: 'coffee' },
    { id: 'croissant', name: 'Круассан', description: 'Свежий французский круассан с маслом', price: 120, category: 'dessert' },
    { id: 'cheesecake', name: 'Чизкейк', description: 'Нежный чизкейк с ягодным соусом', price: 180, category: 'dessert' },
    { id: 'tiramisu', name: 'Тирамису', description: 'Классический итальянский десерт', price: 200, category: 'dessert' },
    { id: 'tea', name: 'Чай', description: 'Свежезаваренный чай на выбор', price: 100, category: 'drinks' },
    { id: 'hot_chocolate', name: 'Горячий шоколад', description: 'Густой горячий шоколад с зефиром', price: 160, category: 'drinks' },
    { id: 'smoothie', name: 'Смузи', description: 'Фруктовый смузи с ягодами', price: 180, category: 'drinks' }
];

// Constructor options
const constructorOptions = {
    bases: [
        { id: 'espresso', name: 'Эспрессо', price: 0 },
        { id: 'americano', name: 'Американо', price: 0 },
        { id: 'cappuccino', name: 'Капучино', price: 0 }
    ],
    sizes: [
        { id: 'small', name: 'Маленький', price: 0 },
        { id: 'medium', name: 'Средний', price: 30 },
        { id: 'large', name: 'Большой', price: 60 }
    ],
    milks: [
        { id: 'regular', name: 'Обычное молоко', price: 0 },
        { id: 'oat', name: 'Овсяное молоко', price: 20 },
        { id: 'almond', name: 'Миндальное молоко', price: 25 }
    ],
    extras: [
        { id: 'vanilla', name: 'Ванильный сироп', price: 15 },
        { id: 'caramel', name: 'Карамельный сироп', price: 15 },
        { id: 'chocolate', name: 'Шоколадный сироп', price: 20 }
    ]
};

// Cart state
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMenu();
    initializeConstructor();
    initializeCart();
    updateCartBadge();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Menu functionality
function initializeMenu() {
    renderMenuItems();
    initializeCategoryFilter();
}

function renderMenuItems() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.dataset.category = item.category;
        
        const icon = item.category === 'coffee' ? '☕' : 
                    item.category === 'dessert' ? '🍰' : '🥤';
        
        menuItem.innerHTML = `
            <div class="menu-item-image">${icon}</div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-price">${item.price}₽</div>
                <div class="menu-item-actions">
                    <button class="btn btn-primary add-to-cart" data-item='${JSON.stringify(item)}'>
                        Добавить в корзину
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.dataset.item);
            addToCart(item);
            
            // Animation
            this.textContent = 'Добавлено!';
            this.style.background = '#10b981';
            setTimeout(() => {
                this.textContent = 'Добавить в корзину';
                this.style.background = '';
            }, 1000);
        });
    });
}

function initializeCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Constructor functionality
function initializeConstructor() {
    updateConstructorSummary();
    
    // Add event listeners to all constructor inputs
    document.querySelectorAll('input[name="base"], input[name="size"], input[name="milk"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    document.querySelectorAll('input[name="extras"]').forEach(input => {
        input.addEventListener('change', updateConstructorSummary);
    });
    
    // Add to cart button
    document.getElementById('add-to-cart').addEventListener('click', addCustomCoffeeToCart);
    
    // Reset button
    document.getElementById('reset-constructor').addEventListener('click', resetConstructor);
}

function updateConstructorSummary() {
    const base = document.querySelector('input[name="base"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const milk = document.querySelector('input[name="milk"]:checked');
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    
    // Update summary text
    document.getElementById('summary-base').textContent = 
        constructorOptions.bases.find(b => b.id === base.value)?.name || '';
    document.getElementById('summary-size').textContent = 
        constructorOptions.sizes.find(s => s.id === size.value)?.name || '';
    document.getElementById('summary-milk').textContent = 
        constructorOptions.milks.find(m => m.id === milk.value)?.name || '';
    
    // Update extras
    const extrasText = Array.from(extras).map(extra => 
        constructorOptions.extras.find(e => e.id === extra.value)?.name
    ).join(', ');
    
    const extrasElement = document.getElementById('summary-extras');
    const extrasTextElement = document.getElementById('summary-extras-text');
    
    if (extrasText) {
        extrasElement.style.display = 'flex';
        extrasTextElement.textContent = extrasText;
    } else {
        extrasElement.style.display = 'none';
    }
    
    // Calculate total
    const basePrice = constructorOptions.bases.find(b => b.id === base.value)?.price || 0;
    const sizePrice = constructorOptions.sizes.find(s => s.id === size.value)?.price || 0;
    const milkPrice = constructorOptions.milks.find(m => m.id === milk.value)?.price || 0;
    const extrasPrice = Array.from(extras).reduce((sum, extra) => {
        const extraOption = constructorOptions.extras.find(e => e.id === extra.value);
        return sum + (extraOption?.price || 0);
    }, 0);
    
    const total = basePrice + sizePrice + milkPrice + extrasPrice;
    document.getElementById('summary-total').textContent = `${total}₽`;
}

function addCustomCoffeeToCart() {
    const base = document.querySelector('input[name="base"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const milk = document.querySelector('input[name="milk"]:checked');
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    
    const baseName = constructorOptions.bases.find(b => b.id === base.value)?.name || '';
    const sizeName = constructorOptions.sizes.find(s => s.id === size.value)?.name || '';
    const milkName = constructorOptions.milks.find(m => m.id === milk.value)?.name || '';
    const extrasNames = Array.from(extras).map(extra => 
        constructorOptions.extras.find(e => e.id === extra.value)?.name
    ).join(', ');
    
    const customCoffee = {
        id: `custom-${Date.now()}`,
        name: 'Кастомный кофе',
        description: `${baseName}, ${sizeName}, ${milkName}${extrasNames ? ` + ${extrasNames}` : ''}`,
        price: parseInt(document.getElementById('summary-total').textContent),
        quantity: 1,
        custom: true
    };
    
    addToCart(customCoffee);
    alert('Кастомный кофе добавлен в корзину!');
}

function resetConstructor() {
    document.querySelector('input[name="base"][value="espresso"]').checked = true;
    document.querySelector('input[name="size"][value="medium"]').checked = true;
    document.querySelector('input[name="milk"][value="regular"]').checked = true;
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
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары из меню или создайте свой кофе в конструкторе</p>
                <div class="empty-actions">
                    <a href="#menu" class="btn btn-primary">Перейти к меню</a>
                    <a href="#constructor" class="btn btn-secondary">Создать кофе</a>
                </div>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${item.category === 'coffee' ? '☕' : 
                          item.category === 'dessert' ? '🍰' : '🥤'}
                    </div>
                    <div class="cart-item-content">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">${item.price}₽ за штуку</p>
                        ${item.custom ? `<p class="text-sm text-gray-light mt-1">${item.description}</p>` : ''}
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="quantity-number">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-total">
                        <div class="cart-item-total-price">${item.price * item.quantity}₽</div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Удалить из корзины">×</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <div class="summary-card">
                <h3>Итого</h3>
                <div class="summary-content">
                    ${cart.map(item => `
                        <div class="summary-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>${item.price * item.quantity}₽</span>
                        </div>
                    `).join('')}
                </div>
                <div class="summary-total">
                    <span>Общая сумма:</span>
                    <span>${total}₽</span>
                </div>
                <div class="summary-actions">
                    <button class="btn btn-primary" onclick="checkout()">Оформить заказ</button>
                    <button class="btn btn-outline" onclick="clearCart()">Очистить корзину</button>
                </div>
            </div>
        </div>
    `;
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ на сумму ${total}₽ оформлен! Мы свяжемся с вами для подтверждения.`);
    clearCart();
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.checkout = checkout;
