Feature: Ecommerce Error validation
  @Validation
  Scenario Outline: Checking the Errors
    Given a login Ecommerce error validation application with "<username>" and "<password>"
    Then verify error message is displayed
    
    Examples:
        | username     |password     |
        | rashulshetty | rahul@1345  |
        | dheeenag     | dhe123@     |