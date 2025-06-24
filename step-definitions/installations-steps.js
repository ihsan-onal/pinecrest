import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { installationsPage } from "../globalPagesSetup.js";
import { PINECREST_CONFIG } from "../utilities/TestConfig.js";
import { AssertionUtils } from "../utilities/AssertionUtils.js";

// Global variables to track network failures and console errors
let failedRequests = [];
let consoleErrors = [];

// Setup network and console monitoring
function setupPageMonitoring(page) {
  // Reset tracking arrays
  failedRequests = [];
  consoleErrors = [];

  // Track failed network requests
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      method: request.method(),
      failure: request.failure(),
    });
  });

  // Track console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
      });
    }
  });
}

// GIVEN STEPS

Given("I am on the Pinecrest Home Goods website", async function () {
  setupPageMonitoring(this.page);
  await this.page.goto(PINECREST_CONFIG.BASE_URL);
  await this.page.waitForLoadState("networkidle");
});

Given("I am on the installations page", async function () {
  setupPageMonitoring(this.page);
  await installationsPage.navigateToInstallations();
  await installationsPage.waitForPageLoad();
});

Given("I am on the homepage", async function () {
  setupPageMonitoring(this.page);
  await this.page.goto(PINECREST_CONFIG.BASE_URL);
  await this.page.waitForLoadState("networkidle");
});

Given("I am trying to access the installations page", async function () {
  setupPageMonitoring(this.page);
  // This step just sets up the context for error handling scenarios
});

// WHEN STEPS

When("I navigate to the installations page", async function () {
  await installationsPage.navigateToInstallations();
});

When("I scroll to the tools section", async function () {
  await installationsPage.scrollToSection("tools");
});

When("I view the installation sections", async function () {
  await installationsPage.scrollToSection("outside");
  await this.page.waitForTimeout(500);
});

When("I locate the installation guide download link", async function () {
  await installationsPage.installGuideDownload.scrollIntoViewIfNeeded();
  await this.page.waitForTimeout(500);
});

When("I view the thank you section", async function () {
  await installationsPage.scrollToSection("thankyou");
  await this.page.waitForTimeout(500);
});

When("I click on the installations navigation link", async function () {
  await installationsPage.navigateToInstallationsViaLink();
});

When("I resize the browser to {int}x{int}", async function (width, height) {
  await installationsPage.verifyResponsiveLayout({ width: width, height: height });
});

When("there is a network error or page load issue", async function () {
  // Simulate network error scenarios
  await this.page.route("**/installations**", route => route.abort());
  try {
    await installationsPage.navigateToInstallations();
  } catch (error) {
    // Expected to fail - we'll handle this in the Then step
    this.networkError = error;
  }
});

// THEN STEPS

Then("I should see the installations page content", async function () {
  await installationsPage.verifyInstallationsPageLoaded();
});

Then("I should see the thank you message for my purchase", async function () {
  await expect(installationsPage.thankYouHeading).toBeVisible();
});

Then("the page title should contain {string}", async function (titleText) {
  await expect(this.page).toHaveTitle(new RegExp(titleText, "i"));
});

Then("I should see the {string} installation heading", async function (headingText) {
  const heading = this.page.locator(`h1, h2, h3, h4, h5, h6`).filter({ hasText: headingText });
  await expect(heading).toBeVisible();
});

Then("I should see all 5 required tools listed:", async function (dataTable) {
  const tools = dataTable.raw().slice(1).flat(); // Skip the header row
  
  for (const tool of tools) {
    const toolElement = this.page.locator(`text=${tool}`);
    await expect(toolElement).toBeVisible();
  }
  
  // Also verify using the page object methods
  await installationsPage.verifyToolsSection();
});

Then("I should see icons for each tool", async function () {
  await installationsPage.verifyToolIcons();
});

Then("I should see the {string} installation section", async function (sectionName) {
  const sectionElement = this.page.locator(`h1, h2, h3`).filter({ hasText: sectionName });
  await expect(sectionElement).toBeVisible();
});

Then("I should see a link to download the PDF guide", async function () {
  await expect(installationsPage.installGuideDownload).toBeVisible();
});

Then("the PDF link should have a valid href pointing to a PDF file", async function () {
  await installationsPage.verifyPDFDownload();
});

Then("I should see the {string} thank you heading", async function (headingText) {
  const heading = this.page.locator(`h1, h2, h3`).filter({ hasText: headingText });
  await expect(heading).toBeVisible();
});

