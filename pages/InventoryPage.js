// pages/InventoryPage.js
const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.inventoryItem = '.inventory_item';  // Selector for a single inventory item
        this.addToCartButton = (itemName) => this.page.locator(`:has-text("${itemName}") ~ .pricebar > button:has-text("Add to cart")`);
        this.removeFromCartButton = (itemName) => this.page.locator(`:has-text("${itemName}") ~ .pricebar > button:has-text("Remove")`);
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.inventoryItemName = (itemName) => this.page.locator(`:has-text("${itemName}")`).first();

    }

    async addItemToCart(itemName) {
      const buttonLocator = this.addToCartButton(itemName);
      await buttonLocator.click();
    }

    async removeItemFromCart(itemName) {
      const buttonLocator = this.removeFromCartButton(itemName);
      await buttonLocator.click();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

    async checkItemIsAdded(itemName) {
        const removeButton = this.removeFromCartButton(itemName);
        await expect(removeButton).toBeVisible();
    }

    async checkItemIsRemoved(itemName) {
        const addButton = this.addToCartButton(itemName);
        await expect(addButton).toBeVisible();
    }

    async checkItemExistsInInventory(itemName) {
        await expect(this.inventoryItemName(itemName)).toBeVisible();
    }
}