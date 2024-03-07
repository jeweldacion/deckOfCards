// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('checkForBlackjack', (player, cards) => {
    const hasBlackJack = (cards) => {
        if (cards.length === 2) {
            const firstCardValue = cards[0].value;
            const secondCardValue = cards[1].value;

            return (
                (firstCardValue === 'ACE' &&
                    ['10', 'JACK', 'QUEEN', 'KING'].includes(
                        secondCardValue
                    )) ||
                (secondCardValue === 'ACE' &&
                    ['10', 'JACK', 'QUEEN', 'KING'].includes(firstCardValue))
            );
        }

        return false;
    };
    cy.then(() => {
        if (hasBlackJack(cards)) {
            cy.log(`${player} has blackjack!`);
        }
    });
});
