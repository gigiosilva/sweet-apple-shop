import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
  });

  test('products page loads at least one product', async ({ page }) => {
    await page.waitForURL(/products/);
    await page.waitForSelector('text=Add to cart');

    await expect(page).toHaveTitle(/Products/);

    const getProducts = await page.locator('text=Add to cart');
    await expect(await getProducts.count()).toBeGreaterThan(0);
  });

  test('products page search products and clean input', async ({ page }) => {
    await page.getByPlaceholder('Search here').fill('Apple');
    await page.getByPlaceholder('Search here').press('Enter');

    await page.waitForResponse('**/products?search=Apple**');

    await expect(page).toHaveURL('http://localhost:3000/products?search=Apple');

    const getProductsSearched = await page.locator('img');
    await expect(await getProductsSearched.count()).toBe(3);

    await page.locator('nav[role="navigation"]:has-text("🍎 Sweet Apple Store") svg').nth(1).click();

    await page.waitForResponse('**/products**');

    await expect(page).toHaveURL('http://localhost:3000/products');

    const getProducts = await page.locator('img');
    await expect(await getProducts.count()).toBeGreaterThanOrEqual(3);
  });

  test('products page open product details', async ({ page }) => {
    await page.locator('.chakra-link').first().click();

    await page.waitForSelector('text=2-3 business days delivery');

    await page.waitForURL(/\/products\//);

    await expect(page).toHaveURL(/\/products\//);

    const getProductDetails = await page.locator('img');
    await expect(await getProductDetails.count()).toBe(1);
  });

  test('products page add product to cart', async ({ page }) => {
    await page.locator('.chakra-button').first().click();

    await expect(page).toHaveURL(/cart/);

    await page.waitForSelector('text=Shopping Cart');

    const getProductDetails = await page.locator('img');
    await expect(await getProductDetails.count()).toBe(1);
  });

  test('products page go to empty cart', async ({ page }) => {
    await page.locator('nav[role="navigation"]:has-text("🍎 Sweet Apple Store") svg').nth(2).click();

    await page.waitForURL(/cart/);

    const emptyCartText = await page.locator('text=Your cart is empty');
    await expect(emptyCartText).toBeVisible();
  });
});
