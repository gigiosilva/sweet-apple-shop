import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + '/products/1e780016-94ef-4063-9fbb-fbafbabb636e');
  });

  test('product details adds product to cart', async ({ page }) => {
    await page.locator('.chakra-button').first().click();

    await expect(page).toHaveURL(/cart/);

    await page.waitForSelector('text=Shopping Cart');

    const getProductDetails = await page.locator('img');
    await expect(await getProductDetails.count()).toBe(1);
  });

  test('product details not found', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/products/4392');

    const getProductNotFound = await page.locator('rect');
    await expect(await getProductNotFound.count()).toBeGreaterThan(0);
  });
});
