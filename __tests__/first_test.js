var path = require('path');
var appRoot = path.resolve(__dirname);

const puppeteer = require('puppeteer');
var document = `<!DOCTYPE html>
<html>
<head>
<title> hello </title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Signika);
    body {
      font-family: 'Signika', sans-serif;
    }
  </style>
  <script>
   function myFunction() {
     document.getElementById('thing').innerHTML = 'pink';
   }
  </script>
</head>
<body>
  <h1>Hello world!</h1>
   <button onclick="myFunction()" id='thing'>Click me</button>
</body>
</html>`

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
