import { expect } from "@playwright/test";

/**
 * Enhanced assertion utilities for senior SDET framework
 */
export class AssertionUtils {
  /**
   * Soft assertion that continues test execution even on failure
   * @param {Function} assertion - Assertion function
   * @param {string} description - Description of what's being asserted
   * @param {Array} errors - Array to collect errors
   */
  static async softAssert(assertion, description, errors = []) {
    try {
      await assertion();
    } catch (error) {
      errors.push(`${description}: ${error.message}`);
    }
  }

  /**
   * Assert element is visible with custom timeout and error message
   * @param {import('playwright').Locator} locator - Element locator
   * @param {string} elementName - Name of element for error reporting
   * @param {number} timeout - Custom timeout in milliseconds
   */
  static async assertElementVisible(locator, elementName, timeout = 10000) {
    try {
      await expect(locator).toBeVisible({ timeout });
    } catch (error) {
      throw new Error(
        `${elementName} is not visible within ${timeout}ms. ${error.message}`
      );
    }
  }

  /**
   * Assert element is enabled with custom error message
   * @param {import('playwright').Locator} locator - Element locator
   * @param {string} elementName - Name of element for error reporting
   */
  static async assertElementEnabled(locator, elementName) {
    try {
      await expect(locator).toBeEnabled();
    } catch (error) {
      throw new Error(`${elementName} is not enabled. ${error.message}`);
    }
  }

  /**
   * Assert element contains specific text
   * @param {import('playwright').Locator} locator - Element locator
   * @param {string} expectedText - Expected text content
   * @param {string} elementName - Name of element for error reporting
   */
  static async assertElementText(locator, expectedText, elementName) {
    try {
      await expect(locator).toContainText(expectedText);
    } catch (error) {
      const actualText = await locator.textContent();
      throw new Error(
        `${elementName} does not contain expected text. Expected: "${expectedText}", Actual: "${actualText}"`
      );
    }
  }

  /**
   * Assert URL matches pattern
   * @param {import('playwright').Page} page - Playwright page object
   * @param {RegExp|string} expectedUrl - Expected URL pattern
   * @param {string} description - Description for error reporting
   */
  static async assertUrl(page, expectedUrl, description = "URL") {
    try {
      await expect(page).toHaveURL(expectedUrl);
    } catch (error) {
      const actualUrl = page.url();
      throw new Error(
        `${description} does not match expected pattern. Expected: ${expectedUrl}, Actual: ${actualUrl}`
      );
    }
  }

  /**
   * Assert page title matches expected value
   * @param {import('playwright').Page} page - Playwright page object
   * @param {string|RegExp} expectedTitle - Expected page title
   */
  static async assertPageTitle(page, expectedTitle) {
    try {
      await expect(page).toHaveTitle(expectedTitle);
    } catch (error) {
      const actualTitle = await page.title();
      throw new Error(
        `Page title does not match expected. Expected: "${expectedTitle}", Actual: "${actualTitle}"`
      );
    }
  }

  /**
   * Assert element count matches expected
   * @param {import('playwright').Locator} locator - Element locator
   * @param {number} expectedCount - Expected count
   * @param {string} elementName - Name of elements for error reporting
   */
  static async assertElementCount(locator, expectedCount, elementName) {
    try {
      await expect(locator).toHaveCount(expectedCount);
    } catch (error) {
      const actualCount = await locator.count();
      throw new Error(
        `${elementName} count does not match expected. Expected: ${expectedCount}, Actual: ${actualCount}`
      );
    }
  }

  /**
   * Validate all errors collected during soft assertions
   * @param {Array} errors - Array of collected errors
   * @param {string} testDescription - Description of the test
   */
  static validateSoftAssertions(errors, testDescription = "Test") {
    if (errors.length > 0) {
      throw new Error(
        `${testDescription} failed with ${
          errors.length
        } assertion(s):\n${errors.join("\n")}`
      );
    }
  }

  /**
   * Wait for element to be stable (not moving)
   * @param {import('playwright').Locator} locator - Element locator
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForElementStable(locator, timeout = 5000) {
    await locator.waitFor({ state: "visible", timeout });

    // Wait for element to stop moving (useful for animations)
    let previousBoundingBox = await locator.boundingBox();
    let stableCount = 0;
    const maxChecks = 10;

    for (let i = 0; i < maxChecks; i++) {
      await locator.page().waitForTimeout(100);
      const currentBoundingBox = await locator.boundingBox();

      if (
        JSON.stringify(previousBoundingBox) ===
        JSON.stringify(currentBoundingBox)
      ) {
        stableCount++;
        if (stableCount >= 3) break; // Element is stable for 3 consecutive checks
      } else {
        stableCount = 0;
      }

      previousBoundingBox = currentBoundingBox;
    }
  }
}
