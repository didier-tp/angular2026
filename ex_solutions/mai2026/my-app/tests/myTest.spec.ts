//NB: il faut préalablement lancer ng-serve ou autre
import { test, expect } from '@playwright/test';
test('good soustraction', async ({page}) => {
    await page.goto("http://localhost:4200/ngr-basic/calculatrice/simple");

    await page.fill('input[name="a"]','9');
    await page.fill('input[name="b"]','6');

    await page.click('input[type="button"][value="-"]');

    await expect(page.locator("#spanRes")).toHaveText("3");
  })