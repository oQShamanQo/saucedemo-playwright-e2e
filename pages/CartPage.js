// pages/CartPage.js
const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.cartItem = '.cart_item'; // Selector for a single cart item
        this.cartItemName = (itemName) => this.page.locator('.inventory_item_name:has-text("' + itemName + '")');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async checkItemInCart(itemName) {
        const itemLocator = this.cartItemName(itemName);
        await expect(itemLocator).toBeVisible();
    }

    async checkItemNotInCart(itemName) {
        const itemLocator = this.cartItemName(itemName);
        await expect(itemLocator).not.toBeVisible();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}