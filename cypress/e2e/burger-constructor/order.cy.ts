describe('Burger order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('[data-cy="burger-ingredients"]').should('be.visible');
  });

  context('Unauthenticated user', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        fixture: 'no-user.json',
        statusCode: 401
      }).as('getUser');
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it('should redirect to login page after order button click', () => {
      cy.get('[data-cy="burger-constructor"]')
        .contains('button', 'Оформить заказ')
        .click();

      cy.location('pathname').should('equal', '/login');
    });
  });

  context('Authenticated user', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'fake-access-token');
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'fake-refresh-token');
      });

      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');
      cy.wait('@getIngredients');
    });

    it('should create order after order button click', () => {
      const bunItem = cy.contains('Флюоресцентная булка R2-D3').parent('li');
      const addBunButton = bunItem.find('button').contains('Добавить');

      const ingredientItem1 = cy
        .contains('Филе Люминесцентного тетраодонтимформа')
        .parent('li');
      const addIngredientButton1 = ingredientItem1
        .find('button')
        .contains('Добавить');

      const ingredientItem2 = cy
        .contains('Плоды Фалленианского дерева')
        .parent('li');
      const addIngredientButton2 = ingredientItem2
        .find('button')
        .contains('Добавить');

      addBunButton.click();
      addIngredientButton1.click();
      addIngredientButton2.click();

      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
        fixture: 'orders.json'
      }).as('createOrder');

      cy.get('[data-cy="burger-constructor"]')
        .find('button')
        .contains('Оформить заказ')
        .click();

      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .within(() => {
          cy.get('h2').should('have.text', '73486'); // "73486" - номер заказа
          cy.get('p').contains('идентификатор заказа').should('exist');
        });

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="burger-constructor"]').within(() => {
        cy.get('div:contains("Выберите булки")').should('have.length', 2);
        cy.get('ul > :contains("Выберите начинку")').should('have.length', 1);
      });
    });
  });
});
