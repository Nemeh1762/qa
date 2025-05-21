import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.SAUCE_USER_STANDARD!, process.env.SAUCE_PASSWORD!);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Fail login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.SAUCE_USER_LOCKED!, process.env.SAUCE_PASSWORD!);
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('locked out');
  });
});
