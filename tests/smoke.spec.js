import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toBeVisible();
});

test('tienda page loads', async ({ page }) => {
  await page.goto('/tienda');
  await expect(page.locator('h1')).toContainText('Tienda');
});

test('homepage nav links work', async ({ page }) => {
  await page.goto('/');
  // Check key sections are reachable
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  await expect(nav.locator('a[href*="colecciones"]').first()).toBeVisible();
  await expect(nav.locator('a[href*="animales"]').first()).toBeVisible();
});

test('encargos page loads', async ({ page }) => {
  await page.goto('/encargar');
  await expect(page.locator('main')).toBeVisible();
});
