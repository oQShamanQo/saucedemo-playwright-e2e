// tests/checkout.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Checkout Flow Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');

        // Add item to cart before each test
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();
    });

    test('Successful checkout', async ({ page }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();
        await checkoutPage.checkOrderIsComplete();
    });

    test('Checkout with missing information', async ({ page }) => {
        await checkoutPage.fillCheckoutInformation('', 'Doe', '12345');
        await checkoutPage.continueButton.click();  // Explicitly click in this test
        await checkoutPage.checkErrorMessage('Error: First Name is required');
    });
});