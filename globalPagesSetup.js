import { HomePage } from "./pages/HomePage.js";
import { AboutPage } from "./pages/AboutPage.js";
import { ProductsPage } from "./pages/ProductsPage.js";
import { InstallationsPage } from "./pages/InstallationsPage.js";
import { GalleryPage } from "./pages/GalleryPage.js";
import { ContactPage } from "./pages/ContactPage.js";
import { CartPage } from "./pages/CartPage.js";
// Import OTHER PAGES CLASSES HERE...

/**
 * @type {import('./pages/HomePage.js').HomePage}
 */
export let homePage;

/**
 * @type {import('./pages/AboutPage.js').AboutPage}
 */
export let aboutPage;

/**
 * @type {import('./pages/ProductsPage.js').ProductsPage}
 */
export let productsPage;

/**
 * @type {import('./pages/InstallationsPage.js').InstallationsPage}
 */
export let installationsPage;

/**
 * @type {import('./pages/GalleryPage.js').GalleryPage}
 */
export let galleryPage;

/**
 * @type {import('./pages/ContactPage.js').ContactPage}
 */
export let contactPage;

/**
 * @type {import('./pages/CartPage.js').CartPage}
 */
export let cartPage;

/**
 * @type {import('playwright').Page}
 */
export let page;

/**
 * Initializes the global page elements and instances for the automation framework.
 *
 * @param {import('playwright').Page} argPage - The Playwright Page instance.
 */
export const initElements = (argPage) => {
  page = argPage;
  homePage = new HomePage(page);
  aboutPage = new AboutPage(page);
  productsPage = new ProductsPage(page);
  installationsPage = new InstallationsPage(page);
  galleryPage = new GalleryPage(page);
  contactPage = new ContactPage(page);
  cartPage = new CartPage(page);
};
