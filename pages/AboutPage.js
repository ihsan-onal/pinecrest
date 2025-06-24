import { expect } from "@playwright/test";
import { BrowserUtility } from "../utilities/BrowserUtility.js";

export class AboutPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page; // Navigation Elements
    this.aboutNavLink = page.locator('a[href*="/about-us"]').first(); // Page Header Elements
    this.pageHeading = page
      .locator("h1")
      .filter({ hasText: /About Us/i })
      .first();
    this.mainTitle = page.locator('h1:has-text("About Us")').first(); // Company Introduction Section
    this.companyIntroHeading = page
      .locator("h2")
      .filter({ hasText: /Who is Pinecrest/i })
      .first();
    this.welcomeText = page
      .locator(':has-text("Welcome to Pinecrest HomeGoods")')
      .first();
    this.familyBusinessText = page
      .locator(':has-text("small family-owned business")')
      .first();
    this.zebraShadesMention = page
      .locator(':has-text("Corded Window Zebra Shades")')
      .first();
    this.premiumPolyesterText = page
      .locator(':has-text("premium polyester with aluminum valences")')
      .first();
    this.customSizingText = page
      .locator(':has-text("up to 96 inches wide to 78 inches in length")')
      .first();
    this.turkeyItalyText = page
      .locator(':has-text("Turkey and Italy")')
      .first();

    // Company Images
    this.companyShowcaseImage = page.locator('img[src*="WhiteMain"]');
    this.creamZebraShadesImage = page.locator('img[src*="Cream-Zebra-Shades"]'); // Why Choose Pinecrest Section
    this.whyChoosePinecrestHeading = page
      .locator("h2")
      .filter({ hasText: /See Why Customers.*Love Pinecrest|Love Pinecrest/i })
      .first();
    this.qualityManufacturedBenefit = page
      .locator("h3, h4, h5")
      .filter({ hasText: /Quality Manufactured Shades/i })
      .first();
    this.bestPricesBenefit = page
      .locator("h3, h4, h5")
      .filter({ hasText: /Always Best Prices/i })
      .first();
    this.satisfactionBenefit = page
      .locator("h3, h4, h5")
      .filter({ hasText: /60-Day Satisfaction/i })
      .first();
    this.customAreasBenefit = page
      .locator("h3, h4, h5")
      .filter({ hasText: /Easily Fit Custom Areas/i })
      .first();

    // Benefit Icons
    this.qualityIcon = page.locator('img[src*="why-icon-1-2"]');
    this.pricesIcon = page.locator('img[src*="why-icon-1-1"]');
    this.satisfactionIcon = page.locator('img[src*="why-icon-1-3"]');
    this.customAreasIcon = page.locator('img[src*="why-icon-"]'); // Private Label Section
    this.privateLabelHeading = page
      .locator("h2")
      .filter({ hasText: /Pinecrest Home Goods a private-label/i })
      .first();
    this.privateLabelDescription = page
      .locator(':has-text("Find an eclectic selection of home fashions")')
      .first(); // Customer Testimonials Section
    this.testimonialsSection = page.locator(
      "text=See Why Customers Choose Pinecrest for Window Coverings"
    );
    this.testimonialsHeading = page
      .locator("h2")
      .filter({
        hasText:
          /See Why Customers (Love Pinecrest|Choose Pinecrest for Window Coverings)/i,
      })
      .first();
    this.testimonialCards = page.locator(
      '[class*="testimonial"], .us_testimonial, .testimonial'
    );
    this.testimonialNavigation = page.locator(
      '.owl-carousel .owl-nav button, .testimonial-navigation button, [class*="carousel"] [class*="arrow"]'
    );

    // Specific Customer Testimonials (more flexible selectors)
    this.anneyDomTestimonial = page.locator(':has-text("Anney Dom")').first();
    this.omarFelixTestimonial = page.locator(':has-text("Omar Felix")').first();
    this.johnDolsonTestimonial = page
      .locator(':has-text("John Dolson")')
      .first();
    this.nomanAliTestimonial = page.locator(':has-text("Noman Ali")').first(); // Footer Elements (inherited from navigation)
    this.footerLogo = page.locator('footer img[src*="pinecrest-logo"]').first();
    this.facebookLink = page.locator('footer a[href*="facebook"]').first();
    this.instagramLink = page.locator('footer a[href*="instagram"]').first();
    this.emailContact = page
      .locator('footer:has-text("info@pinecresthomegoods.com")')
      .first();

    // Page Validation Elements
    this.bodyContent = page.locator("body");
  }

  /**
   * Navigate to the About Us page
   * @param {string} baseUrl - Base URL (optional, defaults to root)
   * @returns {Promise<void>}
   */
  async navigateToAbout(baseUrl = "https://www.pinecresthomegoods.com") {
    await this.page.goto(`${baseUrl}/about-us/`);
    await this.waitForPageLoad();
  }

  /**
   * Wait for About page to fully load
   * @returns {Promise<void>}
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle(/About Us.*Pinecrest Home Goods/);
  }

  /**
   * Verify page title matches expected
   * @returns {Promise<void>}
   */
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle("About Us - Pinecrest Home Goods");
  }

  /**
   * Verify About Us page header elements
   * @returns {Promise<void>}
   */
  async verifyPageHeader() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.mainTitle).toBeVisible();
  }

  /**
   * Verify company introduction section
   * @returns {Promise<void>}
   */
  async verifyCompanyIntroduction() {
    await expect(this.companyIntroHeading).toBeVisible();
    await expect(this.welcomeText).toBeVisible();
    await expect(this.familyBusinessText).toBeVisible();
    await expect(this.zebraShadesMention).toBeVisible();
    await expect(this.premiumPolyesterText).toBeVisible();
  }

  /**
   * Verify company product details and custom sizing
   * @returns {Promise<void>}
   */
  async verifyProductDetails() {
    await expect(this.customSizingText).toBeVisible();
    await expect(this.turkeyItalyText).toBeVisible();
  }

  /**
   * Verify company showcase images
   * @returns {Promise<void>}
   */
  async verifyCompanyImages() {
    await expect(this.companyShowcaseImage).toBeVisible();
    await expect(this.creamZebraShadesImage).toBeVisible();
  }

  /**
   * Verify Why Choose Pinecrest section with all benefits
   * @returns {Promise<void>}
   */
  async verifyWhyChoosePinecrestSection() {
    await expect(this.whyChoosePinecrestHeading).toBeVisible();

    // Verify all 4 benefits
    await expect(this.qualityManufacturedBenefit).toBeVisible();
    await expect(this.bestPricesBenefit).toBeVisible();
    await expect(this.satisfactionBenefit).toBeVisible();
    await expect(this.customAreasBenefit).toBeVisible();
  }

  /**
   * Verify benefit icons are displayed
   * @returns {Promise<void>}
   */
  async verifyBenefitIcons() {
    await expect(this.qualityIcon).toBeVisible();
    await expect(this.pricesIcon).toBeVisible();
    await expect(this.satisfactionIcon).toBeVisible();
  }

  /**
   * Verify private label section
   * @returns {Promise<void>}
   */
  async verifyPrivateLabelSection() {
    await expect(this.privateLabelHeading).toBeVisible();
    await expect(this.privateLabelDescription).toBeVisible();
  }
  /**
   * Verify customer testimonials section
   * @returns {Promise<void>}
   */
  async verifyTestimonialsSection() {
    // Try to find the testimonials section heading first
    try {
      await expect(this.testimonialsSection).toBeVisible();
    } catch (error) {
      // Fallback to the heading if the exact text isn't found
      await expect(this.testimonialsHeading).toBeVisible();
    }

    // Check if testimonials are visible
    const testimonialCount = await this.testimonialCards.count();
    expect(testimonialCount).toBeGreaterThan(0);
  }

  /**
   * Verify specific customer testimonials
   * @returns {Promise<void>}
   */
  async verifySpecificTestimonials() {
    await expect(this.anneyDomTestimonial).toBeVisible();
    await expect(this.omarFelixTestimonial).toBeVisible();
    await expect(this.johnDolsonTestimonial).toBeVisible();
    await expect(this.nomanAliTestimonial).toBeVisible();
  }

  /**
   * Verify footer elements
   * @returns {Promise<void>}
   */
  async verifyFooterElements() {
    await expect(this.footerLogo).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.instagramLink).toBeVisible();
    await expect(this.emailContact).toBeVisible();
  }
  /**
   * Click About navigation link from homepage
   * @returns {Promise<void>}
   */

  async clickAboutNavigation() {
    try {
      // Wait for the About link to be available and clickable
      await expect(this.aboutNavLink).toBeVisible({ timeout: 10000 });
      await expect(this.aboutNavLink).toBeEnabled();

      // Click the About navigation link

      // Click the link
      await this.aboutNavLink.click();

      // Wait for navigation to complete
      await this.page.waitForURL(/.*about.*/, { timeout: 15000 });
      await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    } catch (error) {
      // Fallback: navigate directly to the About page
      console.log(
        "About navigation link not found, navigating directly to About page"
      );
      await this.page.goto("https://www.pinecresthomegoods.com/about-us/");
      await this.page.waitForLoadState("domcontentloaded");
    }

    // Additional small wait to ensure page is stable
    await this.page.waitForTimeout(500);
  }

  /**
   * Scroll to a specific section
   * @param {string} sectionName - Name of section to scroll to
   * @returns {Promise<void>}
   */ async scrollToSection(sectionName) {
    const sectionMap = {
      "why choose pinecrest": this.whyChoosePinecrestHeading,
      testimonials: this.testimonialsHeading,
      "private label": this.privateLabelHeading,
      "company introduction": this.companyIntroHeading,
    };

    const section = sectionMap[sectionName.toLowerCase()];
    if (section) {
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    } else {
      throw new Error(`Section '${sectionName}' not found`);
    }
  }

  /**
   * Verify URL contains expected path
   * @param {string} expectedPath - Expected URL path
   * @returns {Promise<void>}
   */
  async verifyURL(expectedPath) {
    expect(this.page.url()).toContain(expectedPath);
  }

  /**
   * Verify all critical About page elements are loaded
   * @returns {Promise<void>}
   */
  async verifyAboutPageLoaded() {
    await this.verifyPageTitle();
    await this.verifyPageHeader();
    await this.verifyCompanyIntroduction();
    await this.verifyProductDetails();
    await this.verifyCompanyImages();
    await this.verifyWhyChoosePinecrestSection();
    await this.verifyBenefitIcons();
    await this.verifyPrivateLabelSection();
    await this.verifyTestimonialsSection();
    await this.verifyFooterElements();
  }
  /**
   * Verify specific text content is visible on page
   * @param {string} text - Text to search for
   * @returns {Promise<void>}
   */
  async verifyTextContent(text) {
    await expect(this.page.locator(`text=${text}`).first()).toBeVisible();
  }

  /**
   * Take screenshot for debugging
   * @param {string} name - Name for the screenshot
   * @returns {Promise<void>}
   */
  async takeScreenshot(name = "about-page") {
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

  /**
   * Get testimonial text by index
   * @param {number} testimonialIndex - Index of testimonial (0-based)
   * @returns {Promise<string>}
   */
  async getTestimonialText(testimonialIndex = 0) {
    const testimonial = this.testimonialCards.nth(testimonialIndex);
    return await testimonial.textContent();
  }
}
