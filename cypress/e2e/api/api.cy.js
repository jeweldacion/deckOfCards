describe('Deck of Cards API', () => {
    let deckId, player1Cards, player2Cards;

    it('Navigate to Deck of cards URL', () => {
        cy.visit('/');
    });

    it('Should be up and running', () => {
        cy.request('GET', '/').then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    it('Should get a new deck', () => {
        cy.request('GET', '/api/deck/new/').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
            deckId = response.body.deck_id;
        });
    });

    it('Should shuffle the deck', () => {
        cy.request('GET', `/api/deck/${deckId}/shuffle/?deck_count=1`).then(
            (response) => {
                expect(response.status).to.equal(200);
                expect(response.body.shuffled).to.equal(true);
            }
        );

        it('Deal three cards to each of two players and check for blackjack', () => {
            cy.request(`GET`, `/api/deck/${deckId}/draw/?count=6`).then(
                (response) => {
                    player1Cards = response.body.cards.slice(0, 3);
                    player2Cards = response.body.cards.slice(3, 6);

                    checkForBlackjack('Player 1', player1Cards);
                    checkForBlackjack('Player 2', player2Cards);
                }
            );
        });

        // Custom Cypress command to check for blackjack
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
                            ['10', 'JACK', 'QUEEN', 'KING'].includes(
                                firstCardValue
                            ))
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
    });
});
