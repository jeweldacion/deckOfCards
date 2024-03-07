const { defineConfig } = require('cypress');

module.exports = defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: true,
    e2e: {
        baseUrl: 'https://www.deckofcardsapi.com',
    },
});
