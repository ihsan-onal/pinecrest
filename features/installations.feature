@installations
Feature: Installations Page
  As a customer who has purchased blinds
  I want to access installation instructions and resources
  So that I can successfully install my window coverings

  Background:
    Given I am on the Pinecrest Home Goods website

  @installations @smoke @pinecrest
  Scenario: Installations page loads successfully
    When I navigate to the installations page
    Then I should see the installations page content
    And I should see the thank you message for my purchase
    And the page title should contain "Installations"

  @installations @content @pinecrest
  Scenario: Tools section displays all required installation tools
    Given I am on the installations page
    When I scroll to the tools section
    Then I should see the "What You'll Need" installation heading
    And I should see all 5 required tools listed:
      | tool            |
      | Electric Drill  |
      | Screwdriver     |
      | Pencil          |
      | Measuring Tape  |
      | Ladder          |
    And I should see icons for each tool

  @installations @content @pinecrest
  Scenario: Installation mount types are displayed
    Given I am on the installations page
    When I view the installation sections
    Then I should see the "Installing Outside Mount Shades" installation section
    And I should see the "Installing Inside Mount Shades" installation section

  @installations @functionality @pinecrest
  Scenario: PDF installation guide is available for download
    Given I am on the installations page
    When I locate the installation guide download link
    Then I should see a link to download the PDF guide
    And the PDF link should have a valid href pointing to a PDF file

  @installations @functionality @pinecrest
  Scenario: Thank you section displays properly
    Given I am on the installations page
    When I view the thank you section
    Then I should see the "Thank You For Your Purchase!" thank you heading
    And I should see text about purchasing blinds
    And I should see information about installation videos
    And I should see a "SEE INSTALLATIONS VIDEOS BELOW" button

  @installations @navigation @pinecrest
  Scenario: Navigate to installations page via navigation link
    Given I am on the homepage
    When I click on the installations navigation link
    Then I should be taken to the installations page
    And I should see the installations page content

  @installations @responsive @pinecrest
  Scenario Outline: Installations page displays correctly on different screen sizes
    Given I am on the installations page
    When I resize the browser to <width>x<height>
    Then the page should display correctly
    And all content should remain accessible

    Examples:
      | width | height |
      | 1920  | 1080   |
      | 1366  | 768    |
      | 768   | 1024   |
      | 375   | 667    |

  @installations @accessibility @pinecrest
  Scenario: Installations page meets accessibility standards
    Given I am on the installations page
    Then all headings should have proper structure
    And all images should have appropriate alt text
    And the page should be keyboard navigable
    
  @installations @error-handling @pinecrest
  Scenario: Handle installation page loading errors gracefully
    Given I am trying to access the installations page
    When there is a network error or page load issue
    Then I should see an appropriate error message
    And the page should retry loading automatically
