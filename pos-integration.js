// POS Integration Module for CryptoPro CryptoKeeper
// Модуль интеграции с КриптоПро КриптоКипер

class POSIntegration {
    constructor() {
        // Загружаем конфигурацию из внешнего файла
        this.config = window.POS_CONFIG || this.getDefaultConfig();
        
        this.isConnected = false;
        this.lastReceiptNumber = 0;
        this.retryCount = 0;
        this.maxRetries = this.config.api.retryAttempts || 3;
        this.sessionId = null; // ID сессии для КриптоПро
        this.cashierId = null; // ID кассира
    }
    
    // Конфигурация по умолчанию, если внешняя не загружена
    getDefaultConfig() {
        return {
            cashRegister: { id: 'YOUR_CASH_REGISTER_ID' },
            api: { 
                baseUrl: 'https://api.pos-provider.com/v1',
                apiKey: 'YOUR_API_KEY',
                retryAttempts: 3
            },
            tax: { vatRate: 19, currency: 'EUR' },
            business: { 
                name: 'Art Coffee',
                vatNumber: 'CY12345678X',
                address: { street: 'Your Address, Cyprus' }
            },
            receipt: { format: 'A4' }
        };
    }

    // Инициализация подключения к кассе КриптоПро
    async initialize() {
        try {
            console.log('Initializing CryptoPro CryptoKeeper connection...');
            
            // Проверка подключения к API КриптоПро
            const response = await this.testConnection();
            
            if (response.success) {
                // Создание сессии с КриптоПро
                const sessionResult = await this.createSession();
                if (sessionResult.success) {
                    this.sessionId = sessionResult.sessionId;
                    this.cashierId = sessionResult.cashierId;
                    this.isConnected = true;
                    console.log('CryptoPro CryptoKeeper connected successfully');
                    return { success: true, message: 'CryptoPro CryptoKeeper connected' };
                } else {
                    throw new Error(sessionResult.message || 'Failed to create session');
                }
            } else {
                throw new Error(response.message || 'Failed to connect to CryptoPro system');
            }
        } catch (error) {
            console.error('CryptoPro initialization error:', error);
            this.isConnected = false;
            return { success: false, message: error.message };
        }
    }

