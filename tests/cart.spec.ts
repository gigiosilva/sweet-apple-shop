import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.chakra-button').first().click();
    await expect(page).toHaveURL(/cart/);
    await page.waitForSelector('text=Shopping Cart');
  });

  test('change cart item quantity and update total', async ({ page }) => {
    const cartItems = await page.locator('img');
    await expect(await cartItems.count()).toBe(1);

    await page.getByRole('combobox', { name: 'Select quantity' }).selectOption('4');

    const productValue = await page.getByText('$100.00');
    await expect(await productValue.count()).toBeGreaterThan(1);

    const totalValue = await page.getByText('$100.00');
    await expect(await totalValue.count()).toBeGreaterThan(1);
  });

  test('remove item from cart', async ({ page }) => {
    const cartItems = await page.locator('img');
    await expect(await cartItems.count()).toBe(1);

    const removeItem = page.locator('button', { has: page.locator('svg.chakra-icon') });
    await removeItem.click();

    const cartItem = await page.locator('img');
    await expect(await cartItem.count()).toBe(0);

    const emptyCartText = page.locator('text=Your cart is empty');
    await expect(emptyCartText).toBeVisible();
  });

  test('adding shipping and coupon', async ({ page }) => {
    const cartItems = await page.locator('img');
    await expect(await cartItems.count()).toBe(1);

    await page.getByText('Calculate shipping').click();
    const shippingValue = await page.getByText('$0.00');
    await expect(await shippingValue.count()).toBe(1);

    await page.getByText('Add coupon code').click();
    const coupon = await page.getByText('WanderMaps10');
    await expect(coupon).toBeVisible();

    const totalValue = await page.getByText('$22.50');
    await expect(await totalValue.count()).toBe(1);
  });

  test('place order', async ({ page }) => {

    await page.getByPlaceholder('Name').fill('Customer Name');
    await page.getByPlaceholder('Delivery Address').fill('Customer Address');

    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page).toHaveURL('http://localhost:3000/products?orderPlaced=true');

    const orderPlacedText = await page.getByText('Order Placed');
    await expect(orderPlacedText).toBeVisible();
  });
});
