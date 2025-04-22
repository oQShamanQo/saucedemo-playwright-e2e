// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Login Page Tests', () => {

    test('Successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.checkItemExistsInInventory("Sauce Labs Backpack");

    });

    test('Incorrect password login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'wrong_password');
        await loginPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
});