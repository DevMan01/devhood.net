import { test, expect } from '@playwright/test';

test.describe('Hamburger nav', () => {
  test('opens overlay and reveals Home, Blog, Gallery', async ({ page }) => {
    await page.goto('/');

    const trigger = page.getByTestId('nav-trigger');
    await expect(trigger).toBeVisible();

    await trigger.click();
    const overlay = page.getByTestId('nav-overlay');
    await expect(overlay).toBeVisible();

    for (const label of ['home', 'blog', 'gallery']) {
      await expect(page.getByTestId(`nav-link-${label}`)).toBeVisible();
    }
  });

  test('navigates to /blog and closes the overlay', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-trigger').click();
    await page.getByTestId('nav-link-blog').click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByTestId('nav-overlay')).toBeHidden();
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
  });

  test('Escape closes the overlay', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-trigger').click();
    await expect(page.getByTestId('nav-overlay')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('nav-overlay')).toBeHidden();
  });

  test('trigger is reachable on /blog and /gallery too', async ({ page }) => {
    for (const path of ['/blog', '/gallery']) {
      await page.goto(path);
      await expect(page.getByTestId('nav-trigger')).toBeVisible();
    }
  });

  // Regression: clicking the X used to leave the overlay open.
  test('X button closes the overlay and stays on the same page', async ({
    page,
  }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();

    await page.getByTestId('nav-trigger').click();
    await expect(page.getByTestId('nav-overlay')).toBeVisible();

    await page.getByTestId('nav-close').click();
    await expect(page.getByTestId('nav-overlay')).toBeHidden();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
  });

  // Regression: clicking the link for the page you are already on used to
  // leave the overlay open because the pathname did not change.
  test('clicking the active route closes the overlay without navigating', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByTestId('nav-trigger').click();
    await expect(page.getByTestId('nav-overlay')).toBeVisible();

    await page.getByTestId('nav-link-home').click();
    await expect(page.getByTestId('nav-overlay')).toBeHidden();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: /Tim Chaffin/i })).toBeVisible();
  });

  // Backdrop click should also close.
  test('clicking the backdrop closes the overlay', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-trigger').click();
    await expect(page.getByTestId('nav-overlay')).toBeVisible();

    // Click far away from the close button / menu items.
    await page.mouse.click(50, 300);
    await expect(page.getByTestId('nav-overlay')).toBeHidden();
  });
});
