// pages/CheckoutPage.js
const { expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
        await this.continueButton.click();
    }

async finishCheckout() {
    const finishButtonLocator = this.page.locator('[data-test="finish"]');
    await expect(finishButtonLocator).toBeVisible({timeout: 10000});
    await expect(finishButtonLocator).toBeEnabled({timeout: 10000});
    await finishButtonLocator.click();
}

    async checkOrderIsComplete() {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    async checkErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}