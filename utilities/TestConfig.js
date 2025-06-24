// Test configuration constants for Pinecrest Home Goods
export const PINECREST_CONFIG = {
  // Base URLs
  BASE_URL: "https://www.pinecresthomegoods.com",

  // Page URLs
  URLS: {
    HOME: "/",
    ABOUT: "/about-us/",
    PRODUCTS: "/shop/",
    INSTALLATIONS: "/installations/",
    GALLERY: "/gallery/",
    CONTACT: "/contact/",
    MY_ACCOUNT: "/my-account/",
    CART: "/cart/",
  },

  // Expected page titles
  PAGE_TITLES: {
    HOME: "Pinecrest Home Goods",
    ABOUT: "About Us - Pinecrest Home Goods",
    PRODUCTS: "Shop - Pinecrest Home Goods",
    INSTALLATIONS: "Installations - Pinecrest Home Goods",
    GALLERY: "Gallery - Pinecrest Home Goods",
    CONTACT: "Contact - Pinecrest Home Goods",
    MY_ACCOUNT: "My Account - Pinecrest Home Goods",
    CART: "Cart - Pinecrest Home Goods",
  },

  // Timeouts (in milliseconds)
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 15000,
    NETWORK_IDLE: 30000,
  },

  // Test data
  TEST_DATA: {
    CONTACT_EMAIL: "info@pinecresthomegoods.com",
    FACEBOOK_URL: "facebook.com/profile.php?id=100089755204379",
    INSTAGRAM_URL: "instagram.com/pinecresthomegoods",
    COMPANY_PHONE: "", // Add if available
    COMPANY_ADDRESS: "", // Add if available
  },

  // Product specifications
  PRODUCT_SPECS: {
    MIN_WIDTH: 20,
    MAX_WIDTH: 96,
    MAX_HEIGHT: 78,
    MATERIAL: "100% Premium Polyester",
    FEATURES: ["Dual-Layer Design", "Custom Size Availability"],
    GUARANTEE_DAYS: 60,
  },

  // SEO and Meta expectations
  SEO: {
    MIN_TITLE_LENGTH: 10,
    MAX_TITLE_LENGTH: 60,
    MIN_META_DESCRIPTION_LENGTH: 120,
    MAX_META_DESCRIPTION_LENGTH: 160,
  },
};

// Utility functions for test configuration
export class TestConfig {
  /**
   * Get full URL for a page
   * @param {string} page - Page identifier
   * @returns {string} Full URL
   */
  static getFullUrl(page) {
    const pageKey = page.toUpperCase();
    if (PINECREST_CONFIG.URLS[pageKey]) {
      return PINECREST_CONFIG.BASE_URL + PINECREST_CONFIG.URLS[pageKey];
    }
    throw new Error(`URL for page '${page}' not found in configuration`);
  }

  /**
   * Get expected page title
   * @param {string} page - Page identifier
   * @returns {string} Expected page title
   */
  static getPageTitle(page) {
    const pageKey = page.toUpperCase();
    if (PINECREST_CONFIG.PAGE_TITLES[pageKey]) {
      return PINECREST_CONFIG.PAGE_TITLES[pageKey];
    }
    throw new Error(`Page title for '${page}' not found in configuration`);
  }
}
