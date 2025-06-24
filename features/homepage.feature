Feature: Homepage Functionality
    As a potential customer
    I want to visit the Pinecrest Home Goods homepage
    So that I can learn about their products and services

    @homepage @smoke @pinecrest
    Scenario: Verify homepage loads correctly
        Given I navigate to the Pinecrest Home Goods homepage
        When the page loads completely
        Then I should see the correct page title "Pinecrest Home Goods"
        And I should see all header elements
        And I should see the main navigation menu
        And I should see the hero section with "Adding Life To Your Home"
        And I should see the welcome section with trust indicators
        And I should see product information about Zebra Shades
        And I should see customer photos section
        And I should see why choose Pinecrest section
        And I should see testimonials section
        And I should see footer elements

    @homepage @smoke @navigation @pinecrest
    Scenario: Verify main navigation functionality
        Given I am on the Pinecrest Home Goods homepage
        When I click on each main navigation link
        Then each page should load successfully
        And I should be able to return to the homepage

    @homepage @smoke @cta @pinecrest
    Scenario: Verify Shop Now buttons functionality
        Given I am on the Pinecrest Home Goods homepage
        When I click the main "SHOP NOW" button
        Then I should be redirected to the products page
        And the products page should load correctly

    @homepage @regression @content @pinecrest
    Scenario: Verify homepage content sections
        Given I am on the Pinecrest Home Goods homepage
        Then I should see "Buy Risk-Free" trust indicator
        And I should see "Free Shipping" trust indicator
        And I should see "100% Satisfaction" trust indicator
        And I should see "100% Premium Polyester" product feature
        And I should see "Dual-Layer Design" product feature
        And I should see "Custom Size Availability" product feature
        And I should see size information "Available 20-96 \" Wide"
        And I should see size information "Max Height 78 Inches"

    @homepage @regression @testimonials @pinecrest
    Scenario: Verify customer testimonials section
        Given I am on the Pinecrest Home Goods homepage
        When I scroll to the testimonials section
        Then I should see multiple customer testimonials
        And each testimonial should have customer name and date
        And testimonials should be navigable

    @homepage @regression @footer @pinecrest
    Scenario: Verify footer functionality
        Given I am on the Pinecrest Home Goods homepage
        When I scroll to the footer
        Then I should see the Pinecrest logo
        And I should see social media links for Facebook and Instagram
        And all footer links should be functional

    @homepage @accessibility @pinecrest
    Scenario: Verify homepage accessibility
        Given I am on the Pinecrest Home Goods homepage
        Then all images should have alt text
        And all links should be keyboard accessible
        And all interactive elements should be focusable

    @homepage @performance @pinecrest
    Scenario: Verify homepage performance
        Given I navigate to the Pinecrest Home Goods homepage
        When I measure page load performance
        Then the page should load within acceptable time limits
        And all critical resources should load successfully
        And there should be no JavaScript errors in the browser console