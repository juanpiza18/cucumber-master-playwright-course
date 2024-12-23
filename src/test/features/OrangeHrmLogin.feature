Feature: Orance HRML Login Functionality

  Scenario Outline: Login with valid and invalid creedentials
    Given I am on the orange hrm login page
    When I login with username as "<username>" and password as "<password>"
    And I click on the login button
    Then I route to the orange HRM home page

    Examples: 
      | username | password |
      | Admin    | admin123 |
      | Admin123 | admin123 |
