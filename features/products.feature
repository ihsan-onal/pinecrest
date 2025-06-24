Feature: Products Page Functionality
    As a potential customer
    I want to visit the Pinecrest Home Goods Products page
    So that I can browse and view available window covering products

    Background:
        Given I am on the Pinecrest Home Goods homepage

    @products @smoke @pinecrest
    Scenario: Verify Products page loads correctly
        When I navigate to the Products page
        Then I should see the Products page title "Products Archive - Pinecrest Home Goods"
        And I should see the main Shop heading
        And I should see the products grid
        And I should see breadcrumbs navigation
        And I should see multiple products displayed

    @products @smoke @navigation @pinecrest
    Scenario: Verify Products page navigation from homepage
        When I click the Products navigation link
        Then I should be redirected to the Products page
        And the Products page should load correctly
        And the Products URL should contain "/shop"

    @products @regression @content @pinecrest
    Scenario: Verify product listings are displayed
        Given I am on the Products page
        Then I should see product grid with multiple items
        And I should see featured products like "Brown Zebra Shades"
        And I should see featured products like "Cream Zebra Shades"
        And I should see featured products like "Gray Zebra Shades"
        And each product should display pricing information
        And each product should have interaction buttons

    @products @regression @navigation @pinecrest
    Scenario: Verify product navigation and interaction
        Given I am on the Products page
        When I click on a product "Brown Zebra Shades"
        Then I should be taken to the product detail page
        And the product detail page should load correctly

    @products @regression @functionality @pinecrest
    Scenario: Verify products page structure and accessibility
        Given I am on the Products page
        Then the products page should have proper heading structure
        And products should be clearly displayed with pricing
        And product interaction elements should be accessible
        And the products page should be navigable

    @products @regression @content @grid @pinecrest
    Scenario: Verify product grid functionality
        Given I am on the Products page
        Then I should see products arranged in a grid layout
        And each product should have a title
        And each product should show price information
        And each product should have "Select options" or "Add to Cart" button
        And product images should be displayed

    @products @regression @filters @pinecrest
    Scenario: Verify product filtering capabilities
        Given I am on the Products page
        Then I should see filter options if available
        And filtering functionality should be accessible

    @products @regression @categories @pinecrest
    Scenario: Verify product categories
        Given I am on the Products page
        Then I should see products in the window shades category
        And category navigation should be clear
        And products should be properly categorized
