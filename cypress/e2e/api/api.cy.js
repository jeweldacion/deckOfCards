describe('Deck of Cards API', () => {
    let deckId;
    it('Navigate to Deck of cards URL', () => {
        cy.visit('/');
    });
    //Application is up and running
    it('Should be up', async () => {
        const response = await cy.request('GET', '/');
        expect(response.status).to.equal(200);
    });
    //Get a new deck of cards

    it('Should get a new deck', async () => {
        const response = await cy.request('GET', '/api/deck/new/');
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        deckId = response.body.deck_id;
    });
    //Shuffling the new deck of cards
    it('Should shuffle the deck', async () => {
        const response = await cy.request(
            'GET',
            `/api/deck/${deckId}/shuffle/?deck_count=1`
        );
        expect(response.status).to.equal(200);
        expect(response.body.shuffled).to.equal(true);
    });
    //Deal 3 cards for each player
    // let player1Cards, player2Cards;
    // it('Should deal three cards to each of two players', async () => {
    //     const response = await cy.request(
    //         'GET',
    //         `/api/deck/${deckId}/draw/?count=6`
    //     );

    //     player1Cards = response.body.cards.slice(0, 3);
    //     player2Cards = response.body.cards.slice(3, 6);
    // });

    // const hasBlackJack = (cards) => {};

    // it('should check whether either player has blackjack', async () => {});
});
