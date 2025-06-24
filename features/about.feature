Feature: About Us Page Functionality
    As a potential customer
    I want to visit the Pinecrest Home Goods About Us page
    So that I can learn about the company, its values, and customer experiences

    Background:
        Given I am on the Pinecrest Home Goods homepage
        
    Scenario: Verify About Us page loads correctly
        When I navigate to the About Us page
        Then I should see the About Us page title "About Us - Pinecrest Home Goods"
        And I should see the main About Us heading
        And I should see the "Who is Pinecrest HomeGoods" section
        And I should see the company description with family business details
        And I should see the company showcase image
        And I should see the "Why Choose Pinecrest" section with 4 benefits
        And I should see the private label section
        And I should see the customer testimonials section

    @smoke @navigation @about @pinecrest
    Scenario: Verify About Us page navigation from homepage
        When I click the About navigation link
        Then I should be redirected to the About Us page
        And the About Us page should load correctly
        And the URL should contain "/about-us/"

    @regression @content @about @pinecrest
    Scenario: Verify company information content
        Given I am on the About Us page
        Then I should see "Welcome to Pinecrest HomeGoods" in the company description
        And I should see "small family-owned business" mentioned
        And I should see "Corded Window Zebra Shades" mentioned
        And I should see "premium polyester with aluminum valences" mentioned
        And I should see custom sizing information "up to 96 inches wide to 78 inches in length"
        And I should see information about importing from "Turkey and Italy"

    @regression @benefits @about @pinecrest
    Scenario: Verify Why Choose Pinecrest benefits section
        Given I am on the About Us page
        When I scroll to the "Why Choose Pinecrest" section
        Then I should see "Quality Manufactured Shades" benefit with icon
        And I should see "Always Best Prices" benefit with icon
        And I should see "60-Day Satisfaction" benefit with icon
        And I should see "Easily Fit Custom Areas" benefit with icon
        And each benefit should have descriptive text

    @regression @testimonials @about @pinecrest
    Scenario: Verify customer testimonials section
        Given I am on the About Us page
        When I scroll to the testimonials section
        Then I should see the heading "See Why Customers Choose Pinecrest for Window Coverings"
        And I should see multiple customer testimonials on about page
        And each testimonial should have customer name and timeframe
        And I should see testimonials from "Anney Dom", "Omar Felix", "John Dolson", and "Noman Ali"
        And testimonials should be navigable with arrow controls

    @regression @images @about @pinecrest
    Scenario: Verify About Us page images
        Given I am on the About Us page
        Then I should see the main company showcase image
        And I should see benefit icons for each "Why Choose Pinecrest" item
        And I should see the product image in the custom areas section
        And all images should have proper alt text

    @regression @links @about @pinecrest
    Scenario: Verify About Us page links and CTAs
        Given I am on the About Us page
        Then I should see testimonial customer name links
        And customer testimonial links should be functional
        And I should see social media links in the footer
        And I should see contact information in the footer

    @accessibility @about @pinecrest
    Scenario: Verify About Us page accessibility
        Given I am on the About Us page
        Then all headings should be properly structured
        And all images should have descriptive alt text
        And all links should be keyboard accessible on about page
        And text should have sufficient color contrast
        And the page should be screen reader friendly

    @performance @about @pinecrest
    Scenario: Verify About Us page performance
        When I navigate to the About Us page
        Then the about page should load within acceptable time limits
        And all images should load successfully
        And there should be no JavaScript errors in the about page console
        And the page should be responsive on different screen sizes
