var path = require('path');
var appRoot = path.resolve(__dirname);

const puppeteer = require('puppeteer');

describe('Open ProntoTools Website', () => {
  var browser, page;
  var url = document

beforeEach (async () => {
    browser = await puppeteer.launch({ headless: false, slowmo: 10000 });
    page = await browser.newPage();
  })

afterEach (() => {
    browser.close()
  })

test('Title == Pronto Tools', async () => {
    await page.goto('file:///' + appRoot + '/../test.html');
    const title = await page.title();
    await page.screenshot({path: 'screenshot.png'});
    expect(title).toBe("Pronto Tools");
  });

test("Center == Tools for Your Growing Business", async () => {
    await page.goto('file:///' + appRoot + '/test.html');
    await page.setContent(url);
    const center = await page.$eval('h2.font-34.uppercase > strong', e => e.innerHTML);
    expect(center).toBe("Tools for Your Growing Business");
  });
})
