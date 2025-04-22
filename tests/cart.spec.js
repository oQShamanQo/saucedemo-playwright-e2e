// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Cart Functionality Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');
    });

    test('Add item to cart', async ({ page }) => {
        const itemName = "Sauce Labs Backpack";
        await inventoryPage.addItemToCart(itemName);
        await inventoryPage.checkItemIsAdded(itemName);

        await inventoryPage.goToCart();
        await cartPage.checkItemInCart(itemName);
    });

    test('Remove item from cart', async ({ page }) => {
        const itemName = "Sauce Labs Backpack";

        // Add item first
        await inventoryPage.addItemToCart(itemName);
        await inventoryPage.checkItemIsAdded(itemName);

        //Remove the item
        await inventoryPage.removeItemFromCart(itemName);
        await inventoryPage.checkItemIsRemoved(itemName);

        await inventoryPage.goToCart();
        await cartPage.checkItemNotInCart(itemName);
    });
});