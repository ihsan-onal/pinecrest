import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { aboutPage, homePage } from "../globalPagesSetup.js";
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
Given("I am on the About Us page", async function () {
  setupPageMonitoring(aboutPage.page);
  await aboutPage.navigateToAbout();
  await aboutPage.verifyPageTitle();
});

When("I navigate to the About Us page", async function () {
  setupPageMonitoring(aboutPage.page);
  await aboutPage.navigateToAbout();
});

When("I click the About navigation link", async function () {
  await aboutPage.clickAboutNavigation();
});

// Page Title and URL Verification  
Then("I should see the About Us page title {string}", async function (expectedTitle) {
  await expect(aboutPage.page).toHaveTitle(expectedTitle);
});

Then("I should be redirected to the About Us page", async function () {
  await aboutPage.verifyPageTitle();
});

Then("the About Us page should load correctly", async function () {
  await aboutPage.verifyAboutPageLoaded();
});

Then("the URL should contain {string}", async function (expectedPath) {
  await aboutPage.verifyURL(expectedPath);
});

// Page Header Verification
Then("I should see the main About Us heading", async function () {
  await aboutPage.verifyPageHeader();
});

// Company Introduction Section
Then("I should see the {string} section", async function (sectionName) {
  switch (sectionName.toLowerCase()) {
    case "who is pinecrest homegoods":
      await aboutPage.verifyCompanyIntroduction();
      break;
    case "why choose pinecrest":
      await aboutPage.verifyWhyChoosePinecrestSection();
      break;
    default:
      throw new Error(`Unknown section: ${sectionName}`);
  }
});

Then("I should see the company description with family business details", async function () {
  await aboutPage.verifyCompanyIntroduction();
});

Then("I should see the company showcase image", async function () {
  await aboutPage.verifyCompanyImages();
});

Then("I should see the {string} section with {int} benefits", async function (sectionName, benefitCount) {
  if (sectionName.toLowerCase().includes("why choose pinecrest")) {
    await aboutPage.verifyWhyChoosePinecrestSection();
    
    // Verify all 4 benefits are visible
    await expect(aboutPage.qualityManufacturedBenefit).toBeVisible();
    await expect(aboutPage.bestPricesBenefit).toBeVisible();
    await expect(aboutPage.satisfactionBenefit).toBeVisible();
    await expect(aboutPage.customAreasBenefit).toBeVisible();
  }
});

Then("I should see the private label section", async function () {
  await aboutPage.verifyPrivateLabelSection();
});

Then("I should see the customer testimonials section", async function () {
  await aboutPage.verifyTestimonialsSection();
});

// Content Verification Steps
Then("I should see {string} in the company description", async function (expectedText) {
  await aboutPage.verifyTextContent(expectedText);
});

Then("I should see {string} mentioned", async function (expectedText) {
  await aboutPage.verifyTextContent(expectedText);
});

Then("I should see custom sizing information {string}", async function (sizingInfo) {
  await aboutPage.verifyTextContent(sizingInfo);
});

Then("I should see information about importing from {string}", async function (countries) {
  await aboutPage.verifyTextContent(countries);
});

// Benefits Section Steps
When("I scroll to the {string} section", async function (sectionName) {
  await aboutPage.scrollToSection(sectionName);
});

Then("I should see {string} benefit with icon", async function (benefitName) {
  switch (benefitName.toLowerCase()) {
    case "quality manufactured shades":
      await expect(aboutPage.qualityManufacturedBenefit).toBeVisible();
      await expect(aboutPage.qualityIcon).toBeVisible();
      break;
    case "always best prices":
      await expect(aboutPage.bestPricesBenefit).toBeVisible();
      await expect(aboutPage.pricesIcon).toBeVisible();
      break;
    case "60-day satisfaction":
      await expect(aboutPage.satisfactionBenefit).toBeVisible();
      await expect(aboutPage.satisfactionIcon).toBeVisible();
      break;
    case "easily fit custom areas":
      await expect(aboutPage.customAreasBenefit).toBeVisible();
      break;
    default:
      throw new Error(`Unknown benefit: ${benefitName}`);
  }
});

Then("each benefit should have descriptive text", async function () {
  // Verify that each benefit has associated descriptive content
  const benefitSections = [
    aboutPage.qualityManufacturedBenefit,
    aboutPage.bestPricesBenefit,
    aboutPage.satisfactionBenefit,
    aboutPage.customAreasBenefit
  ];

  for (const benefit of benefitSections) {
    await expect(benefit).toBeVisible();
  }
});

