// Import necessary functions at the top of your test file
const { test, expect } = require('@playwright/test');
const { validRoom } = require('../fixtures/roomData');
//const { validRoom } = require('../fixtures/roomData');

class RoomPage {
    constructor(page) {
        this.page = page;
        this.roomNumberInput = page.locator('#roomName');
        this.roomTypeInput = 'select[id="type"]';
        this.accessibleCheckbox = 'select[id="accessible"]';
        this.priceInput = page.locator('#roomPrice');
        this.descriptionInput = page.locator('#description');
        this.createButton = page.locator('button#createRoom');
        this.roomLabel = page.locator('h2:has-text("Room: ")');
        this.editRoomButton = page.locator('button:has-text("Edit")');
        this.updateRoomButton = page.locator('button#update.btn.btn-outline-primary');
        this.roomMenu = page.locator('a.nav-link:has-text("Rooms")');
        this.roomListingContainer = page.locator('[data-testid="roomlisting"]');
        this.deleteRoomButton = page.locator('button.delete-room');
    }

    async createRoom(validRoom) {
       
       console.log(validRoom);
        await this.roomNumberInput.fill(validRoom.roomNumber.toString());
        await this.page.selectOption(this.roomTypeInput, { label: validRoom.type });
        await this.page.selectOption(this.accessibleCheckbox,  { label: validRoom.accessible });
        await this.priceInput.fill(validRoom.price.toString());
        //const enteredNUMNER = await this.roomNumberInput.inputValue();
        for (const feature of validRoom.features) {
            await this.page.locator(`input[value="${feature}"]`).check();
        }
        await this.createButton.click();
    }

    async verifyRoomInList(roomData) {
        await this.page.waitForSelector('[data-testid="roomlisting"]');

        // Get all room elements that match the room name
        const rooms = await this.page.locator(`[data-testid="roomlisting"]`).filter({ hasText: roomData.name }).elementHandles();

        // Ensure at least one room matches the criteria
        if (rooms.length === 0) {
            throw new Error(`Room with number "${validRoom.roomNumber}" not found in the list!`);
        }
        console.log(`Room with number "${validRoom.roomNumber}" is present in the list.`);
    }


    async clickOnRoomRow(roomNumber) {
        const roomRow = this.page.locator(`#roomName${roomNumber}`);
        await roomRow.click();
    }


    async verifyRoomLabel(roomNumber) {
        const roomLabelText = `Room: ${roomNumber}`;
        await expect(this.roomLabel).toContainText(roomLabelText);
    }


    async clickEditButton() {
        await this.editRoomButton.click();

        // Ensure the page is fully loaded and ready
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }


    async updateRoom(updatedRoom) {

        //This method is to update following fields : price, accessible, type and features
        // Wait for the "Edit" button to be fully visible before interaction
        await this.editRoomButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Edit button is visible.');

        // Click the "Edit" button
        await this.clickEditButton();
        

        for (const feature of updatedRoom.features) {
            await this.page.locator(`input[value="${feature}"]`).check();
        }

        // Wait for the price input field to be visible and enabled
        await this.priceInput.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Price input is visible.');

        // Check if the price input field is enabled
        const isPriceInputEnabled = await this.priceInput.isEnabled();
        if (!isPriceInputEnabled) {
            throw new Error('Price input is not enabled.');
        }
        console.log('Price input is enabled.');

        // Now fill in the price
        await this.priceInput.fill(updatedRoom.price.toString());
        console.log(`Price ${updatedRoom.price} filled successfully.`);
    
        // Fill the price input
        await this.priceInput.fill(updatedRoom.price.toString());
        console.log('Filled price input with:', updatedRoom.price);
        
        // Wait for the update button to be visible and enabled
        await this.updateRoomButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Update button is visible.');
    
        // Check if the update button is enabled
        const isUpdateBtnEnabled = await this.priceInput.isEnabled();
        if (!isUpdateBtnEnabled) {
        throw new Error('Update button is not enabled.');
        }
        console.log('Update Button is enabled')
    
    
        // Scroll to and click the update button
        await this.updateRoomButton.scrollIntoViewIfNeeded();
        console.log('Scrolled to the update button.');
    
        await this.updateRoomButton.click();
        }

        async navigateToRoomMenu() {
        // Click on the "Rooms" menu
        await this.roomMenu.click();
        
        // Wait for the room listing container to be visible
        //await this.roomListingContainer.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Room listing container is visible.');
        }

    
    async deleteRoom(roomNumber) {

         // Click on Room menu 
         await this.navigateToRoomMenu();
          /// Locate the specific row for the room by its number
        
        const roomRow = this.page.locator(`#roomName${roomNumber}`).locator('xpath=ancestor::div[contains(@class, "detail")]');
        
        // Ensure the room row is visible before trying to click delete
        await roomRow.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`Room row for Room #${roomNumber} is visible.`);

        // Scroll into view if necessary
        await roomRow.scrollIntoViewIfNeeded();

        // Locate and click on the delete icon within the room row
        const deleteIcon = roomRow.locator('.roomDelete');
        await deleteIcon.click();
        console.log(`Clicked delete icon for Room #${roomNumber}.`);
        }


        async verifyRoomNotInList(roomNumber) {
            // Refresh the room list to ensure the UI is updated
            await this.navigateToRoomMenu();
    
            // Retry mechanism to handle any delays in UI updates
            for (let attempt = 0; attempt < 5; attempt++) {
                const rooms = await this.page.locator(`[data-testid="roomlisting"]`).filter({ hasText: roomNumber }).elementHandles();
                if (rooms.length === 0) {
                    console.log(`Room with number "${roomNumber}" is no longer present in the list.`);
                    return;
                }
                await this.page.waitForTimeout(1000); // Wait before retrying
            }
    
            // If still present after retries, throw an error
            throw new Error(`Room with number "${roomNumber}" is still present in the list!`);
        }

        
    async viewRoomList() {
        //return this.roomListingContainer.locator(`text="${roomNumber}"`).isVisible();
        // Get all room details from the room listing container
        // Get all room details from the room listing container
        
        const rooms = await this.page.locator('[data-testid="roomlisting"]').all();
        let totalRooms = 0;
        // Iterate through each room and print details (or perform assertions)
        for (const room of rooms) {
            const roomNumber = await room.locator('div.col-sm-1 > p[id^="roomName"]').innerText();
            const roomType = await room.locator('div.col-sm-2 > p[id^="type"]').innerText();
            const accessible = await room.locator('div.col-sm-2 > p[id^="accessible"]').innerText();
            const price = await room.locator('div.col-sm-1 > p[id^="roomPrice"]').innerText();
            const details = await room.locator('div.col-sm-5 > p[id^="details"]').innerText();

            // Print room details
            console.log(`Room Number: ${roomNumber}, Type: ${roomType}, Accessible: ${accessible}, Price: ${price}, Details: ${details}`);
            
            // Perform assertions (optional)
            expect(roomNumber).not.toBeNull();
            expect(roomType).toMatch(/single|Double|Twin|Family|Suite/);
            expect(accessible).toMatch(/true|false/);
            expect(price).toMatch(/^\d+$/); // Assuming price is a number
            expect(details).not.toBeNull();
            totalRooms++;
        }

        console.log(`Total rooms found: "${totalRooms}"`);
        expect(totalRooms).toBeGreaterThan(0); // Ensure there is at least one room
    }
}
module.exports = { RoomPage };