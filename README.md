# Pinecrest Home Goods - Test Automation Framework

[![Cucumber.js](https://img.shields.io/badge/Cucumber.js-10.3.1-green.svg)](https://cucumber.io/)
[![Playwright](https://img.shields.io/badge/Playwright-1.53.1-blue.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-ES6+-brightgreen.svg)](https://nodejs.org/)

A comprehensive end-to-end test automation framework for the Pinecrest Home Goods e-commerce website, built with **Cucumber.js** and **Playwright**. This framework provides robust testing capabilities with BDD (Behavior-Driven Development) approach, parallel execution, and detailed reporting.

## Architecture

This project follows the **Page Object Model (POM)** design pattern with **Cucumber BDD** framework, providing:

- **Modular Architecture**: Separate page objects for each website section
- **BDD Testing**: Human-readable test scenarios using Gherkin syntax
- **Cross-Browser Support**: Powered by Playwright for reliable cross-browser testing
- **Parallel Execution**: Configurable parallel test execution for faster feedback
- **Comprehensive Reporting**: Multiple report formats including HTML and JSON

## Code Style & Documentation

- Use JSDoc for complex functions or where parameter/return types are not obvious.
- Avoid redundant comments (e.g., `@returns {Promise<void>}` for simple async functions).
- Keep comments concise and focused on business logic or non-obvious implementation details.
- Use meaningful variable and function names to minimize the need for explanatory comments.

> **Note:** When adding or removing page objects, update `globalPagesSetup.js` accordingly to avoid stale references.

## Debugging & Troubleshooting

- Use `DEBUG=*` or `DEBUG=cucumber*` for verbose output during test runs.
- Screenshots on failure are saved in the `screenshots/` directory.
- Additional debug screenshots (e.g., coupon application) are saved with timestamps.
- Review the console output for error messages and fallback logic during test failures.

## Utilities

- **BrowserUtility.js**: Common browser actions (e.g., checking/unchecking, screenshots).
- **AssertionUtils.js**: Enhanced assertions with soft assert and custom error messages.
- Extend these utilities for reusable actions and assertions across tests.

## Documentation

- Update this README and relevant code comments when adding new features, page objects, or utilities.
- Keep documentation concise and focused on what is not obvious from the code.

## Project Structure

```
pinecrest/
├── features/                    # Gherkin feature files
│   ├── about.feature           # About page tests
│   ├── cart.feature            # Shopping cart functionality
│   ├── contact.feature         # Contact page tests
│   ├── gallery.feature         # Gallery page tests
│   ├── homepage.feature        # Homepage functionality
│   ├── installations.feature   # Installations page tests
│   └── products.feature        # Products page tests
├── pages/                      # Page Object Model classes
│   ├── AboutPage.js
│   ├── CartPage.js
│   ├── ContactPage.js
│   ├── GalleryPage.js
│   ├── HomePage.js
│   ├── InstallationsPage.js
│   └── ProductsPage.js
├── step-definitions/           # Cucumber step definitions
│   ├── about-steps.js
│   ├── cart-steps.js
│   ├── contact-steps.js
│   ├── gallery-steps.js
│   ├── homepage-steps.js
│   ├── installations-steps.js
│   └── products-steps.js
├── hooks/                      # Test hooks (setup/teardown)
│   └── globalHooks.js
├── utilities/                  # Helper utilities
│   ├── AssertionUtils.js       # Custom assertion methods
│   ├── BrowserUtility.js       # Browser management utilities
│   └── TestConfig.js           # Configuration management
├── reports/                    # Test execution reports
├── screenshots/                # Test screenshots
├── test-results/              # Test execution results
├── cucumber.cjs               # Cucumber configuration
├── globalPagesSetup.js        # Page object initialization
└── package.json               # Project dependencies and scripts
```

## Features

### Core Testing Capabilities

- **E2E Testing**: Complete user journey testing across all major pages
- **Shopping Cart Testing**: Comprehensive cart functionality including add/remove/update items
- **Form Validation**: Contact forms and checkout process validation
- **Navigation Testing**: Menu navigation and page routing verification
- **Content Verification**: Dynamic content and element presence validation

### Advanced Features

- **Parallel Execution**: Run tests in parallel (configurable workers)
- **Tag-based Execution**: Run specific test suites using tags (@smoke, @regression, etc.)
- **Screenshot Capture**: Automatic screenshot capture on failures
- **Multiple Browsers**: Chrome, Firefox, Safari, and Edge support
- **Mobile Testing**: Responsive design testing capabilities
- **Performance Testing**: Page load performance validation
- **Accessibility Testing**: Basic accessibility compliance checks

### Test Categories

- **@smoke**: Critical path tests for quick validation
- **@regression**: Comprehensive test suite for full coverage
- **@homepage**: Homepage-specific functionality
- **@cart**: Shopping cart and e-commerce features
- **@navigation**: Site navigation and routing
- **@content**: Content verification and validation
- **@accessibility**: Accessibility compliance tests
- **@performance**: Performance and load time tests

## Installation

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **Git**

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ihsan-onal/pinecrest-automation.git
   cd pinecrest-automation
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npm run playwright:install
   ```

4. **Verify installation**
   ```bash
   npm test -- --dry-run
   ```

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run all tests with parallel execution
npm run test:parallel

# Run smoke tests only
npm run test:smoke

# Run regression tests
npm run test:regression
```

### Feature-Specific Testing

```bash
# Run homepage tests
npm run test:homepage

# Run homepage smoke tests
npm run test:homepage:smoke

# Run specific feature file
npx cucumber-js features/cart.feature

# Run tests with specific tags
npx cucumber-js --tags "@smoke and @cart"
npx cucumber-js --tags "@regression and not @slow"
```

### Advanced Test Options

```bash
# Run tests with custom browser
BROWSER=firefox npm test

# Run tests in headed mode (visible browser)
npm run playwright:test:headed

# Run tests with UI mode
npm run playwright:test:ui

# Generate reports
npm run report
```

### Tag Combinations

```bash
# Smoke tests for homepage
npx cucumber-js --tags "@smoke and @homepage"

# All cart-related tests
npx cucumber-js --tags "@cart"

# Regression tests excluding performance tests
npx cucumber-js --tags "@regression and not @performance"

# Navigation tests across all pages
npx cucumber-js --tags "@navigation"
```

## Reporting

The framework generates multiple report formats:

### HTML Report

- **Location**: `reports/cucumber-report.html`
- **Features**: Interactive HTML report with step details, screenshots, and execution timeline

### JSON Report

- **Location**: `reports/cucumber-report.json`
- **Features**: Machine-readable format for CI/CD integration

### Console Output

- **Progress Bar**: Real-time test execution progress
- **Detailed Logs**: Step-by-step execution details with timing

### Screenshots

- **Automatic Capture**: Screenshots on test failures
- **Location**: `screenshots/` directory
- **Naming**: Timestamped for easy identification

## Configuration

### Cucumber Configuration (`cucumber.cjs`)

```javascript
module.exports = {
  default: {
    parallel: 5, // Number of parallel workers
    timeout: 45000, // Step timeout (45 seconds)
    paths: ["./features/**/*.feature"],
    import: ["./step-definitions/**/*.js", "./hooks/**/*.js"],
    format: [
      "progress-bar",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
    ],
  },
};
```

### Environment Variables

```bash
# Browser selection
export BROWSER=chrome|firefox|safari|edge

# Headless mode
export HEADLESS=true|false

# Base URL override
export BASE_URL=https://www.pinecresthomegoods.com

# Test environment
export ENV=dev|staging|prod
```

## Test Data Management

### Test Configuration

- **File**: `utilities/TestConfig.js`
- **Purpose**: Environment-specific configurations
- **Features**: URL management, timeout settings, browser preferences

### Assertion Utilities

- **File**: `utilities/AssertionUtils.js`
- **Purpose**: Custom assertion methods
- **Features**: Enhanced error messages, screenshot capture, retry logic

## Page Objects

Each page object encapsulates:

### Element Locators

```javascript
// Example from CartPage.js
this.cartNavLink = page.locator('a[href*="/cart"]').first();
this.cartItems = page.locator(
  ".cart_item, tr.woocommerce-cart-form__cart-item"
);
this.proceedToCheckoutButton = page
  .locator('.checkout-button, a:has-text("Proceed to checkout")')
  .first();
```

### Page Actions

```javascript
// Navigation methods
async navigateToCart(baseUrl = "https://www.pinecresthomegoods.com") { ... }

// Interaction methods
async addProductToCart(productName) { ... }
async updateItemQuantity(itemIndex, quantity) { ... }

// Verification methods
async verifyCartContainsItem(productName) { ... }
```

### Error Handling

- Robust error handling with fallback strategies
- Automatic retry mechanisms for flaky operations
- Detailed error logging for debugging

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run playwright:install
      - run: npm run test:smoke
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            reports/
            screenshots/
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npm run playwright:install'
            }
        }
        stage('Test') {
            parallel {
                stage('Smoke Tests') {
                    steps {
                        sh 'npm run test:smoke'
                    }
                }
                stage('Regression Tests') {
                    steps {
                        sh 'npm run test:regression'
                    }
                }
            }
        }
    }
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Report'
            ])
        }
    }
}
```

## Debugging

### Debug Mode

```bash
# Run with debug output
DEBUG=* npm test

