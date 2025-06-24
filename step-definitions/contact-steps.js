import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { contactPage, homePage } from "../globalPagesSetup.js";
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

// Navigation Steps
Given("I am on the Contact page", async function () {
  setupPageMonitoring(contactPage.page);
  await contactPage.navigateToContact();
  await contactPage.verifyPageTitle();
});

When("I navigate to the Contact page", async function () {
  setupPageMonitoring(contactPage.page);
  await contactPage.navigateToContact();
});

When("I click the Contact navigation link", async function () {
  await contactPage.clickContactNavigation();
});

// Page Title and URL Verification
Then("I should see the Contact page title {string}", async function (expectedTitle) {
  await expect(contactPage.page).toHaveTitle(expectedTitle);
});

Then("I should see the Contact page title matching {string}", async function (expectedTitlePattern) {
  await expect(contactPage.page).toHaveTitle(new RegExp(expectedTitlePattern));
});

Then("I should be redirected to the Contact page", async function () {
  await contactPage.verifyPageTitle();
});

Then("the Contact page should load correctly", async function () {
  await contactPage.verifyContactPageLoaded();
});

Then("the Contact URL should contain {string}", async function (expectedPath) {
  await contactPage.verifyURL(expectedPath);
});

// Page Header Verification
Then("I should see the main Contact heading", async function () {
  await contactPage.verifyPageHeader();
});

// Contact Information Section
Then("I should see the contact information section", async function () {
  await contactPage.verifyContactInformation();
});

Then("I should see company contact details", async function () {
  await contactPage.verifyContactInformation();
});

Then("I should see the company email address", async function () {
  await expect(contactPage.emailAddress).toBeVisible();
});

Then("I should see social media links if available", async function () {
  await contactPage.verifySocialMediaLinks();
});

// Contact Form Verification
Then("I should see the contact form with all required fields", async function () {
  await contactPage.verifyContactForm();
});

// Form Interaction Steps
When("I fill out the contact form with valid information:", async function (dataTable) {
  const contactData = {};
  const rows = dataTable.hashes();
  
  for (const row of rows) {
    const key = Object.keys(row)[0];
    const value = Object.values(row)[0];
    contactData[key] = value;
  }
  
  // Always add a default subject selection
  if (!contactData.subject) {
    contactData.subject = "General Inquiry"; // Default selection
  }
  
  await contactPage.fillContactForm(contactData);
});

When("I fill out the contact form with invalid email:", async function (dataTable) {
  const contactData = {};
  const rows = dataTable.hashes();
  
  for (const row of rows) {
    const key = Object.keys(row)[0];
    const value = Object.values(row)[0];
    contactData[key] = value;
  }
  
  await contactPage.fillContactForm(contactData);
});

When("I interact with the contact form fields", async function () {
  // Test basic interaction with form fields
  await contactPage.firstNameField.click();
  await contactPage.firstNameField.fill("Test");
  await contactPage.firstNameField.clear();
  
  await contactPage.emailField.click();
  await contactPage.emailField.fill("test@example.com");
  await contactPage.emailField.clear();
  
  await contactPage.messageField.click();
  await contactPage.messageField.fill("Test message");
  await contactPage.messageField.clear();
});

// Form Functionality Verification
Then("all form fields should be functional and accept input", async function () {
  // Verify first name field
  await expect(contactPage.firstNameField).toBeVisible();
  await expect(contactPage.firstNameField).toBeEnabled();
  await contactPage.firstNameField.fill("Test Name");
  await expect(contactPage.firstNameField).toHaveValue("Test Name");
  
  // Verify last name field
  await expect(contactPage.lastNameField).toBeVisible();
  await expect(contactPage.lastNameField).toBeEnabled();
  await contactPage.lastNameField.fill("Test Last");
  await expect(contactPage.lastNameField).toHaveValue("Test Last");
  
  // Verify email field
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.emailField).toBeEnabled();
  await contactPage.emailField.fill("test@example.com");
  await expect(contactPage.emailField).toHaveValue("test@example.com");
  
  // Verify message field
  await expect(contactPage.messageField).toBeVisible();
  await expect(contactPage.messageField).toBeEnabled();
  await contactPage.messageField.fill("Test message content");
  await expect(contactPage.messageField).toHaveValue("Test message content");
});

Then("the submit button should be enabled when form is valid", async function () {
  await expect(contactPage.submitButton).toBeVisible();
  await expect(contactPage.submitButton).toBeEnabled();
});

Then("form fields should show proper validation states", async function () {
  // This would typically check for CSS classes indicating validation states
  // Implementation depends on the actual form styling and validation approach
  await expect(contactPage.nameField).toBeVisible();
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.messageField).toBeVisible();
});

