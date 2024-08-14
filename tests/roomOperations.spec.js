const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { RoomPage } = require('../pageObjects/RoomPage');
const roomData = require('../fixtures/roomData');

test.describe('Room Operations', () => {
    let loginPage, roomPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        roomPage = new RoomPage(page);
        await page.goto('https://automationintesting.online/#/admin');
        await loginPage.login(roomData.loginData.username, roomData.loginData.password);
    });

    test('Create Room - Positive and Negative Flow', async ({ page }) => {
        console.log('Executing positive create test case as below ---');
        
        // 1. Positive Test: Create Room with valid details
        await roomPage.createRoom(roomData.validRoom);
        console.log(`Room with number "${roomData.validRoom.roomNumber}" is created successfully`);
        
        // Verify newly created room appears in the list of available rooms
        await roomPage.verifyRoomInList(roomData.validRoom);

        console.log('Executing negative create test case as below ---');
        
        // 2. Negative Test: Create Room with invalid details
        await roomPage.createRoom(roomData.invalidRoom);
        
        // Verify negative case using error locator for error message
        const errorLocator = page.locator('div.alert.alert-danger');
        
        // Wait for the error locator to be visible
        try {
            await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Create Room - Negative Test Passed: Error locator is present.');
        } catch (error) {
            console.log('Error locator is not present.');
            throw new Error('Negative Test Failed: Error locator is not present for invalid input.');
        }
    });

    test('Update Room - Positive and Negative Flow', async ({ page }) => {
        // Click on the added room row to edit
        await roomPage.clickOnRoomRow(roomData.updatedRoom.roomNumber);

        // Verify the clicked room details using room number
        await roomPage.verifyRoomLabel(roomData.updatedRoom.roomNumber);
        console.log('Executing positive update test case as below ---');
        
        // 1. Positive Test: Verify administrator is able to edit details of the newly added room
        await roomPage.updateRoom(roomData.updatedRoom);
        console.log('Clicked the update button.');
        console.log('Room details updated successfully.');

        // Verify room label after updating the room details
        await roomPage.verifyRoomLabel(roomData.updatedRoom.roomNumber);

        console.log('Executing negative update test case as below ---');
        
        // 2. Negative Test: Verify error is displayed on updating details with invalid data
        await roomPage.updateRoom(roomData.invalidRoom);
        
        // Verify negative case using error locator for error message on the update screen
        const errorLocator = page.locator('div.alert.alert-danger');
        
        // Wait for the error message to be visible
        try {
            await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Update Room - Negative Test Passed: Error locator is present.');
        } catch (error) {
            console.log('Error locator is not present.');
            throw new Error('Negative Test Failed: Error locator is not present for invalid input.');
        }
    });

    test('Delete Room and Verify It Is Not Present in List', async ({ page }) => {
        console.log('Executing delete test case as below ---');
        
        // Verify administrator is able to delete the added room
        await roomPage.deleteRoom(roomData.validRoom.roomNumber);

        // Verify the room is no longer present in the list
        await roomPage.verifyRoomNotInList(roomData.validRoom.roomNumber);
    });

    test('View Room List', async ({ page }) => {
        // 1. Verify administrator is able to view room list
        const roomPage = new RoomPage(page);

        // Navigate to the room listing page
        await roomPage.navigateToRoomMenu();

        // Call the viewRoomList method
        await roomPage.viewRoomList();
    });
});
