// R-Keeper Integration Module
// Модуль интеграции с R-Keeper

class RKeeperIntegration {
    constructor() {
        // Загружаем конфигурацию из внешнего файла
        this.config = window.RKEEPER_CONFIG || this.getDefaultConfig();
        
        this.isConnected = false;
        this.sessionId = null;
        this.lastSyncTime = null;
        this.retryCount = 0;
        this.maxRetries = this.config.rkeeper.retryAttempts || 3;
    }
    
    // Конфигурация по умолчанию
    getDefaultConfig() {
        return {
            rkeeper: { 
                serverUrl: 'http://localhost:8080',
                apiVersion: 'v1',
                retryAttempts: 3
            },
            authentication: { 
                username: 'admin',
                password: 'password'
            },
            restaurant: { 
                id: '1',
                name: 'Art Coffee'
            },
            orders: { 
                autoCreate: true,
                defaultStatus: 'NEW'
            }
        };
    }

    // Инициализация подключения к R-Keeper
    async initialize() {
        try {
            console.log('Initializing R-Keeper connection...');
            
            // Проверка подключения к серверу R-Keeper
            const response = await this.testConnection();
            
            if (response.success) {
                // Аутентификация
                const authResult = await this.authenticate();
                if (authResult.success) {
                    this.isConnected = true;
                    this.sessionId = authResult.sessionId;
                    console.log('R-Keeper connected successfully');
                    return { success: true, message: 'R-Keeper connected' };
                } else {
                    throw new Error(authResult.message || 'Authentication failed');
                }
            } else {
                throw new Error(response.message || 'Failed to connect to R-Keeper server');
            }
        } catch (error) {
            console.error('R-Keeper initialization error:', error);
            this.isConnected = false;
            return { success: false, message: error.message };
        }
    }

