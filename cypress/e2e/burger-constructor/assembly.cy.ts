describe('Burger constructor', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');

    cy.get('[data-cy="burger-ingredients"]').should('be.visible');
  });

  it('should show bun on both sides after adding', () => {
    const bunItem = cy.contains('Флюоресцентная булка R2-D3').parent('li');
    const addButton = bunItem.find('button').contains('Добавить');

    addButton.click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element_pos_top').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );

      cy.get('.constructor-element_pos_bottom').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );
    });
  });

  it('should show new bun on both sides after changing', () => {
    const bunItem1 = cy.contains('Флюоресцентная булка R2-D3').parent('li');
    const addButton1 = bunItem1.find('button').contains('Добавить');

    addButton1.click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element_pos_top').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );

      cy.get('.constructor-element_pos_bottom').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );
    });

    const bunItem2 = cy.contains('Краторная булка N-200i').parent('li');
    const addButton2 = bunItem2.find('button').contains('Добавить');

    addButton2.click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element_pos_top').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('.constructor-element_pos_bottom').should(
        'contain',
        'Краторная булка N-200i'
      );
    });
  });

  it('should show bun and ingredient after adding', () => {
    const bunItem = cy.contains('Флюоресцентная булка R2-D3').parent('li');
    const addBunButton = bunItem.find('button').contains('Добавить');
    const ingredientItem = cy
      .contains('Биокотлета из марсианской Магнолии')
      .parent('li');
    const addIngredientButton = ingredientItem
      .find('button')
      .contains('Добавить');

    addBunButton.click();
    addIngredientButton.click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element_pos_top').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );

      cy.get('.constructor-element').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );

      cy.get('.constructor-element_pos_bottom').should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );
    });
  });

  it('should show remaining ingredients after removal', () => {
    const ingredientItem1 = cy
      .contains('Биокотлета из марсианской Магнолии')
      .parent('li');
    const addIngredientButton1 = ingredientItem1
      .find('button')
      .contains('Добавить');

    const ingredientItem2 = cy
      .contains('Хрустящие минеральные кольца')
      .parent('li');
    const addIngredientButton2 = ingredientItem2
      .find('button')
      .contains('Добавить');

    addIngredientButton1.click();
    addIngredientButton2.click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );

      cy.get('.constructor-element').should(
        'contain',
        'Хрустящие минеральные кольца'
      );

      cy.get('.constructor-element')
        .contains('Хрустящие минеральные кольца')
        .closest('.constructor-element')
        .find('.constructor-element__action')
        .click();
    });

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('.constructor-element').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );

      cy.get('.constructor-element').should(
        'not.contain',
        'Хрустящие минеральные кольца'
      );
    });
  });
});
