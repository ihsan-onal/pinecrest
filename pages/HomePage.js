import { expect } from "@playwright/test";
import { BrowserUtility } from "../utilities/BrowserUtility.js";

export class HomePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page; // Header Elements
    this.logo = page
      .locator(
        'header img[src*="pinecrest-logo"], #page-header img[src*="pinecrest-logo"]'
      )
      .first();
    this.supportBanner = page
      .locator("text=LUXURY HOME GOODS AT GREAT PRICES")
      .or(page.locator("text=FREE SHIPPING"))
      .first();
    this.getSupportButton = page.locator("text=GET SUPPORT");
    this.emailSupportButton = page.locator("text=EMAIL SUPPORT");
    this.myAccountLink = page.locator("text=MY ACCOUNT");
    this.cartLink = page
      .locator('a[href*="/cart"]')
      .or(page.locator("text=Cart"))
      .first();
    this.customerServiceIcon = page.locator(
      'img[src*="customer-service-icon"]'
    ); // Main Navigation
    this.homeNavLink = page
      .locator('nav a[href*="pinecresthomegoods.com/"], nav a[href="/"]')
      .first();
    this.aboutNavLink = page.locator('nav a[href*="/about"]').first();
    this.productsNavLink = page
      .locator('nav a[href*="/shop"]:not([class*="btn"])')
      .first();
    this.installationsNavLink = page
      .locator('nav a[href*="/installations"]')
      .first();
    this.galleryNavLink = page.locator('nav a[href*="/gallery"]').first();
    this.contactNavLink = page.locator('nav a[href*="/contact"]').first();

    // Hero Section
    this.heroSection = page.locator("text=Adding Life To Your Home");
    this.heroHeading = page
      .locator("h1, h2")
      .filter({ hasText: /Adding Life To Your Home|Luxury Zebra Shades/ });
    this.mainShopNowButton = page
      .locator('a[href*="/shop"]')
      .filter({ hasText: "SHOP NOW" })
      .first(); // Welcome Section
    this.welcomeSection = page
      .locator("p:has-text('Welcome To Pinecrest Home Goods')")
      .first();
    this.buyRiskFreeSection = page.locator("text=Buy Risk-Free").first();
    this.freeShippingSection = page
      .locator('h5:has-text("Free Shipping")')
      .first();
    this.satisfactionSection = page.locator("text=100% Satisfaction").first(); // Product Information Sections
    this.zebraShadesHeading = page
      .locator("h2, h3")
      .filter({ hasText: "Zebra Shades" })
      .nth(1); // Take the second one (the actual product heading, not the hero one)
    this.premiumPolyesterSection = page.locator("text=100% Premium Polyester");
    this.dualLayerSection = page.locator("text=Dual-Layer Design");
    this.customSizeSection = page.locator("text=Custom Size Availability");

    // Product Features
    this.productDescriptionText = page.locator(
      "text=Light, airy and always inviting"
    );
    this.secondaryShopNowButton = page
      .locator('a[href*="/shop"]')
      .filter({ hasText: "SHOP NOW" })
      .nth(1);

    // Customer Photos Section
    this.customerPhotosHeading = page.locator("text=Customer Photos");
    this.customerPhotosGrid = page.locator('img[src*="photo-"]');
    this.installationPhotoText = page.locator(
      "text=Send Us Your Installation Photo"
    );

    // Why Choose Pinecrest Section
    this.whyChooseSection = page.locator(
      "text=See Why Customers Love Pinecrest"
    );
    this.qualityManufacturedSection = page.locator(
      "text=Quality Manufactured Shades"
    );
    this.bestPricesSection = page.locator("text=Always Best Prices");
    this.satisfactionGuaranteeSection = page.locator(
      "text=60-Day Satisfaction"
    );
    this.customAreasSection = page.locator("text=Easily Fit Custom Areas");

    // Size Information
    this.widthInfo = page
      .locator(':text("20-96")')
      .or(page.locator(':text("Available")'))
      .first();
    this.heightInfo = page.locator("text=Max Height 78 Inches");

    // Testimonials Section
    this.testimonialsSection = page.locator(
      "text=See Why Customers Choose Pinecrest for Window Coverings"
    );
    this.testimonialCards = page.locator(
      '[class*="testimonial"], .us_testimonial'
    );
    this.testimonialNavigation = page.locator(
      "keyboard_arrow_left, keyboard_arrow_right"
    ); // Footer Elements
    this.footerLogo = page.locator('footer img[src*="pinecrest-logo"]');
    this.facebookLink = page.locator('a[href*="facebook"]');
    this.instagramLink = page.locator('a[href*="instagram"]');

    // Page Validation Elements
    this.pageTitle = page.locator("title");
    this.bodyContent = page.locator("body");
  }

  /**
   * Navigate to the home page
   * @param {string} baseUrl - Base URL (optional, defaults to root)
   * @returns {Promise<void>}
   */

  async navigateToHome(baseUrl = "https://www.pinecresthomegoods.com") {
    await this.page.goto(baseUrl);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to fully load
   * @returns {Promise<void>}
   */

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle("Pinecrest Home Goods");
  }

  /**
   * Verify page title matches expected
   * @returns {Promise<void>}
   */

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle("Pinecrest Home Goods");
  }

  /**
   * Verify home page header elements are visible and functional
   * @returns {Promise<void>}
   */
  async verifyHeaderElements() {
    await expect(this.logo).toBeVisible();
    await expect(this.supportBanner).toBeVisible();
    await expect(this.getSupportButton).toBeVisible();
    await expect(this.myAccountLink).toBeVisible();
    await expect(this.cartLink).toBeVisible();
  }

  /**
   * Verify main navigation is visible and clickable
   * @returns {Promise<void>}
   */

  async verifyMainNavigation() {
    const navLinks = [
      { element: this.homeNavLink, name: "Home" },
      { element: this.aboutNavLink, name: "About" },
      { element: this.productsNavLink, name: "Products" },
      { element: this.installationsNavLink, name: "Installations" },
      { element: this.galleryNavLink, name: "Gallery" },
      { element: this.contactNavLink, name: "Contact" },
    ];

    for (const link of navLinks) {
      await expect(link.element).toBeVisible({ timeout: 10000 });
      await expect(link.element).toBeEnabled();
    }
  }

  /**
   * Verify hero section is displayed correctly
   * @returns {Promise<void>}
   */

  async verifyHeroSection() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroHeading).toBeVisible();
    await expect(this.mainShopNowButton).toBeVisible();
    await expect(this.mainShopNowButton).toBeEnabled();
  }

  /**
   * Verify welcome section with trust indicators
   * @returns {Promise<void>}
   */

  async verifyWelcomeSection() {
    await expect(this.welcomeSection).toBeVisible();
    await expect(this.buyRiskFreeSection).toBeVisible();
    await expect(this.freeShippingSection).toBeVisible();
    await expect(this.satisfactionSection).toBeVisible();
  }

  /**
   * Verify product information sections
   * @returns {Promise<void>}
   */

  async verifyProductInformation() {
    await expect(this.zebraShadesHeading).toBeVisible();
    await expect(this.premiumPolyesterSection).toBeVisible();
    await expect(this.dualLayerSection).toBeVisible();
    await expect(this.customSizeSection).toBeVisible();
    await expect(this.productDescriptionText).toBeVisible();
  }

  /**
   * Verify customer photos section
   * @returns {Promise<void>}
   */

  async verifyCustomerPhotosSection() {
    await expect(this.customerPhotosHeading).toBeVisible();
    await expect(this.customerPhotosGrid.first()).toBeVisible();
    await expect(this.installationPhotoText).toBeVisible();
  }

  /**
   * Verify why choose Pinecrest section
   * @returns {Promise<void>}
   */

  async verifyWhyChoosePinecrestSection() {
    await expect(this.whyChooseSection).toBeVisible();
    await expect(this.qualityManufacturedSection).toBeVisible();
    await expect(this.bestPricesSection).toBeVisible();
    await expect(this.satisfactionGuaranteeSection).toBeVisible();
    await expect(this.customAreasSection).toBeVisible();
  }

  /**
   * Verify size information is displayed
   * @returns {Promise<void>}
   */

  async verifySizeInformation() {
    await expect(this.widthInfo).toBeVisible();
    await expect(this.heightInfo).toBeVisible();
  }

  /**
   * Verify testimonials section
   * @returns {Promise<void>}
   */

  async verifyTestimonialsSection() {
    await expect(this.testimonialsSection).toBeVisible();
    // Check if at least one testimonial is visible
    const testimonialCount = await this.testimonialCards.count();
    expect(testimonialCount).toBeGreaterThan(0);
  }

  /**
   * Verify footer elements
   * @returns {Promise<void>}
   */

  async verifyFooterElements() {
    await expect(this.footerLogo).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.instagramLink).toBeVisible();
  }

  /**
   * Click main Shop Now button
   * @returns {Promise<void>}
   */

  async clickMainShopNowButton() {
    await this.mainShopNowButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Click secondary Shop Now button
   * @returns {Promise<void>}
   */

  async clickSecondaryShopNowButton() {
    await this.secondaryShopNowButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigate to specific page via main navigation
   * @param {string} pageName - Name of the page to navigate to
   * @returns {Promise<void>}
   */

  async navigateToPage(pageName) {
    const navMap = {
      home: this.homeNavLink,
      about: this.aboutNavLink,
      products: this.productsNavLink,
      installations: this.installationsNavLink,
      gallery: this.galleryNavLink,
      contact: this.contactNavLink,
    };

    const navLink = navMap[pageName.toLowerCase()];
    if (navLink) {
      await navLink.click();
      await this.page.waitForLoadState("networkidle");
    } else {
      throw new Error(`Navigation link for '${pageName}' not found`);
    }
  }

  /**
   * Click on customer photo
   * @param {number} photoIndex - Index of photo to click (0-based)
   * @returns {Promise<void>}
   */

  async clickCustomerPhoto(photoIndex = 0) {
    const photos = this.customerPhotosGrid;
    await photos.nth(photoIndex).click();
  }

  /**
   * Get testimonial text by index
   * @param {number} testimonialIndex - Index of testimonial (0-based)
   * @returns {Promise<string>}
   */

  async getTestimonialText(testimonialIndex = 0) {
    const testimonial = this.testimonialCards.nth(testimonialIndex);
    return await testimonial.textContent();
  }

  /**
   * Verify all critical elements are loaded and functional
   * @returns {Promise<void>}
   */

  async verifyHomePageLoaded() {
    await this.verifyPageTitle();
    await this.verifyHeaderElements();
    await this.verifyMainNavigation();
    await this.verifyHeroSection();
    await this.verifyWelcomeSection();
    await this.verifyProductInformation();
    await this.verifyCustomerPhotosSection();
    await this.verifyWhyChoosePinecrestSection();
    await this.verifySizeInformation();
    await this.verifyTestimonialsSection();
    await this.verifyFooterElements();
  }

  /**
   * Take screenshot for debugging
   * @param {string} name - Name for the screenshot
   * @returns {Promise<void>}
   */

  async takeScreenshot(name = "homepage") {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Get page performance metrics
   * @returns {Promise<Object>}
   */

  async getPerformanceMetrics() {
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        responseTime: navigation.responseEnd - navigation.requestStart,
      };
    });
    return metrics;
  }
}