    // Тест подключения к серверу R-Keeper
    async testConnection() {
        try {
            const response = await fetch(window.getApiUrl('/health'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: this.config.rkeeper.timeout || 30000
            });

            if (response.ok) {
                return { success: true, message: 'Connection successful' };
            } else {
                return { success: false, message: 'Connection failed' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Аутентификация в R-Keeper
    async authenticate() {
        try {
            const response = await fetch(window.getApiUrl('/auth/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.config.authentication.username,
                    password: this.config.authentication.password,
                    restaurantId: this.config.restaurant.id
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Сохраняем токен доступа
                this.config.authentication.accessToken = result.accessToken;
                this.config.authentication.tokenExpires = result.expiresAt;
                
                return { 
                    success: true, 
                    sessionId: result.sessionId,
                    accessToken: result.accessToken,
                    message: 'Authentication successful' 
                };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Authentication failed' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Создание заказа в R-Keeper
    async createOrder(orderData) {
        if (!this.isConnected) {
            throw new Error('R-Keeper not connected');
        }

        try {
            const rkeeperOrder = this.prepareOrderData(orderData);
            
            const response = await fetch(window.getApiUrl('/orders'), {
                method: 'POST',
                headers: window.getAuthHeaders(),
                body: JSON.stringify(rkeeperOrder)
            });

            if (response.ok) {
                const result = await response.json();
                return { 
                    success: true, 
                    orderId: result.orderId,
                    rkeeperOrderId: result.rkeeperOrderId,
                    message: 'Order created successfully' 
                };
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create order');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            throw error;
        }
    }

    // Подготовка данных заказа для R-Keeper
    prepareOrderData(orderData) {
        const { items, total, customerInfo, paymentMethod } = orderData;
        
        return {
            restaurantId: this.config.restaurant.id,
            order: {
                // Основная информация о заказе
                orderNumber: this.generateOrderNumber(),
                orderDate: new Date().toISOString(),
                status: this.config.orders.defaultStatus,
                totalAmount: total,
                currency: this.config.payments.currency,
                
                // Информация о клиенте
                customer: {
                    name: customerInfo?.name || 'Гость',
                    phone: customerInfo?.phone || null,
                    email: customerInfo?.email || null
                },
                
                // Товары в заказе
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.price * item.quantity,
                    category: item.category || 'other',
                    notes: item.notes || null
                })),
                
                // Способ оплаты
                payment: {
                    method: paymentMethod || 'CARD',
                    amount: total,
                    currency: this.config.payments.currency,
                    status: 'PENDING'
                },
                
                // Дополнительная информация
                notes: orderData.notes || null,
                tableNumber: orderData.tableNumber || null,
                deliveryAddress: orderData.deliveryAddress || null
            }
        };
    }

    // Генерация номера заказа
    generateOrderNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getTime()).slice(-6);
        
        return `RK${year}${month}${day}-${time}`;
    }

    // Обновление статуса заказа
    async updateOrderStatus(orderId, status, notes = null) {
        try {
            const response = await fetch(window.getApiUrl(`/orders/${orderId}/status`), {
                method: 'PUT',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({
                    status: status,
                    notes: notes,
                    updatedAt: new Date().toISOString()
                })
            });

            if (response.ok) {
                return { success: true, message: 'Order status updated successfully' };
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update order status');
            }
        } catch (error) {
            console.error('Update order status error:', error);
            throw error;
        }
    }

    // Получение информации о заказе
    async getOrder(orderId) {
        try {
            const response = await fetch(window.getApiUrl(`/orders/${orderId}`), {
                method: 'GET',
                headers: window.getAuthHeaders()
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get order information');
            }
        } catch (error) {
            console.error('Get order error:', error);
            throw error;
        }
    }

    // Синхронизация меню с R-Keeper
    async syncMenu() {
        try {
            const response = await fetch(window.getApiUrl('/menu/sync'), {
                method: 'POST',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({
                    restaurantId: this.config.restaurant.id,
                    categories: this.config.menu.categories
                })
            });

            if (response.ok) {
                const result = await response.json();
                this.lastSyncTime = new Date();
                return { 
                    success: true, 
                    syncedItems: result.syncedItems,
                    message: 'Menu synchronized successfully' 
                };
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to sync menu');
            }
        } catch (error) {
            console.error('Menu sync error:', error);
            throw error;
        }
    }

    // Получение меню из R-Keeper
    async getMenu() {
        try {
            const response = await fetch(window.getApiUrl('/menu'), {
                method: 'GET',
                headers: window.getAuthHeaders()
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get menu');
            }
        } catch (error) {
            console.error('Get menu error:', error);
            throw error;
        }
    }

    // Отмена заказа
    async cancelOrder(orderId, reason = null) {
        try {
            const response = await fetch(window.getApiUrl(`/orders/${orderId}/cancel`), {
                method: 'POST',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({
                    reason: reason || 'Order cancelled by customer',
                    cancelledAt: new Date().toISOString()
                })
            });

            if (response.ok) {
                return { success: true, message: 'Order cancelled successfully' };
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to cancel order');
            }
        } catch (error) {
            console.error('Cancel order error:', error);
            throw error;
        }
    }

    // Получение отчетов
    async getReport(reportType, startDate, endDate) {
        try {
            const response = await fetch(window.getApiUrl('/reports'), {
                method: 'POST',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({
                    reportType: reportType,
                    startDate: startDate,
                    endDate: endDate,
                    restaurantId: this.config.restaurant.id
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get report');
            }
        } catch (error) {
            console.error('Get report error:', error);
            throw error;
        }
    }

    // Получение статистики
    async getStatistics(period = 'today') {
        try {
            const response = await fetch(window.getApiUrl(`/statistics?period=${period}`), {
                method: 'GET',
                headers: window.getAuthHeaders()
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get statistics');
            }
        } catch (error) {
            console.error('Get statistics error:', error);
            throw error;
        }
    }

    // Проверка статуса подключения
    async checkConnection() {
        try {
            const response = await fetch(window.getApiUrl('/status'), {
                method: 'GET',
                headers: window.getAuthHeaders()
            });

            if (response.ok) {
                const status = await response.json();
                this.isConnected = status.connected;
                return status;
            } else {
                this.isConnected = false;
                return { connected: false, message: 'Connection check failed' };
            }
        } catch (error) {
            this.isConnected = false;
            return { connected: false, message: error.message };
        }
    }

    // Закрытие соединения
    async disconnect() {
        try {
            if (this.sessionId) {
                await fetch(window.getApiUrl('/auth/logout'), {
                    method: 'POST',
                    headers: window.getAuthHeaders()
                });
            }
            
            this.isConnected = false;
            this.sessionId = null;
            this.config.authentication.accessToken = null;
            
            return { success: true, message: 'Disconnected successfully' };
        } catch (error) {
            console.error('Disconnect error:', error);
            return { success: false, message: error.message };
        }
    }

    // Обновление конфигурации
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    // Получение текущей конфигурации
    getConfig() {
        return { ...this.config };
    }
}

// Экспорт для использования в других модулях
window.RKeeperIntegration = RKeeperIntegration;
