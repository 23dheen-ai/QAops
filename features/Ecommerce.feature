Feature: Ecommerce validation
  @Regression
  Scenario: Placing the order
    Given a login Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When add "car" to cart
    Then verify "car" is displayed in the cart 
    When enter valid details and place the order
    Then verify order is present in the orderHistoryPage