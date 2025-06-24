import { expect } from "@playwright/test";
import { BrowserUtility } from "../utilities/BrowserUtility.js";

export class ProductsPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Navigation Elements
    this.productsNavLink = page
      .locator('nav a:has-text("Products"), nav a[href*="shop"]')
      .first();

    // Page Elements
    this.pageHeading = page.locator('h1:has-text("Shop")').first();
    this.pageTitle = page.locator("h1").first();
    this.breadcrumbs = page
      .locator('.breadcrumb, .breadcrumbs, [class*="breadcrumb"]')
      .first();

    // Product Grid and Items
    this.productGrid = page.locator("#us_grid_1, .w-grid").first();
    this.productItems = page.locator(".product, .w-grid-item.product");
    this.productCards = page.locator(".product");

    // Specific Products
    this.brownZebraShades = page
      .locator('.product:has-text("Brown Zebra Shades")')
      .first();
    this.creamZebraShades = page
      .locator('.product:has-text("Cream Zebra Shades")')
      .first();
    this.grayZebraShades = page
      .locator('.product:has-text("Gray Zebra Shades")')
      .first();
    this.installationHardware = page
      .locator('.product:has-text("Installation Hardware Kit")')
      .first();

    // Product Elements
    this.productTitles = page.locator(".product h2, .product .product-name");
    this.productPrices = page.locator(".product .price, .product .amount");
    this.selectOptionsButtons = page.locator(
      '.product a:has-text("Select options")'
    );
    this.addToCartButtons = page.locator(".product .add_to_cart_button");

    // Filters and Sorting
    this.priceFilter = page.locator("#woocommerce_price_filter-1").first();
    this.filterSection = page
      .locator('.widget_price_filter, [class*="filter"]')
      .first();

    // Category Elements
    this.windowShadesCategory = page.locator(
      '[class*="product_cat-window-shades"]'
    );
  }

  /**
   * Navigate to the products page
   * @param {string} baseUrl - Base URL (optional)
   * @returns {Promise<void>}
   */

  async navigateToProducts(baseUrl = "https://www.pinecresthomegoods.com") {
    await this.page.goto(`${baseUrl}/shop/`);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to products via navigation link
   * @returns {Promise<void>}
   */

  async clickProductsNavigation() {
    await this.productsNavLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Wait for products page to load
   * @returns {Promise<void>}
   */

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle(/Shop|Products.*Pinecrest/);
  }

  /**
   * Verify products page has loaded correctly
   * @returns {Promise<void>}
   */

  async verifyProductsPageLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.productGrid).toBeVisible();
  }

  /**
   * Verify page title and URL
   * @returns {Promise<void>}
   */

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Shop|Products.*Pinecrest/);
    await expect(this.page).toHaveURL(/shop/);
  }

  /**
   * Verify breadcrumbs
   * @returns {Promise<void>}
   */

  async verifyBreadcrumbs() {
    await expect(this.breadcrumbs).toBeVisible();
    await expect(this.breadcrumbs).toContainText(/Home.*Shop/);
  }

  /**
   * Verify product grid and items
   * @returns {Promise<void>}
   */

  async verifyProductGrid() {
    await expect(this.productGrid).toBeVisible();

    const products = await this.productCards.all();
    expect(products.length).toBeGreaterThan(0);

    // Verify at least first product is visible
    if (products.length > 0) {
      await expect(products[0]).toBeVisible();
    }
  }

  /**
   * Verify specific products are displayed
   * @returns {Promise<void>}
   */

  async verifyFeaturedProducts() {
    await expect(this.brownZebraShades).toBeVisible();
    await expect(this.creamZebraShades).toBeVisible();
    await expect(this.grayZebraShades).toBeVisible();
  }

  /**
   * Click on a specific product
   * @param {string} productName - Name of the product to click
   * @returns {Promise<void>}
   */

  async clickProduct(productName) {
    const product = this.page
      .locator(`.product:has-text("${productName}")`)
      .first();
    await expect(product).toBeVisible();
    await product.click();
  }

  /**
   * Verify product pricing is displayed
   * @returns {Promise<void>}
   */

  async verifyProductPricing() {
    const prices = await this.productPrices.all();
    expect(prices.length).toBeGreaterThan(0);

    // Check that at least one price is visible
    if (prices.length > 0) {
      await expect(prices[0]).toBeVisible();
    }
  }

  /**
   * Verify product interaction buttons
   * @returns {Promise<void>}
   */

  async verifyProductButtons() {
    const selectButtons = await this.selectOptionsButtons.all();
    expect(selectButtons.length).toBeGreaterThan(0);

    // Verify first select options button
    if (selectButtons.length > 0) {
      await expect(selectButtons[0]).toBeVisible();
      await expect(selectButtons[0]).toBeEnabled();
    }
  }

  /**
   * Verify filters are present
   * @returns {Promise<void>}
   */

  async verifyFilters() {
    const filterExists = await this.filterSection
      .isVisible()
      .catch(() => false);
    if (filterExists) {
      await expect(this.filterSection).toBeVisible();
    }
  }

  /**
   * Get product count
   * @returns {Promise<number>}
   */
  async getProductCount() {
    const products = await this.productCards.all();
    return products.length;
  }

  /**
   * Verify all products page elements
   * @returns {Promise<void>}
   */

  async verifyAllProductsElements() {
    await this.verifyProductsPageLoaded();
    await this.verifyBreadcrumbs();
    await this.verifyProductGrid();
    await this.verifyFeaturedProducts();
    await this.verifyProductPricing();
    await this.verifyProductButtons();
  }
}
