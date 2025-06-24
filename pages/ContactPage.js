import { expect } from "@playwright/test";
import { BrowserUtility } from "../utilities/BrowserUtility.js";

export class ContactPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Navigation Elements
    this.contactNavLink = page.locator('nav a[href*="/contact"]').first();

    // Page Header Elements
    this.pageHeading = page
      .locator("h1")
      .filter({ hasText: /Contact/i })
      .first();
    this.mainTitle = page.locator('h1:has-text("Contact")').first();
    this.subHeading = page
      .locator("h2, p")
      .filter({ hasText: /Get in touch|Contact us|Reach out/i })
      .first(); // Contact Information Section
    this.contactInfoSection = page
      .locator("section, div")
      .filter({ hasText: /email|contact.*info/i })
      .first();
    this.companyName = page
      .locator(':has-text("Pinecrest Home Goods")')
      .first();
    this.emailAddress = page
      .locator(':has-text("info@pinecresthomegoods.com")')
      .first();
    this.emailLink = page
      .locator('a[href="mailto:info@pinecresthomegoods.com"]')
      .first();

    // Social Media Links
    this.facebookLink = page.locator('a[href*="facebook"]').first();
    this.instagramLink = page.locator('a[href*="instagram"]').first();
    this.socialMediaSection = page.locator(':has-text("Follow Us")').first(); // Contact Form Elements - WPForms specific selectors
    this.contactForm = page
      .locator('form[action="/contact/"], .wpforms-form')
      .first();
    this.firstNameField = page
      .locator('input[name="wpforms[fields][0][first]"]')
      .first();
    this.lastNameField = page
      .locator('input[name="wpforms[fields][0][last]"]')
      .first();
    this.nameField = this.firstNameField; // For backward compatibility
    this.emailField = page.locator('input[name="wpforms[fields][1]"]').first();
    this.phoneField = page
      .locator('input[name="wpf-temp-wpforms[fields][4]"]')
      .first();
    this.messageField = page
      .locator('textarea[name="wpforms[fields][2]"]')
      .first();
    this.subjectField = page
      .locator('select[name="wpforms[fields][5]"]')
      .first();
    this.submitButton = page
      .locator('button.wpforms-submit, button:has-text("SEND")')
      .first(); // Success/Error Messages
    this.successMessage = page
      .locator(
        '.success, .confirmation, :has-text("thank you"), :has-text("sent successfully"), :has-text("message sent")'
      )
      .first();
    this.errorMessage = page
      .locator('.error, .alert, :has-text("error"), :has-text("required")')
      .first();

    // Page Validation Elements
    this.bodyContent = page.locator("body");
  }

  /**
   * Navigate to the Contact page
   * @param {string} baseUrl - Base URL (optional, defaults to root)
   * @returns {Promise<void>}
   */

  async navigateToContact(baseUrl = "https://www.pinecresthomegoods.com") {
    try {
      // Try the main contact page first
      await this.page.goto(`${baseUrl}/contact/`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await this.waitForPageLoad();
    } catch (error) {
      console.log("Retrying contact page navigation...");
      // Retry with a different approach
      await this.page.goto(`${baseUrl}/contact/`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      await this.waitForPageLoad();
    }
  }

  /**
   * Navigate to Contact page via navigation link from homepage
   * @returns {Promise<void>}
   */

  async clickContactNavigation() {
    try {
      // Get the homepage contact nav link - use a more specific selector
      const homeContactNavLink = this.page
        .locator('nav a[href*="/contact"]', { hasText: "CONTACT" })
        .first();

      // Wait for the Contact link to be available and clickable
      await expect(homeContactNavLink).toBeVisible({ timeout: 10000 });
      await expect(homeContactNavLink).toBeEnabled();

      // Click the Contact navigation link
      await homeContactNavLink.click();

      // Wait for navigation to complete
      await this.page.waitForURL(/.*contact.*/, { timeout: 15000 });
      await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    } catch (error) {
      console.error("Error clicking Contact navigation:", error);
      // Try alternative navigation approach
      await this.page.goto("https://www.pinecresthomegoods.com/contact/");
      await this.waitForPageLoad();
    }
  }

  /**
   * Wait for Contact page to fully load
   * @returns {Promise<void>}
   */

  async waitForPageLoad() {
    try {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
      await expect(this.page).toHaveTitle(/Contact.*Pinecrest/, {
        timeout: 10000,
      });
    } catch (error) {
      console.log("Page load verification failed, continuing...");
      // Just verify we're on a contact-related page
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Verify page title matches expected
   * @returns {Promise<void>}
   */
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Contact.*Pinecrest Home Goods/);
  }

  /**
   * Verify Contact page has loaded correctly
   * @returns {Promise<void>}
   */

  async verifyContactPageLoaded() {
    await expect(this.pageHeading).toBeVisible();

    // Try to find any form that's not a search form
    const contactFormExists = await this.contactForm
      .isVisible()
      .catch(() => false);
    if (contactFormExists) {
      await expect(this.contactForm).toBeVisible();
    } else {
      // If no dedicated contact form, just verify we're on a contact page
      await expect(this.page).toHaveURL(/contact/);
    }
  }

  /**
   * Verify URL contains expected path
   * @param {string} expectedPath - Expected URL path
   * @returns {Promise<void>}
   */

  async verifyURL(expectedPath) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /**
   * Verify page header and title
   * @returns {Promise<void>}
   */

  async verifyPageHeader() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageHeading).toContainText(/contact/i);
  }

  /**
   * Verify contact information section
   * @returns {Promise<void>}
   */

  async verifyContactInformation() {
    await expect(this.emailAddress).toBeVisible();
    await expect(this.socialMediaSection).toBeVisible();
  }
  /**
   * Verify contact form is present and functional
   * @returns {Promise<void>}
   */

  async verifyContactForm() {
    await expect(this.contactForm).toBeVisible();
    await expect(this.firstNameField).toBeVisible();
    await expect(this.lastNameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.messageField).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Fill out the contact form with provided data
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.firstName - First name
   * @param {string} contactData.lastName - Last name
   * @param {string} contactData.name - Full name (will be split if firstName/lastName not provided)
   * @param {string} contactData.email - Email address
   * @param {string} contactData.phone - Phone number (optional)
   * @param {string} contactData.subject - Subject (optional)
   * @param {string} contactData.message - Message content
   * @returns {Promise<void>}
   */

  async fillContactForm(contactData) {
    // Wait for form to be ready
    await expect(this.contactForm).toBeVisible({ timeout: 10000 });

    // Handle name field - split if full name provided
    if (contactData.name && !contactData.firstName && !contactData.lastName) {
      const nameParts = contactData.name.split(" ");
      contactData.firstName = nameParts[0] || "";
      contactData.lastName = nameParts.slice(1).join(" ") || "";
    }

    // Fill first name
    if (contactData.firstName) {
      await expect(this.firstNameField).toBeVisible({ timeout: 5000 });
      await this.firstNameField.fill(contactData.firstName);
    }

    // Fill last name
    if (contactData.lastName) {
      await expect(this.lastNameField).toBeVisible({ timeout: 5000 });
      await this.lastNameField.fill(contactData.lastName);
    }

    // Fill email
    if (contactData.email) {
      await expect(this.emailField).toBeVisible({ timeout: 5000 });
      await this.emailField.fill(contactData.email);
    }

    // Fill phone if field exists
    if (contactData.phone) {
      const phoneFieldExists = await this.phoneField
        .isVisible()
        .catch(() => false);
      if (phoneFieldExists) {
        await this.phoneField.fill(contactData.phone);
      }
    }
    // Always select a reason from dropdown if it's visible
    const subjectFieldExists = await this.subjectField
      .isVisible()
      .catch(() => false);
    if (subjectFieldExists) {
      if (contactData.subject) {
        await this.subjectField.selectOption(contactData.subject);
      } else {
        // Select "Request Information?" as default option (index 1)
        await this.subjectField.selectOption({ index: 1 });
        console.log("Selected default dropdown option: Request Information?");
      }
    }

    // Fill message
    if (contactData.message) {
      await expect(this.messageField).toBeVisible({ timeout: 5000 });
      await this.messageField.fill(contactData.message);
    }
  }

  /**
   * Submit the contact form
   * @returns {Promise<void>}
   */
  async submitContactForm() {
    await this.submitButton.click();
  }

  /**
   * Fill and submit contact form in one action
   * @param {Object} contactData - Contact form data
   * @returns {Promise<void>}
   */

  async fillAndSubmitContactForm(contactData) {
    await this.fillContactForm(contactData);
    await this.submitContactForm();
  }

  /**
   * Verify form submission success
   * @returns {Promise<void>}
   */
  async verifyFormSubmissionSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify form validation errors
   * @returns {Promise<void>}
   */
  async verifyFormValidationErrors() {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Verify social media links
   * @returns {Promise<void>}
   */

  async verifySocialMediaLinks() {
    await expect(this.socialMediaSection).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.facebookLink).toBeEnabled();
    await expect(this.instagramLink).toBeVisible();
    await expect(this.instagramLink).toBeEnabled();
  }

  /**
   * Click on email address link
   * @returns {Promise<void>}
   */

  async clickEmailAddress() {
    if (await this.emailLink.isVisible()) {
      await this.emailLink.click();
    } else {
      // If no clickable link, just verify email text is visible
      await expect(this.emailAddress).toBeVisible();
    }
  }

  /**
   * Verify all contact page elements are present
   * @returns {Promise<void>}
   */

  async verifyAllContactElements() {
    await this.verifyPageHeader();
    await this.verifyContactInformation();
    await this.verifyContactForm();
    await this.verifySocialMediaLinks();
  }
}
