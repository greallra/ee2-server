import puppeteer from "puppeteer";

// (async () => {
//   try {
//     // Launch a headless browser
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();

//     // Go to the Parkrun page
//     await page.goto("https://www.parkrun.ie/tolkavalley/", {
//       waitUntil: "domcontentloaded",
//     });
//     console.log("3");
//     // Wait for the event time element to load (update selector as needed)
//     await page.waitForSelector(".homeleft"); // Update with the correct selector
//     console.log("4");
//     // Extract the event time
//     const eventTime = await page.$eval(".homeleft", (el) => el.textContent);

//     // Output the event time
//     console.log("Event Time:", eventTime);

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     // Handle any errors
//     console.error("Error occurred:", error);
//   }
// })();
console.log("done");
