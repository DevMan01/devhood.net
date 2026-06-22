import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test('renders name, portrait, and all 6 social links', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /Tim Chaffin/i }),
    ).toBeVisible();
    await expect(page.getByAltText(/Tim Chaffin/i)).toBeVisible();

    for (const id of [
      'github',
      'linkedin',
      'reddit',
      'facebook',
      'strava',
      'alltrails',
    ]) {
      await expect(page.getByTestId(`social-${id}`)).toBeVisible();
    }
  });

  test('all social links open in a new tab with noopener', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('[data-testid^="social-"]');
    const count = await links.count();
    expect(count).toBe(6);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test('SPA routing serves /blog and /gallery', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();

    await page.goto('/gallery');
    await expect(page.getByRole('heading', { name: /Gallery/i })).toBeVisible();
  });

  test('renders without horizontal overflow on mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
