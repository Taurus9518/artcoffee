// R-Keeper Integration Configuration
// Конфигурация для интеграции с R-Keeper

const RKEEPER_CONFIG = {
    // Основные настройки R-Keeper
    rkeeper: {
        // URL сервера R-Keeper
        serverUrl: 'http://YOUR_RKEEPER_SERVER:8080',
        // Версия API
        apiVersion: 'v1',
        // Таймаут запросов в мс
        timeout: 30000,
        // Количество попыток при ошибке
        retryAttempts: 3
    },
    
    // Аутентификация
    authentication: {
        // Логин администратора R-Keeper
        username: 'YOUR_RKEEPER_USERNAME',
        // Пароль администратора
        password: 'YOUR_RKEEPER_PASSWORD',
        // Токен доступа (получается автоматически)
        accessToken: null,
        // Время истечения токена
        tokenExpires: null
    },
    
    // Настройки ресторана
    restaurant: {
        // ID ресторана в R-Keeper
        id: 'YOUR_RESTAURANT_ID',
        // Название ресторана
        name: 'Art Coffee',
        // Адрес
        address: 'Nicosia, Cyprus',
        // Телефон
        phone: '+357 22 123456',
        // Email
        email: 'info@artcoffee.cy',
        // Часовой пояс
        timezone: 'Europe/Nicosia'
    },
    
    // Настройки заказов
    orders: {
        // Автоматическое создание заказов
        autoCreate: true,
        // Статус заказа по умолчанию
        defaultStatus: 'NEW',
        // Сохранение истории заказов
        saveHistory: true,
        // Уведомления о статусе заказа
        notifications: true
    },
    
    // Настройки меню
    menu: {
        // Синхронизация меню
        syncEnabled: true,
        // Интервал синхронизации (в минутах)
        syncInterval: 30,
        // Автоматическое обновление цен
        autoUpdatePrices: true,
        // Категории товаров
        categories: {
            'coffee': 'Кофе',
            'dessert': 'Десерты',
            'drinks': 'Напитки',
            'custom': 'Кастомные заказы'
        }
    },
    
    // Настройки платежей
    payments: {
        // Поддерживаемые способы оплаты
        methods: ['CASH', 'CARD', 'MOBILE'],
        // Валюта
        currency: 'EUR',
        // Автоматическое подтверждение платежей
        autoConfirm: false,
        // Таймаут для подтверждения платежа
        confirmationTimeout: 300000 // 5 минут
    },
    
    // Настройки уведомлений
    notifications: {
        // Включить уведомления
        enabled: true,
        // Типы уведомлений
        types: {
            orderCreated: true,
            orderUpdated: true,
            orderCompleted: true,
            orderCancelled: true,
            paymentReceived: true
        },
        // Каналы уведомлений
        channels: {
            email: true,
            sms: false,
            push: true
        }
    },
    
    // Настройки отчетности
    reporting: {
        // Автоматическая генерация отчетов
        autoGenerate: true,
        // Период отчетов
        period: 'daily',
        // Отправка отчетов
        emailReports: true,
        // Сохранение отчетов локально
        saveLocally: true
    },
    
    // Настройки интеграции
    integration: {
        // Режим работы (test/production)
        mode: 'test',
        // Логирование
        logging: {
            enabled: true,
            level: 'INFO', // DEBUG, INFO, WARN, ERROR
            maxSize: '10MB',
            maxFiles: 5
        },
        // Резервное копирование
        backup: {
            enabled: true,
            interval: 'daily',
            retention: 30 // дней
        }
    },
    
    // Настройки безопасности
    security: {
        // Шифрование данных
        encryptData: true,
        // HTTPS для всех запросов
        forceHttps: true,
        // Валидация SSL сертификатов
        validateSSL: true,
        // Максимальное время сессии (в минутах)
        sessionTimeout: 480,
        // IP фильтрация
        allowedIPs: [] // пустой массив = все IP разрешены
    }
};

// Функция для получения конфигурации
function getRKeeperConfig() {
    return RKEEPER_CONFIG;
}

// Функция для обновления конфигурации
function updateRKeeperConfig(newConfig) {
    Object.assign(RKEEPER_CONFIG, newConfig);
    console.log('R-Keeper configuration updated');
}

// Функция для валидации конфигурации
function validateRKeeperConfig() {
    const required = [
        'rkeeper.serverUrl',
        'authentication.username',
        'authentication.password',
        'restaurant.id'
    ];
    
    const errors = [];
    
    required.forEach(path => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], RKEEPER_CONFIG);
        if (!value || value.includes('YOUR_')) {
            errors.push(`Missing or invalid configuration: ${path}`);
        }
    });
    
    if (errors.length > 0) {
        console.error('R-Keeper Configuration validation failed:', errors);
        return false;
    }
    
    console.log('R-Keeper Configuration is valid');
    return true;
}

// Функция для получения полного URL API
function getApiUrl(endpoint = '') {
    const baseUrl = RKEEPER_CONFIG.rkeeper.serverUrl;
    const version = RKEEPER_CONFIG.rkeeper.apiVersion;
    return `${baseUrl}/api/${version}${endpoint}`;
}

// Функция для получения заголовков авторизации
function getAuthHeaders() {
    const token = RKEEPER_CONFIG.authentication.accessToken;
    if (token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
    return {
        'Content-Type': 'application/json'
    };
}

// Экспорт для использования в других модулях
window.RKEEPER_CONFIG = RKEEPER_CONFIG;
window.getRKeeperConfig = getRKeeperConfig;
window.updateRKeeperConfig = updateRKeeperConfig;
window.validateRKeeperConfig = validateRKeeperConfig;
window.getApiUrl = getApiUrl;
window.getAuthHeaders = getAuthHeaders;
