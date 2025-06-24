Feature: Cart Functionality
    As a customer
    I want to manage my shopping cart
    So that I can purchase window coverings and accessories

    Background:
        Given I am on the Pinecrest Home Goods homepage

    @cart @smoke @pinecrest
    Scenario: View empty cart
        When I navigate to the cart page
        Then I should see the cart page title "Cart - Pinecrest Home Goods"
        And I should see the empty cart message
        And I should see "Return to shop" or "Continue shopping" button
        And the cart total should be "$0.00"

    @cart @smoke @add-to-cart @pinecrest
    Scenario: Add single item to cart from products page
        When I navigate to the Products page
        And I select the first available product
        And I add the product to cart
        Then I should be redirected to the cart page
        And I should see 1 item in the cart
        And I should see the product details in cart
        And the cart total should be greater than "$0.00"

    @cart @regression @add-to-cart @pinecrest
    Scenario: Add multiple different items to cart
        When I navigate to the Products page
        And I add "Brown Zebra Shades" to cart
        And I continue shopping
        And I add "Cream Zebra Shades" to cart
        And I continue shopping
        And I add "Installation Hardware Kit" to cart
        Then I should see 3 items in the cart
        And each item should display correctly in cart
        And the cart total should reflect all items

    @cart @regression @quantity @pinecrest
    Scenario: Update item quantity in cart
        Given I have items in my cart
        When I navigate to the cart page
        And I increase the quantity of the first item to 2
        Then the cart should update automatically
        And the line total should reflect the new quantity
        And the cart total should be recalculated    
        
    @cart @regression @quantity @pinecrest
    Scenario: Cart allows high quantity values
        Given I have items in my cart
        When I navigate to the cart page
        And I try to set quantity to a high number like 999
        Then the system should accept the high quantity
        And the cart total should be recalculated accordingly

    @cart @regression @remove @pinecrest
    Scenario: Remove item from cart
        Given I have multiple items in my cart
        When I navigate to the cart page
        And I remove the first item from cart
        Then the item should be removed from cart
        And the cart total should be recalculated
        And the remaining items should still be displayed

    @cart @regression @navigation @pinecrest
    Scenario: Continue shopping from cart
        Given I have items in my cart
        When I navigate to the cart page
        And I click "Continue shopping" or "Return to shop" button
        Then I should be redirected to the products page from cart
        And my cart items should be preserved

    @cart @smoke @checkout @pinecrest
    Scenario: Proceed to checkout from cart
        Given I have items in my cart
        When I navigate to the cart page
        And I click "Proceed to checkout" button
        Then I should be redirected to the checkout page
        And I should see the order review section
        And I should see billing information form

    @cart @regression @checkout @pinecrest
    Scenario: Fill checkout billing information
        Given I have items in my cart
        When I proceed to checkout
        And I fill in the billing information:
            | Field          | Value                    |
            | First Name     | John                     |
            | Last Name      | Doe                      |
            | Email          | john.doe@example.com     |
            | Phone          | (555) 123-4567          |
            | Address        | 123 Main Street          |
            | City           | Anytown                  |
            | State          | California               |
            | ZIP Code       | 90210                    |
        Then the billing form should accept all valid information
        And I should be able to proceed to payment options

    @cart @regression @checkout @validation @pinecrest
    Scenario: Validate required checkout fields
        Given I have items in my cart
        When I proceed to checkout
        And I attempt to submit without filling required fields
        Then I should see validation errors for required fields
        And I should not be able to proceed until all required fields are filled

    @cart @regression @checkout @review @pinecrest
    Scenario: Checkout order review and totals
        Given I have items in my cart
        When I proceed to checkout
        Then I should see order review section
        And I should see all cart items listed
        And I should see subtotal, tax, and total amounts
        And the totals should match my cart contents    
        
    @cart @regression @coupons @pinecrest
    Scenario: Apply coupon code
        Given I have items in my cart
        When I navigate to the cart page
        And I enter a valid coupon code "pinecrest10"
        And I apply the coupon
        Then the discount should be applied to cart total
        And I should see the coupon discount line item
        And the total should reflect the discount

    @cart @regression @coupons @pinecrest
    Scenario: Apply invalid coupon code
        Given I have items in my cart
        When I navigate to the cart page
        And I enter an invalid coupon code "INVALID123"
        And I apply the coupon
        Then I should see an error message about invalid coupon
        And the cart total should remain unchanged

    @cart @regression @coupons @pinecrest
    Scenario: Remove applied coupon
        Given I have items in my cart with an applied coupon
        When I navigate to the cart page
        And I remove the applied coupon
        Then the discount should be removed
        And the cart total should return to original amount

    @cart @regression @performance @pinecrest
    Scenario: Cart loads quickly with multiple items
        Given I have multiple items in my cart
        When I navigate to the cart page
        Then the cart page should load within acceptable time
        And all cart items should be displayed properly
        And cart calculations should be accurate

    @cart @regression @stock @pinecrest
    Scenario: Cart item stock validation
        Given I have items in my cart
        When I navigate to the cart page
        Then each item should show current stock availability
        And I should be warned if any items are out of stock
        And out of stock items should be handled appropriately

    @cart @regression @payment @pinecrest
    Scenario: Test different payment methods
        Given I have items in my cart
        When I proceed to checkout
        And I fill in all required billing information
        Then I should see available payment options
        And I should be able to select different payment methods
        And each payment method should be functional