    // Тест подключения к кассе
    async testConnection() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/test`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: this.config.api.timeout || 30000
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

    // Создание фискального чека
    async createReceipt(orderData) {
        if (!this.isConnected) {
            throw new Error('POS system not connected');
        }

        try {
            const receipt = this.prepareReceiptData(orderData);
            
            const response = await fetch(`${this.config.api.baseUrl}/receipts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(receipt)
            });

            if (response.ok) {
                const result = await response.json();
                this.lastReceiptNumber = result.receiptNumber;
                return { 
                    success: true, 
                    receiptNumber: result.receiptNumber,
                    receiptUrl: result.receiptUrl,
                    qrCode: result.qrCode
                };
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create receipt');
            }
        } catch (error) {
            console.error('Receipt creation error:', error);
            throw error;
        }
    }

    // Подготовка данных чека в формате, требуемом кассой
    prepareReceiptData(orderData) {
        const { items, total, customerInfo } = orderData;
        
        // Расчет НДС
        const vatRate = this.config.tax.vatRate;
        const vatAmount = (total * vatRate) / (100 + vatRate);
        const netAmount = total - vatAmount;

        const receipt = {
            cashRegisterId: this.config.cashRegister.id,
            businessInfo: {
                name: this.config.business.name,
                legalName: this.config.business.legalName,
                address: `${this.config.business.address.street}, ${this.config.business.address.city}, ${this.config.business.address.country}`,
                vatNumber: this.config.business.vatNumber,
                registrationNumber: this.config.business.registrationNumber,
                phone: this.config.business.phone,
                email: this.config.business.email
            },
            receipt: {
                number: this.generateReceiptNumber(),
                date: new Date().toISOString(),
                type: 'SALE',
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.price * item.quantity,
                    vatRate: vatRate,
                    category: item.category || 'FOOD'
                })),
                totals: {
                    netAmount: Math.round(netAmount * 100) / 100,
                    vatAmount: Math.round(vatAmount * 100) / 100,
                    totalAmount: Math.round(total * 100) / 100
                },
                payment: {
                    method: 'CARD', // или 'CASH', 'MOBILE'
                    amount: total
                },
                customer: customerInfo || null
            },
            format: this.config.receipt.format,
            language: this.config.receipt.language,
            showQRCode: this.config.receipt.showQRCode,
            showBusinessInfo: this.config.receipt.showBusinessInfo,
            showVATBreakdown: this.config.receipt.showVATBreakdown
        };

        return receipt;
    }

    // Генерация номера чека
    generateReceiptNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getTime()).slice(-6);
        
        return `${year}${month}${day}-${time}`;
    }

    // Отправка чека по email/SMS
    async sendReceipt(receiptData, contactInfo) {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/receipts/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    receiptNumber: receiptData.receiptNumber,
                    contact: contactInfo,
                    format: 'PDF',
                    sendEmail: this.config.receipt.sendEmail,
                    sendSMS: this.config.receipt.sendSMS
                })
            });

            if (response.ok) {
                return { success: true, message: 'Receipt sent successfully' };
            } else {
                throw new Error('Failed to send receipt');
            }
        } catch (error) {
            console.error('Send receipt error:', error);
            throw error;
        }
    }

    // Получение статуса чека
    async getReceiptStatus(receiptNumber) {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/receipts/${receiptNumber}/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get receipt status');
            }
        } catch (error) {
            console.error('Get receipt status error:', error);
            throw error;
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

    // Создание сессии с КриптоПро
    async createSession() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/sessions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cashRegisterId: this.config.cashRegister.id,
                    certificate: {
                        thumbprint: this.config.api.certificate.thumbprint,
                        password: this.config.api.certificate.password
                    },
                    connection: this.config.api.connection
                })
            });

            if (response.ok) {
                const result = await response.json();
                return { 
                    success: true, 
                    sessionId: result.sessionId,
                    cashierId: result.cashierId,
                    message: 'Session created successfully' 
                };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to create session' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Закрытие сессии с КриптоПро
    async closeSession() {
        if (!this.sessionId) return { success: true };

        try {
            const response = await fetch(`${this.config.api.baseUrl}/sessions/${this.sessionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                this.sessionId = null;
                this.cashierId = null;
                this.isConnected = false;
                return { success: true, message: 'Session closed successfully' };
            } else {
                return { success: false, message: 'Failed to close session' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Получение статуса кассы КриптоПро
    async getCashRegisterStatus() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/cash-registers/${this.config.cashRegister.id}/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get cash register status');
            }
        } catch (error) {
            console.error('Get cash register status error:', error);
            throw error;
        }
    }

    // Открытие смены в КриптоПро
    async openShift() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/shifts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    cashRegisterId: this.config.cashRegister.id,
                    cashierId: this.cashierId
                })
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, shiftId: result.shiftId, message: 'Shift opened successfully' };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to open shift' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Закрытие смены в КриптоПро
    async closeShift() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/shifts/close`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    cashRegisterId: this.config.cashRegister.id
                })
            });

            if (response.ok) {
                return { success: true, message: 'Shift closed successfully' };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to close shift' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // X-отчет (промежуточный отчет)
    async getXReport() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/reports/x`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    cashRegisterId: this.config.cashRegister.id
                })
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, report: result, message: 'X-report generated successfully' };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to generate X-report' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Z-отчет (итоговый отчет)
    async getZReport() {
        try {
            const response = await fetch(`${this.config.api.baseUrl}/reports/z`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.api.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    cashRegisterId: this.config.cashRegister.id
                })
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, report: result, message: 'Z-report generated successfully' };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to generate Z-report' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

// Экспорт для использования в других модулях
window.POSIntegration = POSIntegration;