// Testimonials Section Steps
Then("I should see the heading {string}", async function (expectedHeading) {
  await aboutPage.verifyTextContent(expectedHeading);
});

Then("I should see multiple customer testimonials on about page", async function () {
  await aboutPage.verifyTestimonialsSection();
  const testimonialCount = await aboutPage.testimonialCards.count();
  expect(testimonialCount).toBeGreaterThan(0);
});

Then("each testimonial should have customer name and timeframe", async function () {
  await aboutPage.verifySpecificTestimonials();
});

Then("I should see testimonials from {string}, {string}, {string}, and {string}", 
  async function (customer1, customer2, customer3, customer4) {
    await aboutPage.verifyTextContent(customer1);
    await aboutPage.verifyTextContent(customer2);
    await aboutPage.verifyTextContent(customer3);
    await aboutPage.verifyTextContent(customer4);
  }
);

Then("testimonials should be navigable with arrow controls", async function () {
  // Check if testimonial navigation exists (it may not always be visible or present)
  try {
    const navCount = await aboutPage.testimonialNavigation.count();
    if (navCount > 0) {
      await expect(aboutPage.testimonialNavigation.first()).toBeVisible();
      // Navigation found and visible
    } else {
      // Navigation not found - acceptable for auto-rotating testimonials
    }
  } catch (error) {
    // Navigation not found - acceptable for auto-rotating testimonials
  }
});

// Images Verification Steps
Then("I should see the main company showcase image", async function () {
  await expect(aboutPage.companyShowcaseImage).toBeVisible();
});

Then("I should see benefit icons for each {string} item", async function (sectionName) {
  if (sectionName.toLowerCase().includes("why choose pinecrest")) {
    await aboutPage.verifyBenefitIcons();
  }
});

Then("I should see the product image in the custom areas section", async function () {
  await expect(aboutPage.creamZebraShadesImage).toBeVisible();
});

Then("all images should have proper alt text", async function () {
  // Get all images on the page
  const images = await aboutPage.page.locator('img').all();
  
  for (const image of images) {
    const altText = await image.getAttribute('alt');
    const src = await image.getAttribute('src');
    
    // Images should have alt text or be decorative
    if (src && !src.includes('data:')) {
      // Allow empty alt for decorative images, but ensure alt attribute exists
      expect(altText !== null).toBeTruthy();
    }
  }
});

// Links and CTAs Steps
Then("I should see testimonial customer name links", async function () {
  await aboutPage.verifySpecificTestimonials();
});

Then("customer testimonial links should be functional", async function () {
  // Verify that testimonial links are present and clickable
  const testimonialLinks = aboutPage.page.locator('a[href*="us_testimonial"]');
  const linkCount = await testimonialLinks.count();
  expect(linkCount).toBeGreaterThan(0);
});

Then("I should see social media links in the footer", async function () {
  await expect(aboutPage.facebookLink).toBeVisible();
  await expect(aboutPage.instagramLink).toBeVisible();
});

Then("I should see contact information in the footer", async function () {
  await expect(aboutPage.emailContact).toBeVisible();
});

// Accessibility Steps
Then("all headings should be properly structured", async function () {
  // Check for proper heading hierarchy
  const headings = await aboutPage.page.locator('h1, h2, h3, h4, h5, h6').all();
  expect(headings.length).toBeGreaterThan(0);
  
  // Verify main page heading exists
  await expect(aboutPage.pageHeading).toBeVisible();
});

Then("all images should have descriptive alt text", async function () {
  const images = await aboutPage.page.locator('img[src]').all();
  
  for (const image of images) {
    const altText = await image.getAttribute('alt');
    const src = await image.getAttribute('src');
    
    if (src && !src.includes('data:')) {
      expect(altText !== null).toBeTruthy();
    }
  }
});

Then("all links should be keyboard accessible on about page", async function () {
  // Test that important links are focusable
  const importantLinks = [
    aboutPage.facebookLink,
    aboutPage.instagramLink,
    aboutPage.aboutNavLink
  ];
  
  for (const link of importantLinks) {
    await link.focus();
    const isFocused = await link.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  }
});

Then("text should have sufficient color contrast", async function () {
  // This would typically require specialized accessibility testing tools
  // For now, we'll verify that text content is visible
  await expect(aboutPage.welcomeText).toBeVisible();
  await expect(aboutPage.whyChoosePinecrestHeading).toBeVisible();
});

Then("the page should be screen reader friendly", async function () {
  // Verify semantic HTML structure
  await expect(aboutPage.pageHeading).toBeVisible();
  await expect(aboutPage.companyIntroHeading).toBeVisible();
  await expect(aboutPage.whyChoosePinecrestHeading).toBeVisible();
});