# Run specific feature with debug
DEBUG=cucumber* npx cucumber-js features/cart.feature
```

### Screenshot Debugging

- Screenshots automatically captured on failures
- Manual screenshot capture available in page objects
- Timestamped naming for easy correlation

### Browser DevTools

```bash
# Run with browser DevTools open
npm run playwright:test:headed

# Run with Playwright Inspector
PWDEBUG=1 npm test
```

## Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Write** tests following BDD principles
4. **Commit** changes (`git commit -m 'Add amazing feature'`)
5. **Push** to branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Coding Standards

- **ES6+ JavaScript**: Modern JavaScript features
- **Async/Await**: Consistent asynchronous handling
- **JSDoc Comments**: Comprehensive documentation
- **Error Handling**: Robust error management
- **Clean Code**: Readable and maintainable code structure

### Adding New Tests

1. **Create Feature File**: Add `.feature` file in `features/` directory
2. **Write Scenarios**: Use Gherkin syntax with appropriate tags
3. **Implement Steps**: Add step definitions in `step-definitions/`
4. **Create Page Object**: Add page class if testing new page
5. **Update Documentation**: Update README if needed

## Test Coverage

### Current Coverage

- **Homepage**: Complete functionality testing
- **Product Pages**: Navigation, content, and interaction testing
- **Shopping Cart**: Full e-commerce flow testing
- **Contact Forms**: Form validation and submission
- **Gallery**: Image loading and navigation
- **About Page**: Content verification and links
- **Installation Services**: Service information validation

### Planned Enhancements

- **User Authentication**: Login/logout functionality
- **Payment Processing**: Checkout flow completion
- **Search Functionality**: Product search and filtering
- **Mobile Responsiveness**: Enhanced mobile testing
- **Performance Monitoring**: Advanced performance metrics

## Resources

### Documentation

- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/)
- [Page Object Model Guide](https://playwright.dev/docs/pom)

### Best Practices

- [BDD Testing Best Practices](https://cucumber.io/docs/bdd/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Automation Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

## Author

**Ihsan Onal**

- GitHub: [@ihsan-onal](https://github.com/ihsan-onal)
- LinkedIn: [Connect with me](https://linkedin.com/in/ihsan93)
