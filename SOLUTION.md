# 🚨 Решение проблемы с Vercel

## Проблема
Vercel показывает ошибку: "The provided GitHub repository does not contain the requested branch or commit reference"

## ✅ Решение

### Шаг 1: Создайте репозиторий на GitHub
1. Перейдите на [github.com](https://github.com)
2. Нажмите зеленую кнопку "New"
3. Название репозитория: `artcoffee`
4. Сделайте его **Public**
5. **НЕ** добавляйте README, .gitignore или лицензию
6. Нажмите "Create repository"

### Шаг 2: Загрузите код в GitHub
Выполните эти команды в терминале (замените YOUR_USERNAME на ваш GitHub username):

```bash
# Удалите старый remote (если есть)
git remote remove origin

# Добавьте новый remote
git remote add origin https://github.com/YOUR_USERNAME/artcoffee.git

# Загрузите код
git push -u origin main
```

### Шаг 3: Разверните на Vercel
1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `artcoffee`
5. Vercel автоматически определит настройки Next.js
6. Нажмите "Deploy"

## 🎉 Готово!
После развертывания вы получите ссылку на ваш сайт вида:
`https://artcoffee-xxx.vercel.app`

## Альтернативный способ
Если не хотите создавать GitHub репозиторий, можете:
1. Скачать папку проекта как ZIP
2. Загрузить на Vercel через "Import Git Repository" → "Upload"
3. Выбрать ZIP файл

## Что включено в приложение
- ✅ Главная страница с приветствием
- ✅ Меню с товарами кофе
- ✅ Корзина покупок
- ✅ Адаптивный дизайн
- ✅ Готово для Vercel
