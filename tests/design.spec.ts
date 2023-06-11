import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/design');
});

test.describe('Testing Design Page', () => {
  test('page has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Design/);
  });

  // BUTTON ----------------------------------------------------
  test('renders a Button component', async ({ page }) => {
    const button = page.getByTestId('button-primary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-sky-600 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Primary');
  });
  test('renders a Button Success component', async ({ page }) => {
    const button = page.getByTestId('button-success');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Success');
  });
  test('renders a Button Danger component', async ({ page }) => {
    const button = page.getByTestId('button-danger');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-red-600 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Danger');
  });
  test('renders a Button Secondary component', async ({ page }) => {
    const button = page.getByTestId('button-secondary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-gray-50 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Secondary');
  });
  test('renders a Button Tertary component', async ({ page }) => {
    const button = page.getByTestId('button-tertary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Tertary');
  });
  test('renders a Button Disabled component', async ({ page }) => {
    const button = page.getByTestId('button-disabled');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/cursor-not-allowed/);
    await expect(button).toBeDisabled();
    await expect(button).toHaveText('Disabled');
    await expect(button).toHaveAttribute('disabled', '');
  });

  // LINK BUTTON ----------------------------------------------------
  test('renders a Link Button component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(/text-sm rounded bg-emerald-600 px-3 py-1.5 font-medium/);
    await expect(linkbutton).toHaveText('Link Button');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
  test('renders a Link Button Secondary component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button-secondary');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(
      /text-sm rounded border border-neutral-300 bg-gray-50 px-3 py-1.5 font-medium/
    );
    await expect(linkbutton).toHaveText('Link Button Secondary');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
  test('renders a Link Button Tertary component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button-tertary');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(/text-sm rounded px-3 py-1.5 font-medium text-neutral-600/);
    await expect(linkbutton).toHaveText('Link Button Tertary');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
});