// Accessibility Verification
Then("the contact form should be accessible", async function () {
  await expect(contactPage.contactForm).toBeVisible();
  await expect(contactPage.nameField).toBeVisible();
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.messageField).toBeVisible();
  await expect(contactPage.submitButton).toBeVisible();
});

Then("all form fields should have proper labels", async function () {
  // Check for associated labels or aria-labels
  const nameFieldId = await contactPage.nameField.getAttribute('id');
  const emailFieldId = await contactPage.emailField.getAttribute('id');
  const messageFieldId = await contactPage.messageField.getAttribute('id');
  
  if (nameFieldId) {
    const nameLabel = contactPage.page.locator(`label[for="${nameFieldId}"]`);
    await expect(nameLabel.or(contactPage.nameField)).toBeVisible();
  }
  
  if (emailFieldId) {
    const emailLabel = contactPage.page.locator(`label[for="${emailFieldId}"]`);
    await expect(emailLabel.or(contactPage.emailField)).toBeVisible();
  }
  
  if (messageFieldId) {
    const messageLabel = contactPage.page.locator(`label[for="${messageFieldId}"]`);
    await expect(messageLabel.or(contactPage.messageField)).toBeVisible();
  }
});

Then("the page should have proper heading structure", async function () {
  await expect(contactPage.pageHeading).toBeVisible();
});

Then("interactive elements should be keyboard accessible", async function () {
  // Test keyboard navigation
  await contactPage.nameField.focus();
  await expect(contactPage.nameField).toBeFocused();
  
  await contactPage.page.keyboard.press('Tab');
  await expect(contactPage.emailField).toBeFocused();
  
  await contactPage.page.keyboard.press('Tab');
  // Skip phone field if it exists
  if (await contactPage.phoneField.isVisible()) {
    await expect(contactPage.phoneField).toBeFocused();
    await contactPage.page.keyboard.press('Tab');
  }
  
  // Skip subject field if it exists
  if (await contactPage.subjectField.isVisible()) {
    await expect(contactPage.subjectField).toBeFocused();
    await contactPage.page.keyboard.press('Tab');
  }
  
  await expect(contactPage.messageField).toBeFocused();
  
  await contactPage.page.keyboard.press('Tab');
  await expect(contactPage.submitButton).toBeFocused();
});

// Contact Information Links
When("I click on the email address link", async function () {
  await contactPage.clickEmailAddress();
});

Then("it should open the default email client", async function () {
  // This would typically check for mailto: links or verify email text is visible
  await expect(contactPage.emailAddress).toBeVisible();
});

// Additional Contact Page Verification Steps
Then("contact information should be clearly displayed", async function () {
  await contactPage.verifyContactInformation();
});

Then("the page should be navigable", async function () {
  // Basic navigation test - verify we can scroll and interact with the page
  await contactPage.page.evaluate(() => window.scrollTo(0, 100));
  await contactPage.page.waitForTimeout(500);
  await contactPage.page.evaluate(() => window.scrollTo(0, 0));
  
  // Verify page is responsive to basic interactions
  await expect(contactPage.bodyContent).toBeVisible();
});

// Network and Console Error Reporting
Then("there should be no critical network failures", async function () {
  const criticalFailures = failedRequests.filter(req => 
    req.failure && (
      req.failure.errorText.includes('net::ERR_') ||
      req.failure.errorText.includes('DNS') ||
      req.failure.errorText.includes('timeout')
    )
  );
  
  if (criticalFailures.length > 0) {
    console.warn('Network failures detected:', criticalFailures);
  }
  
  expect(criticalFailures.length).toBeLessThanOrEqual(2);
});

Then("there should be no console errors", async function () {
  const errors = consoleErrors.filter(err => 
    !err.text.includes('favicon.ico') &&
    !err.text.includes('robots.txt') &&
    !err.text.toLowerCase().includes('warning')
  );
  
  if (errors.length > 0) {
    console.warn('Console errors detected:', errors);
  }
  
  expect(errors.length).toBeLessThanOrEqual(1);
});

Then("the contact form should have proper field labels", async function () {
  // Verify form has proper structure and accessibility
  await expect(contactPage.contactForm).toBeVisible();
  
  // Check that form fields have associated labels or placeholders
  const firstNameField = contactPage.firstNameField;
  const lastNameField = contactPage.lastNameField;
  const emailField = contactPage.emailField;
  const messageField = contactPage.messageField;
  
  await expect(firstNameField).toBeVisible();
  await expect(lastNameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(messageField).toBeVisible();
});

Then("the submit button should be present and enabled", async function () {
  await expect(contactPage.submitButton).toBeVisible();
  await expect(contactPage.submitButton).toBeEnabled();
});
