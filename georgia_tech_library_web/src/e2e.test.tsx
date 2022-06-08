import puppeteer from "puppeteer";

let browser: puppeteer.Browser, page: puppeteer.Page;

//  ------------------------START OF BEFORE/AFTER TESTS----------------------------------------  //

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1500, height: 800 },
    slowMo: 2,
  });
});

afterAll(async () => {
  browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

afterEach(async () => {
  await page.close();
});

test("First test with puppeteer, page rendering", async () => {
  const items = (await page.content()).match(/\bItems\b/);
  const catalog = (await page.content()).match(/\bCatalog\b/);
  const borrowingActivity = (await page.content()).match(/\bBorrowing Activity\b/);
  const cards = (await page.content()).match(/\bCards\b/);

  expect(items).not.toBe(null);
  expect(catalog).not.toBe(null);
  expect(borrowingActivity).not.toBe(null);
  expect(cards).not.toBe(null);
});

  test("E2E creating new card", async () => {
    await page.click('a[href*="cards"]');
    await delay(450);
    await page.click('[title="AddCard"]');
    await page.type('[id="cardNumber"]', "999999999999");
    await page.keyboard.press("Tab");
    await page.type('[id="dateOfIssue"]', "12/30/2022");
    await page.click('[id="expirationDay"]') 
    for (let i = 0; i < '12/30/2022'.length; i++)
      await page.keyboard.press('Backspace');
    await page.type('[id="expirationDay"]', "12/30/2026");
    await page.click('[id="cardNumber"]')
     await page.click('[title="Submit"]') 
     await delay(800);
  });

test("E2E delete new card", async () => {
    await page.click('a[href*="cards"]');
        await delay(450);
    const [button] = await page.$x("//button[contains(., 'Filters')]");
    await button.click();
    await page.keyboard.type("999999999999");
    await delay(300);
    await page.mouse.click(650, 430, { clickCount: 1 });
    await delay(2000);
    await page.mouse.click(650, 220, { clickCount: 1 });
    await delay(100);
    await page.click('[title="DeleteCard"]')
    await delay(200);
  });



function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}