1.  Клонируйте репозиторий:

    ```bash
    git add .
    cd saucedemo-playwright-e2e

2.  Установите зависимости:

    ```bash
    npm install   # или yarn install
    ```

3.  Установите браузеры Playwright:

    ```bash
    npx playwright install
    ```

Запуск тестов

После того, как вы установили все необходимые зависимости и настроили проект, вы можете запустить тесты.
1.  Откройте командную строку (терминал) и перейдите в корневую директорию проекта (где находится файл `package.json`).
2.  Выполните следующую команду:

    ```bash
    npx playwright test
    ```

    Эта команда запустит все файлы, заканчивающиеся на `.spec.js` в директории `tests`. 

Запуск тестов в определенном браузере:

Чтобы запустить тесты только в определенном браузере, используйте опцию `--browser`:

```bash
npx playwright test --browser=chromium   # Запуск в Chrome
npx playwright test --browser=firefox    # Запуск в Firefox
npx playwright test --browser=webkit     # Запуск в Safari (WebKit)# saucedemo-playwright-e2e