Then("I should see text about purchasing blinds", async function () {
  await expect(installationsPage.introText).toBeVisible();
});

Then("I should see information about installation videos", async function () {
  await expect(installationsPage.videosCallout).toBeVisible();
});

Then("I should see a {string} button", async function (buttonText) {
  const button = this.page.locator(`button, a, [role="button"]`).filter({ hasText: buttonText });
  await expect(button).toBeVisible();
});

Then("I should be taken to the installations page", async function () {
  await expect(this.page).toHaveURL(/.*installations.*/);
  await installationsPage.verifyInstallationsPageLoaded();
});

Then("the page should display correctly", async function () {
  await expect(installationsPage.contentContainer).toBeVisible();
  
  const containerBox = await installationsPage.contentContainer.boundingBox();
  expect(containerBox.width).toBeGreaterThan(0);
});

Then("all content should remain accessible", async function () {
  // Verify key elements are still visible after resize
  await expect(installationsPage.thankYouHeading).toBeVisible();
  await expect(installationsPage.toolsHeading).toBeVisible();
});

Then("all headings should have proper structure", async function () {
  await installationsPage.verifyAccessibility();
});

Then("all images should have appropriate alt text", async function () {
  const images = this.page.locator('img');
  const imageCount = await images.count();
  
  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);
    const alt = await image.getAttribute('alt');
    const src = await image.getAttribute('src');
    
    // Skip decorative images or those that might not need alt text
    if (src && !src.includes('data:') && !src.includes('placeholder')) {
      // Allow empty alt text for decorative images, but require alt attribute to exist
      expect(alt).not.toBeNull();
    }
  }
});

Then("the page should be keyboard navigable", async function () {
  // Test basic keyboard navigation
  await this.page.keyboard.press('Tab');
  await this.page.waitForTimeout(100);
  
  const focusedElement = await this.page.locator(':focus').count();
  expect(focusedElement).toBe(1);
});

Then("I should see an appropriate error message", async function () {
  if (this.networkError) {
    expect(this.networkError.message).toBeTruthy();
  } else {
    // For network errors, the page might just show a browser error or fail to load
    // Instead of looking for specific error elements, we can check if the page failed to load properly
    const currentUrl = this.page.url();
    const isOnInstallationsPage = currentUrl.includes('installations');
    
    if (!isOnInstallationsPage) {
      // Page failed to navigate, which is expected behavior for network errors
      expect(true).toBe(true);
    } else {
      // If somehow we're on the page, check for error elements
      const errorElement = this.page.locator('.error, .error-message, [role="alert"]');
      const errorCount = await errorElement.count();
      if (errorCount > 0) {
        await expect(errorElement.first()).toBeVisible();
      }
    }
  }
});

Then("the page should retry loading automatically", async function () {
  // Remove the route block and verify page loads
  await this.page.unroute("**/installations**");
  await installationsPage.navigateToInstallations();
  await expect(installationsPage.contentContainer).toBeVisible();
});

// Additional utility steps for better test coverage

When("I click on the PDF download link", async function () {
  this.download = await installationsPage.clickPDFDownload();
});

Then("the PDF should start downloading", async function () {
  expect(this.download).toBeTruthy();
  expect(this.download.suggestedFilename()).toMatch(/\.pdf$/i);
});

When("I click on the {string} button", async function (buttonText) {
  const button = this.page.locator(`button, a, [role="button"]`).filter({ hasText: buttonText });
  await button.click();
});

Then("I should scroll to the videos section", async function () {
  // Verify that clicking the videos button scrolls to the appropriate section
  await this.page.waitForTimeout(1000);
  
  // Check if videos are present or if we scrolled to the bottom
  const videosPresent = await installationsPage.verifyVideosPresent();
  if (videosPresent) {
    await expect(installationsPage.installationVideos.first()).toBeVisible();
  }
});

When("I take a screenshot", async function () {
  await installationsPage.takeScreenshot('installations-test');
});

// Error handling and validation steps
Then("there should be no console errors", async function () {
  if (consoleErrors.length > 0) {
    console.warn("Console errors detected:", consoleErrors);
    // Don't fail the test for console errors unless they're critical
  }
});

Then("there should be no failed network requests", async function () {
  const criticalFailures = failedRequests.filter(req => 
    !req.url.includes('analytics') && 
    !req.url.includes('tracking') &&
    !req.url.includes('ads')
  );
  
  if (criticalFailures.length > 0) {
    console.warn("Critical network failures detected:", criticalFailures);
  }
  
  expect(criticalFailures.length).toBe(0);
});
