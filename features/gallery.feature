Feature: Gallery Page - Pinecrest Home Goods
  As a potential customer
  I want to view the gallery of completed installations
  So that I can see examples of work and get inspiration for my own project

  Background:
    Given I am on the Pinecrest Home Goods homepage

  @gallery @smoke @pinecrest
  Scenario: Gallery page loads successfully
    When I navigate to the Gallery page
    And the gallery page loads completely
    Then I should see the correct page title containing "Gallery"
    And I should see the gallery header
    And I should see the image gallery container

  @gallery @images @pinecrest
  Scenario: Gallery displays multiple images
    When I navigate to the Gallery page
    And the gallery loads
    Then I should see multiple gallery images
    And all images should be properly loaded
    And each image should have appropriate alt text for accessibility

  @gallery @interaction @pinecrest
  Scenario: Gallery images are interactive
    When I navigate to the Gallery page
    And I click on the first gallery image
    Then the image should be viewable in a larger format
    And I should be able to close the enlarged view

  @gallery @navigation @pinecrest
  Scenario: Gallery images can be navigated
    When I navigate to the Gallery page
    And I click on the first gallery image
    And the enlarged view opens
    Then I should be able to navigate between images
    And I should be able to return to the gallery view

  @gallery @responsive @pinecrest
  Scenario: Gallery is responsive on different screen sizes
    When I navigate to the Gallery page
    And I view the gallery on mobile size
    Then the gallery should display properly
    When I view the gallery on tablet size  
    Then the gallery should display properly
    When I view the gallery on desktop size
    Then the gallery should display properly

  @gallery @accessibility @pinecrest
  Scenario: Gallery meets accessibility standards
    When I navigate to the Gallery page
    And the gallery loads
    Then all gallery images should have alt text
    And the gallery should be keyboard navigable
    And the gallery should work with screen readers

  @gallery @performance @pinecrest
  Scenario: Gallery loads efficiently
    When I navigate to the Gallery page
    And I measure gallery load performance
    Then all images should load within acceptable time limits
    And there should be no failed image requests
    And the page should be responsive during image loading

  @gallery @content @pinecrest
  Scenario: Gallery showcases various installation types
    When I navigate to the Gallery page
    And the gallery loads
    Then I should see examples of different window treatment types
    And the images should represent quality workmanship
    And the gallery should provide visual inspiration

  @gallery @lazy-loading @pinecrest
  Scenario: Gallery handles image lazy loading properly
    When I navigate to the Gallery page
    And I scroll through the gallery
    Then images should load progressively as they come into view
    And the page performance should remain smooth
    And all images should eventually be loaded

  @gallery @error-handling @pinecrest
  Scenario: Gallery handles missing images gracefully
    When I navigate to the Gallery page
    And the gallery loads
    Then any missing images should not break the layout
    And error states should be handled gracefully
    And the gallery should remain functional
