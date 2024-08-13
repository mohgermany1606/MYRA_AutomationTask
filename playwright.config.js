// playwright.config.js
module.exports = {
    testDir: './tests',
    use: {
        headless: false, // Set to true if you want to run tests in headless mode
        baseURL: 'https://automationintesting.online/#/admin',
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [['html', { open: 'never' }]], // Generates HTML report
};