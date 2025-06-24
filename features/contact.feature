Feature: Contact Page Functionality
    As a potential customer
    I want to visit the Pinecrest Home Goods Contact page
    So that I can get in touch with the company and find their contact information

    Background:
        Given I am on the Pinecrest Home Goods homepage

    @contact @smoke @pinecrest
    Scenario: Verify Contact page loads correctly
        When I navigate to the Contact page
        Then I should see the Contact page title "Contact - Pinecrest Home Goods"
        And I should see the main Contact heading        
        And I should see the contact information section
        And I should see the contact form with all required fields
        And I should see company contact details

    @contact @smoke @navigation @pinecrest
    Scenario: Verify Contact page navigation from homepage        
        When I click the Contact navigation link
        Then I should be redirected to the Contact page
        And the Contact page should load correctly
        And the Contact URL should contain "/contact"

    @contact @regression @content @pinecrest
    Scenario: Verify contact information is displayed
        Given I am on the Contact page
        Then I should see the company email address
        And I should see social media links if available

    @contact @regression @accessibility @pinecrest
    Scenario: Verify contact page accessibility and structure
        Given I am on the Contact page
        Then the page should have proper heading structure
        And contact information should be clearly displayed
        And the page should be navigable    
        
    @contact @regression @integration @pinecrest
    Scenario: Verify contact information links functionality
        Given I am on the Contact page
        When I click on the email address link
        Then it should open the default email client    
          
    @contact @regression @form @pinecrest    
    Scenario: Verify contact form fields can be filled with valid data
        Given I am on the Contact page
        When I interact with the contact form fields
        Then all form fields should be functional and accept input
        And the contact form should have proper field labels
        And the submit button should be present and enabled
        
    @contact @regression @form @validation @pinecrest
    Scenario: Verify contact form fields are present and functional
        Given I am on the Contact page
        Then I should see the contact form with all required fields
        And all form fields should be functional and accept input
        And the submit button should be enabled when form is valid    
        
    @contact @regression @functionality @pinecrest
    Scenario: Verify contact form accessibility and structure
        Given I am on the Contact page
        When I interact with the contact form fields
        Then all form fields should be functional and accept input
        And the contact form should have proper field labels
        And the submit button should be present and enabled
