const { test, expect } = require("@playwright/test");


test("Main page has a link to shopping lists page.", async ({ page }) => {
  await page.goto("/");
  await page.locator('a').click();
  await expect(page.locator('h1')).toHaveText("Shopping lists")
});

test("Can submit and show a list", async ({ page }) => {
  await page.goto("/lists")
  const list = (Math.random() + 1).toString(36).substring(2,7);
  await page.locator("input[type=text]").type(list);
  await page.getByTestId('create').click();
  await expect(page.locator(`a >> text='${list}'`)).toBeVisible();

});

test("Can deactivate a list", async ({ page }) => {
  await page.goto("/lists")
  const list = (Math.random() + 1).toString(36).substring(2,7);
  await page.locator("input[type=text]").type(list);
  await page.getByTestId('create').click();
  await page.getByRole('listitem').filter({ hasText: list }).locator("input[type=submit]").click();
  await expect(page.locator(`a >> text='${list}'`)).toBeHidden();

});


test("Can open a list page.", async ({ page }) => {
  await page.goto("/lists")
  const list = (Math.random() + 1).toString(36).substring(2,7);
  await page.locator("input[type=text]").type(list);
  await page.getByTestId('create').click();
  await page.locator(`a >> '${list}'`).click();
  await expect(page.locator("h1")).toHaveText(list);
});

test("Can add an item to the list.", async ({ page }) => {
  await page.goto("/lists")
  const list = (Math.random() + 1).toString(36).substring(2,7);
  await page.locator("input[type=text]").type(list);
  await page.getByTestId('create').click();
  await page.locator(`a >> '${list}'`).click();
  //add items
  await page.locator("input[type=text]").type("apples");
  await page.getByTestId('add').click();

  await page.locator("input[type=text]").type("milk");
  await page.getByTestId('add').click();

  await page.locator("input[type=text]").type("oranges");
  await page.getByTestId('add').click();

  await expect(page.getByRole('listitem')).toHaveCount(3);
});


