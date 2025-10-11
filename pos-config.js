// POS Configuration for CryptoPro CryptoKeeper Integration
// Конфигурация для интеграции с КриптоПро КриптоКипер

const POS_CONFIG = {
    // Основные настройки кассы
    cashRegister: {
        id: 'YOUR_CASH_REGISTER_ID', // ID вашей кассы в системе КриптоПро
        name: 'Art Coffee POS', // Название кассы
        location: 'Nicosia, Cyprus', // Местоположение
        serialNumber: 'YOUR_SERIAL_NUMBER', // Серийный номер кассы
        model: 'CryptoKeeper', // Модель кассы
        version: '1.0' // Версия ПО кассы
    },
    
    // API настройки для КриптоПро
    api: {
        // URL API КриптоПро КриптоКипер
        baseUrl: 'https://api.cryptopro.ru/v1',
        apiKey: 'YOUR_CRYPTOPRO_API_KEY', // API ключ от КриптоПро
        timeout: 30000, // Таймаут запросов в мс
        retryAttempts: 3, // Количество попыток при ошибке
        // Дополнительные настройки для КриптоПро
        certificate: {
            thumbprint: 'YOUR_CERTIFICATE_THUMBPRINT', // Отпечаток сертификата
            password: 'YOUR_CERTIFICATE_PASSWORD' // Пароль сертификата
        },
        // Настройки подключения к кассе
        connection: {
            type: 'tcp', // Тип подключения (tcp/udp/http)
            host: 'localhost', // IP адрес кассы
            port: 8080, // Порт кассы
            timeout: 10000 // Таймаут подключения
        }
    },
    
    // Налоговые настройки для Кипра
    tax: {
        vatRate: 19, // Ставка НДС на Кипре (19%)
        currency: 'EUR', // Валюта
        taxIncluded: true // НДС включен в цену
    },
    
    // Информация о бизнесе
    business: {
        name: 'Art Coffee',
        legalName: 'Art Coffee Ltd',
        address: {
            street: 'Your Street Address',
            city: 'Nicosia',
            postalCode: '1000',
            country: 'Cyprus'
        },
        vatNumber: 'CY12345678X', // Ваш VAT номер
        registrationNumber: 'HE123456', // Регистрационный номер
        phone: '+357 22 123456',
        email: 'info@artcoffee.cy',
        website: 'https://artcoffee.cy'
    },
    
    // Настройки чеков
    receipt: {
        format: 'A4', // Формат чека
        language: 'en', // Язык чека (en/el)
        showQRCode: true, // Показывать QR код
        showBusinessInfo: true, // Показывать информацию о бизнесе
        showVATBreakdown: true, // Показывать разбивку НДС
        autoPrint: false, // Автоматическая печать
        sendEmail: true, // Отправка по email
        sendSMS: false // Отправка SMS
    },
    
    // Настройки уведомлений
    notifications: {
        success: {
            show: true,
            duration: 5000,
            position: 'top-right'
        },
        error: {
            show: true,
            duration: 8000,
            position: 'top-right'
        },
        warning: {
            show: true,
            duration: 6000,
            position: 'top-right'
        }
    },
    
    // Настройки интеграции
    integration: {
        // Режим работы (test/production)
        mode: 'test',
        
        // Автоматическое создание чека при заказе
        autoCreateReceipt: true,
        
        // Сохранение данных о заказах
        saveOrderHistory: true,
        
        // Синхронизация с внешними системами
        syncWithExternal: false,
        
        // Резервное копирование данных
        backupEnabled: true
    },
    
    // Настройки безопасности
    security: {
        // Шифрование данных
        encryptData: true,
        
        // Логирование операций
        enableLogging: true,
        
        // Максимальное время сессии (в минутах)
        sessionTimeout: 480,
        
        // Требовать подтверждение для больших сумм
        requireConfirmationForAmount: 100
    },
    
    // Настройки отчетности
    reporting: {
        // Автоматическая генерация отчетов
        autoGenerateReports: true,
        
        // Период отчетов (daily/weekly/monthly)
        reportPeriod: 'daily',
        
        // Отправка отчетов по email
        emailReports: true,
        
        // Сохранение отчетов локально
        saveLocally: true
    }
};

// Функция для получения конфигурации
function getPOSConfig() {
    return POS_CONFIG;
}

// Функция для обновления конфигурации
function updatePOSConfig(newConfig) {
    Object.assign(POS_CONFIG, newConfig);
    console.log('POS configuration updated');
}

// Функция для валидации конфигурации
function validatePOSConfig() {
    const required = [
        'cashRegister.id',
        'api.baseUrl',
        'api.apiKey',
        'business.vatNumber',
        'business.address.street'
    ];
    
    const errors = [];
    
    required.forEach(path => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], POS_CONFIG);
        if (!value || value.includes('YOUR_')) {
            errors.push(`Missing or invalid configuration: ${path}`);
        }
    });
    
    if (errors.length > 0) {
        console.error('POS Configuration validation failed:', errors);
        return false;
    }
    
    console.log('POS Configuration is valid');
    return true;
}

// Экспорт для использования в других модулях
window.POS_CONFIG = POS_CONFIG;
window.getPOSConfig = getPOSConfig;
window.updatePOSConfig = updatePOSConfig;
window.validatePOSConfig = validatePOSConfig;