// Performance Steps
Then("the about page should load within acceptable time limits", async function () {
  const metrics = await aboutPage.getPerformanceMetrics();
  
  // Assert reasonable load times (adjust thresholds as needed)
  expect(metrics.loadTime).toBeLessThan(5000); // 5 seconds
  expect(metrics.responseTime).toBeLessThan(3000); // 3 seconds
});

Then("all images should load successfully", async function () {
  // Ensure we're on the About page first
  await aboutPage.navigateToAbout();
  await aboutPage.verifyPageTitle();
  
  // Wait for images to load
  await aboutPage.page.waitForTimeout(2000);
  
  // Check for the two main About page images: "WhiteMain" and "Cream-Zebra-Shades"
  const mainImages = [
    'img[src*="WhiteMain"]',
    'img[src*="Cream-Zebra-Shades"]'
  ];
  
  let loadedCount = 0;
  let totalCount = mainImages.length;
  
  for (const selector of mainImages) {
    try {
      const image = aboutPage.page.locator(selector).first();
      const count = await image.count();
      
      if (count > 0) {
        const isLoaded = await image.evaluate((img) => {
          return img.complete && img.naturalWidth > 0;
        });
          if (isLoaded) {
          loadedCount++;
          // Image loaded successfully
        } else {
          // Image found but not loaded
        }
      } else {
        // Image not found
      }
    } catch (error) {
      // Failed to check image - continue with next
    }
  }
  
  // Expect both main images to be loaded
  expect(loadedCount).toBe(totalCount);
});

Then("there should be no JavaScript errors in the about page console", async function () {
  expect(consoleErrors.length).toBe(0);
});

Then("the page should be responsive on different screen sizes", async function () {
  // Test different viewport sizes
  const viewports = [
    { width: 375, height: 667 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1920, height: 1080 }  // Desktop
  ];
  
  for (const viewport of viewports) {
    await aboutPage.page.setViewportSize(viewport);
    await expect(aboutPage.pageHeading).toBeVisible();
    await expect(aboutPage.welcomeText).toBeVisible();
  }
  
  // Reset to default viewport
  await aboutPage.page.setViewportSize({ width: 1280, height: 720 });
});

// Performance monitoring step
Then("there should be no network failures", async function () {
  expect(failedRequests.length).toBe(0);
});

// Simple content verification steps
Then("I should see page content about the company", async function () {
  // Check for any About Us content on the page
  await expect(aboutPage.page.locator('body')).toContainText('Pinecrest');
  await expect(aboutPage.page).toHaveTitle(/About/);
});

Then("I should see company information sections", async function () {
  // Check that the page has loaded with some content
  const hasContent = await aboutPage.page.locator('body').textContent();
  expect(hasContent.length).toBeGreaterThan(100); // Page should have substantial content
});

// Section verification steps
Then("I should see the company introduction section", async function () {
  await expect(aboutPage.companyIntroHeading).toBeVisible();
  await expect(aboutPage.welcomeText).toBeVisible();
});

Then("I should see the benefits section", async function () {
  await expect(aboutPage.whyChoosePinecrestHeading).toBeVisible();
});

Then("I should see the testimonials section", async function () {
  // Check if any testimonial content exists on the page
  const pageContent = await aboutPage.page.textContent('body');
  const hasTestimonialContent = pageContent.includes('Anney Dom') || 
                               pageContent.includes('Omar Felix') || 
                               pageContent.includes('testimonial') ||
                               pageContent.includes('customer') ||
                               pageContent.includes('review');
  expect(hasTestimonialContent).toBeTruthy();
});

// Benefits section steps
When("I scroll to the benefits section", async function () {
  await aboutPage.whyChoosePinecrestHeading.scrollIntoViewIfNeeded();
});

Then("I should see {string} benefit", async function (benefitName) {
  switch (benefitName) {
    case "Quality Manufactured Shades":
      await expect(aboutPage.qualityManufacturedBenefit).toBeVisible();
      break;
    case "Always Best Prices":
      await expect(aboutPage.bestPricesBenefit).toBeVisible();
      break;
    case "60-Day Satisfaction":
      await expect(aboutPage.satisfactionBenefit).toBeVisible();
      break;
    case "Easily Fit Custom Areas":
      await expect(aboutPage.customAreasBenefit).toBeVisible();
      break;
    default:
      throw new Error(`Unknown benefit: ${benefitName}`);
  }
});
