//<reference types= "cypress" />
// the reference above helps vscode find our cypress methods

///////////// SECTION 3, CLASS 9 TEST STRUCTURES
describe(" SECTION 3, CLASS 9 TEST STRUCTURES", () => {
  beforeEach("code that is run before every test within this section", () => {
    // use these for repeativite code, such as login steps
  });

  // you can have as many tests as you'd like
  it("first test", () => {});
  it("second test", () => {});
  it("third test", () => {});
});

// you can also have as many describes as you'd like in a file
describe("SECTION 3, CLASS 9 TEST STRUCTURES", () => {
  // you can also put a describe inside a describe
  // each of these becomes a collapsible section
  describe("Our test suite section", () => {
    it("some test name", () => {});
  });

  it("first test", () => {});
  it("second test", () => {});
  it("third test", () => {});
});

/////////////// SECTION 3, CLASS 10 TYPES OF LOCATORS

describe("SECTION 3, CLASS 10 TYPES OF LOCATORS", () => {
  it("first test", () => {
    cy.visit("/"); // Goes to the baseURls root
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //give locator name
    cy.get("input"); // by tag name
    cy.get("#inputEmail1"); // by ID
    cy.get(".input-full-width"); // by class
    cy.get("[placeholder]"); // by attribute name
    cy.get('[placeholder="Email"]'); // by attribute name and value
    cy.get('[class= "input-full-width size-medium shape-rectangle"]'); //by class value
    cy.get('input[placeholder="Email"]'); // Tag name and Attribute with value
    cy.get('[placeholder="Email"][fullWidth]'); // by two different attributes
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width'); // by tag name, Attribute with value, ID and Class name

    // recommended way by cypress, add your own attributes within the HTML code.
    cy.get('[data-cy="imputEmail1"]');
  });
});

///////////// SECTION 3, CLASS 11 FINDING WED ELEMENTS
describe("SECTION 3, CLASS 11 FINDING WEB ELEMENTS", () => {
  it("first test", () => {
    cy.visit("/"); // Goes to the baseURls root
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    /* 
    Travel through the Dom to find elements. You must start with cy.get
    You cannot do something like cy.find(button) right away.    
    You will get an error saying that you are trying to call a child command before calling a parent command
    */

    // finds the checkbox and selects the 'remember me' option
    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in"); // uses a unique identifyier to look for the second signin button on the page
    cy.get("#inputEmail3")
      .parents("form") // is used to locate the parent element from the current key element that you are in
      .find("button") // is ONLY used to find a child element inside a partent element
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });
});

///////////// SECTION 3, CLASS 11 FINDING WED ELEMENTS
describe("SECTION 3, CLASS 12 SACING SUBJECT OF THE COMMAND", () => {
  it.("Then and wrap methods", () => {
    // Use cy.only in order to run only a single test in a cypress test

    cy.visit("/"); // Goes to the baseURls root
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    /* 
    Looks for the element nb-card, and specifices which card by looking for the test "using the Grid".
    The result is then saved in FirstForm which is used as a parameter for the next function
    Can be be written longer like this instead:
    cy.contains("nb-card", "Using the Grid").then(function someName(firstForm) {...}
    */
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      //calls the firstForm function and saves the text/result in the variable emailLabelFirst
      const emailLableFirst = firstForm.find('[for="inputEmail1"]').text();
      // compare the result saved in emailLableFirst to what we expect 'Email'
      expect(emailLableFirst).to.equal("Email");

      //calls the firstForm function and saves the text/result in the variable passwordLabeleFirst
      const passwordLabeleFirst = firstForm
        .find('[for="inputPassword2"]')
        .text(); //the returned result is in jquery format which allows us to save the result in a variable
      expect(passwordLabeleFirst).to.equal("Password");

      // compares the password field labels in both forms to make sure they are the same
      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabeleFirst).to.equal(passwordLabelSecond);

        //wrap() converts the jquery that is returned into cypress format so we can use should() for assersoion
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it.only('invoke command',()=>{
        cy.visit("/"); // Goes to the baseURls root
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        
  })
});
