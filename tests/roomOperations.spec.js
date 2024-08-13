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
        // 1.Positive Test: Create Room with valid details

        //Verify administrator is able to add new room
        await roomPage.createRoom(roomData.validRoom);
        onsole.log(`Room with number "${validRoom.roomNumber}" is created successfully`);
        //Verify newly created room appears in list of available rooms 
        await roomPage.verifyRoomInList(roomData.validRoom);

        // 2.Negative Test: Create Room with invalid details
        await roomPage.createRoom(roomData.invalidRoom);
        // Validating negative case using error locator for error message
        const errorLocator = page.locator('div.alert.alert-danger');
        // Wait for the error message to be visible
    try {
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Create Room - Negative Test Passed: Error locator is present.');
    } catch (error) {
        console.log('Error locator is not present.'); // Add logging for debugging
        throw new Error('Negative Test Failed: Error locator is not present for invalid input.');
    
}
    });
    
     
   test('Update Room - Positive and Negative Flow', async ({ page }) => {

        //Click on added room row to edit
           await roomPage.clickOnRoomRow(roomData.updatedRoom.roomNumber);

         //Verify the clicked room details using room number 
           await roomPage.verifyRoomLabel(roomData.updatedRoom.roomNumber);

         //1.Positive Test - Verify administrator is able to edit details of newly added room
           await roomPage.updateRoom(roomData.updatedRoom);
           console.log('Clicked the update button.');
           console.log('Room details updated successfully.');

         //Verify administrator is able to verify room label bafter updating the room details
          await roomPage.verifyRoomLabel(roomData.updatedRoom.roomNumber);


           // 2.Negative Test: Verify error is displayed on updating details with invalid data
        await roomPage.updateRoom(roomData.invalidRoom);
        // Validating negative case using error locator for error message on update scree 
        const errorLocator = page.locator('div.alert.alert-danger');
    // Wait for the error message to be visible
         try {
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Update Room - Negative Test Passed: Error locator is present.');
    } catch (error) {
        console.log('Error locator is not present.'); // Add logging for debugging
        throw new Error('Negative Test Failed: Error locator is not present for invalid input.');
    
}
    
 });

 test('Delete Room ', async ({ page }) => {
    //Click on Room Menu

    ///Verify administrator is able to verify room label before clicking on it to delete
    //await roomPage.verifyRoomLabel(roomData.validRoom.roomNumber);

    //Verify administrator is able to delete the added room 
    await roomPage.deleteRoom(roomData.validRoom.roomNumber);

    // Verify the room is no longer present in the list
    await roomPage.verifyRoomNotInList(roomData.validRoom.roomNumber);

    //Verify administraor is able to verify list of rooms displayed 
    await roomPage.viewRoomList();

});

test('Verify Room List is Displayed Accurately', async ({ page }) => {
    //Verify administraor is able to verify list of rooms displayed 
    //await roomPage.viewRoomList();
});

});