import { expect } from "@playwright/test";
import { BrowserUtility } from "../utilities/BrowserUtility.js";

export class InstallationsPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // Page navigation and header
    this.installationsNavLink = page
      .locator('a[href*="/installations"]')
      .first();
    this.pageTitle = page.locator('h1:has-text("Installations")').first();
    this.pageHeader = page.locator("h1").first();

    // Main content container
    this.contentContainer = page
      .locator("main, .main-content, .content, body")
      .first();

    // Hero/Banner image
    this.heroImage = page.locator('img[src*="Photo-colors"]').first(); // Thank You Section
    this.thankYouSection = page.locator(
      'h2:has-text("Thank You For Your Purchase!")'
    );
    this.thankYouHeading = page.locator(
      'h2:has-text("Thank You For Your Purchase!")'
    );
    this.introText = page.locator("text=Thank you for purchasing our blinds");
    this.videosCallout = page.locator("text=Below are videos to guide you");
    this.seeVideosButton = page.locator("text=SEE INSTALLATIONS VIDEOS BELOW"); // Tools Section - "What You'll Need"
    this.toolsSection = page.locator('h2:has-text("What You\'ll Need")');
    this.toolsHeading = page.locator('h2:has-text("What You\'ll Need")');

    // Individual tools - using more specific selectors based on actual page structure
    this.electricDrillTool = page.locator('h5:has-text("Electric Drill")');
    this.screwdriverTool = page.locator('h5:has-text("Screwdriver")');
    this.pencilTool = page.locator('h5:has-text("Pencil")');
    this.measuringTapeTool = page.locator('h5:has-text("Measuring Tape")');
    this.ladderTool = page.locator('h5:has-text("Ladder")');

    // Tool icons - based on actual image sources from the website
    this.toolIcons = page.locator('img[src*="what-icon"]');
    this.drillIcon = page.locator('img[src*="what-icon-.png"]');
    this.screwdriverIcon = page.locator('img[src*="what-icon-1-1.png"]');
    this.pencilIcon = page.locator('img[src*="what-icon-1-2.png"]');
    this.measuringTapeIcon = page.locator('img[src*="what-icon-1-3"]');
    this.ladderIcon = page.locator('img[src*="what-icon-1-4"]'); // Installation Sections
    this.outsideMountSection = page.locator(
      'h2:has-text("Installing Outside Mount Shades")'
    );
    this.outsideMountHeading = page.locator(
      'h2:has-text("Installing Outside Mount Shades")'
    );

    this.insideMountSection = page.locator(
      'h2:has-text("Installing Inside Mount Shades")'
    );
    this.insideMountHeading = page.locator(
      'h2:has-text("Installing Inside Mount Shades")'
    );

    // PDF Download - based on actual link from the website
    this.installGuideDownload = page.locator(
      'a:has-text("Install Guide Download")'
    );
    this.pdfLink = page.locator('a[href*="Pinecrest-Installation"]');

    // Videos (if present)
    this.installationVideos = page.locator(
      'video, iframe[src*="youtube"], iframe[src*="vimeo"]'
    );
    this.videoContainer = page.locator(".video-container, .video-wrapper");

    // Navigation and footer elements
    this.backToTopButton = page.locator(
      'text=keyboard_arrow_up, [aria-label*="back to top"]'
    );

    // Loading and error states
    this.loadingIndicator = page.locator(".loading, .spinner");
    this.errorMessage = page.locator(".error, .error-message");
  }
  /**
   * Navigate to the installations page
   */

  async navigateToInstallations() {
    await this.page.goto("https://pinecresthomegoods.com/installations/");
    await this.page.waitForLoadState("networkidle");
    await this.waitForPageLoad();
  }

  /**
   * Navigate to installations via navigation link
   */

  async navigateToInstallationsViaLink() {
    await this.installationsNavLink.click();
    await this.page.waitForLoadState("networkidle");
    await this.waitForPageLoad();
  }

  /**
   * Verify installations page elements are visible
   */

  async verifyInstallationsPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.contentContainer).toBeVisible();
    await expect(this.thankYouHeading).toBeVisible();
  }

  /**
   * Verify the installations page title
   */

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Installations|installations/i);
  }

  /**
   * Wait for the installations page to load completely
   */

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000); // Allow for animations
  }

  /**
   * Verify all required tools are displayed
   */

  async verifyToolsSection() {
    await expect(this.toolsHeading).toBeVisible();

    // Verify all 5 tools are present
    await expect(this.electricDrillTool).toBeVisible();
    await expect(this.screwdriverTool).toBeVisible();
    await expect(this.pencilTool).toBeVisible();
    await expect(this.measuringTapeTool).toBeVisible();
    await expect(this.ladderTool).toBeVisible();
  }

  /**
   * Verify tool icons are displayed
   */

  async verifyToolIcons() {
    const iconCount = await this.toolIcons.count();
    expect(iconCount).toBeGreaterThanOrEqual(5);

    // Verify individual tool icons are visible
    await expect(this.drillIcon).toBeVisible();
    await expect(this.screwdriverIcon).toBeVisible();
    await expect(this.pencilIcon).toBeVisible();
    await expect(this.measuringTapeIcon).toBeVisible();
    await expect(this.ladderIcon).toBeVisible();
  }

  /**
   * Verify both installation mount types are present
   */

  async verifyInstallationSections() {
    await expect(this.outsideMountHeading).toBeVisible();
    await expect(this.insideMountHeading).toBeVisible();
  }

  /**
   * Verify PDF download link is available
   */

  async verifyPDFDownload() {
    await expect(this.installGuideDownload).toBeVisible();

    // Verify the PDF link has proper href
    const pdfHref = await this.installGuideDownload.getAttribute("href");
    expect(pdfHref).toContain(".pdf");
  }

  /**
   * Click on PDF download link
   */

  async clickPDFDownload() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.installGuideDownload.click();
    const download = await downloadPromise;
    return download;
  }
  /**
   * Verify thank you section content
   */

  async verifyThankYouSection() {
    await expect(this.thankYouHeading).toBeVisible();
    await expect(this.introText).toBeVisible();
    await expect(this.videosCallout).toBeVisible();
    await expect(this.seeVideosButton).toBeVisible();
  }

  /**
   * Click on "See Installation Videos" button
   */

  async clickSeeVideosButton() {
    await this.seeVideosButton.click();
    await this.page.waitForTimeout(1000); // Allow for scroll or navigation
  }

  /**
   * Verify videos are present (if any)
   */

  async verifyVideosPresent() {
    const videoCount = await this.installationVideos.count();
    return videoCount > 0;
  }

  /**
   * Verify responsive layout
   * @param {Object} viewport - Viewport size {width, height}
   */

  async verifyResponsiveLayout(viewport) {
    await this.page.setViewportSize(viewport);
    await this.page.waitForTimeout(500);

    // Verify main content is still visible and properly sized
    await expect(this.contentContainer).toBeVisible();

    const containerBox = await this.contentContainer.boundingBox();
    expect(containerBox.width).toBeGreaterThan(0);
    expect(containerBox.width).toBeLessThanOrEqual(viewport.width);
  }

  /**
   * Take screenshot of the installations page
   * @param {string} screenshotName - Name for the screenshot
   */

  async takeScreenshot(screenshotName = "installations") {
    await BrowserUtility.takeScreenshot(this.page, screenshotName);
  }
  /**
   * Scroll to a specific section
   * @param {string} section - Section to scroll to ('tools', 'outside', 'inside', 'thankyou')
   */

  async scrollToSection(section) {
    const sectionMap = {
      tools: this.toolsHeading,
      outside: this.outsideMountHeading,
      inside: this.insideMountHeading,
      thankyou: this.thankYouHeading,
    };

    const targetElement = sectionMap[section.toLowerCase()];
    if (targetElement) {
      await targetElement.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    } else {
      throw new Error(`Section '${section}' not found`);
    }
  }

  /**
   * Verify page accessibility
   */

  async verifyAccessibility() {
    // Verify headings have proper structure
    await expect(this.thankYouHeading).toBeVisible();
    await expect(this.toolsHeading).toBeVisible();
    await expect(this.outsideMountHeading).toBeVisible();
    await expect(this.insideMountHeading).toBeVisible();

    // Verify images have alt text
    const toolIconsWithAlt = await this.toolIcons.evaluateAll(
      (imgs) => imgs.filter((img) => img.alt && img.alt.trim() !== "").length
    );
    expect(toolIconsWithAlt).toBeGreaterThan(0);
  }

  /**
   * Ensure we're on the installations page before performing actions
   */

  async ensureOnInstallationsPage() {
    const currentUrl = this.page.url();

    if (
      !currentUrl.includes("installations") &&
      !currentUrl.includes("pinecresthomegoods.com")
    ) {
      throw new Error(
        `Expected to be on Pinecrest website, but current URL is: ${currentUrl}`
      );
    }

    // If not on installations page specifically, navigate there
    if (!currentUrl.includes("installations")) {
      await this.navigateToInstallations();
    }

    // Wait for page to be ready
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000); // Allow for any animations or lazy loading
  }
}
