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

  // Heading ----------------------------------------------------
  test('renders a Heading H1 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-3xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 1');
  });
  test('renders a Heading H2 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-2xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 2');
  });
  test('renders a Heading H3 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h3');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 3');
  });
  test('renders a Heading H4 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h4');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText(/Heading 4/);
  });

  // Container ----------------------------------------------------
  test('renders a Container component', async ({ page }) => {
    const container = page.getByTestId('container');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/p-8 relative mb-2 rounded-md border bg-white/);
    await expect(container).toHaveText('Container');
  });
  test('renders a Container Small component', async ({ page }) => {
    const container = page.getByTestId('container-small');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/p-2 relative mb-2 rounded-md border bg-white/);
    await expect(container).toHaveText('Container Small');
  });

  // Badge ----------------------------------------------------
  test('renders a Badge component', async ({ page }) => {
    const badge = page.getByTestId('badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-blue-100 font-semibold text-sky-600 dark:bg-sky-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('badge');
  });
  test('renders a Badge Dark component', async ({ page }) => {
    const badge = page.getByTestId('badge-dark');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-gray-100 font-semibold text-gray-600 dark:bg-gray-600 dark:bg-opacity-10 dark:text-gray-400/
    );
    await expect(badge).toHaveText('dark');
  });
  test('renders a Badge Red component', async ({ page }) => {
    const badge = page.getByTestId('badge-red');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('red');
  });
  test('renders a Badge Green component', async ({ page }) => {
    const badge = page.getByTestId('badge-green');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('green');
  });
  test('renders a Badge Yellow component', async ({ page }) => {
    const badge = page.getByTestId('badge-yellow');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('yellow');
  });
  test('renders a Badge Indigo component', async ({ page }) => {
    const badge = page.getByTestId('badge-indigo');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('indigo');
  });
  test('renders a Badge Purple component', async ({ page }) => {
    const badge = page.getByTestId('badge-purple');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('purple');
  });
  test('renders a Badge Pink component', async ({ page }) => {
    const badge = page.getByTestId('badge-pink');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('pink');
  });

  // Badge Large ----------------------------------------------------
  test('renders a Badge Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-blue-100 font-semibold text-sky-600 dark:bg-sky-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('badge');
  });
  test('renders a Badge Dark Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-dark-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-gray-100 font-semibold text-gray-600 dark:bg-gray-600 dark:bg-opacity-10 dark:text-gray-400/
    );
    await expect(badge).toHaveText('dark');
  });
  test('renders a Badge Red Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-red-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('red');
  });
  test('renders a Badge Green Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-green-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('green');
  });
  test('renders a Badge Yellow Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-yellow-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('yellow');
  });
  test('renders a Badge Indigo Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-indigo-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('indigo');
  });
  test('renders a Badge Purple Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-purple-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('purple');
  });
  test('renders a Badge Pink Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-pink-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10/
    );
    await expect(badge).toHaveText('pink');
  });

  // Checkbox ----------------------------------------------------
  test('renders a Checkbox component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-emerald-500 group-hover:cursor-pointer/
    );
    await expect(checkboxLabel).toContainText('Checkbox');
  });
  test('renders a Checkbox Checked component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-checked');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Checked$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-emerald-500 group-hover:cursor-pointer/
    );
    await expect(checkboxLabel).toContainText('Checkbox Checked');
  });
  test('renders a Checkbox Disabled component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-disabled');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Disabled$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAttribute('disabled', '');
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 text-emerald-600 group-hover:cursor-not-allowed dark:border-neutral-700/
    );
    await expect(checkboxLabel).toContainText('Checkbox Disabled');
  });
  test('renders a Checkbox Checked Disabled component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-checked-disabled');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Checked Disabled$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAttribute('disabled', '');
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 text-emerald-600 group-hover:cursor-not-allowed dark:border-neutral-700/
    );
    await expect(checkboxLabel).toContainText('Checkbox Checked Disabled');
  });

  // Radio ----------------------------------------------------
  test('renders a Radio component', async ({ page }) => {
    const radio = page.getByTestId('radio');
    const radioLabel = page.locator('label').filter({ hasText: /^Blue$/ });
    await expect(radio).toBeVisible();
    await expect(radio).not.toBeChecked();
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 focus:ring-2 focus:ring-emerald-500 group-hover:cursor-pointer/
    );
    await expect(radioLabel).toContainText('Blue');
  });
  test('renders a Radio Checked component', async ({ page }) => {
    const radio = page.getByTestId('radio-checked');
    const radioLabel = page.locator('label').filter({ hasText: /^Red$/ });
    await expect(radio).toBeVisible();
    await expect(radio).toBeChecked();
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 focus:ring-2 focus:ring-emerald-500 group-hover:cursor-pointer/
    );
    await expect(radioLabel).toContainText('Red');
  });
  test('renders a Radio Disabled component', async ({ page }) => {
    const radio = page.getByTestId('radio-disabled');
    const radioLabel = page.locator('label').filter({ hasText: /^Radio Disabled$/ });
    await expect(radio).toBeVisible();
    await expect(radio).not.toBeChecked();
    await expect(radio).toBeDisabled();
    await expect(radio).toHaveAttribute('disabled', '');
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 text-emerald-600 group-hover:cursor-not-allowed dark:border-neutral-700/
    );
    await expect(radioLabel).toContainText('Radio Disabled');
  });
  test('renders a Radio Checked Disabled component', async ({ page }) => {
    const radio = page.getByTestId('radio-checked-disabled');
    const radioLabel = page.locator('label').filter({ hasText: /^Radio Checked Disabled$/ });
    await expect(radio).toBeVisible();
    await expect(radio).toBeChecked();
    await expect(radio).toBeDisabled();
    await expect(radio).toHaveAttribute('disabled', '');
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 text-emerald-600 group-hover:cursor-not-allowed dark:border-neutral-700/
    );
    await expect(radioLabel).toContainText('Radio Checked Disabled');
  });
});
