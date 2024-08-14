# Room Operations Test Automation

## Overview

This repository contains automated tests for room operations on the [Automation in Testing](https://automationintesting.online/) platform using Playwright. The tests include creating, updating, deleting, and viewing rooms, as well as verifying that the room list is displayed accurately.

## Project Structure

- **tests/roomOperations.spec.js**: Contains test cases for room operations, including creating, updating, deleting, and viewing rooms.
- **pageObjects/RoomPage.js**: Page Object for room-related actions, encapsulating operations like creating, updating, deleting, and verifying rooms.
- **pageObjects/LoginPage.js**: Page Object for the login page, handling login operations.
- **fixtures/roomData.js**: Contains test data, including valid and invalid room details used in the tests.
- **playwright.config.js**: Configuration file for Playwright, setting up test directories, browser options, and report generation.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

- **Install playwright using command** 
    ```bash
    npm init playwright@latest

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mohgermany1606/MYRA_AutomationTask.git
    
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure Playwright:**
   The Playwright configuration is set in `playwright.config.js`, which includes options for browser settings, headless mode, and report generation.

## Running Tests

To execute the tests, use the following commands:

### Run All Tests
npx playwright test

### To see the report 
npx playwright show-report


Test Cases

1. Create Room - Positive and Negative Flow
Positive Flow: Verifies that a room can be created with valid details.
Negative Flow: Verifies that creating a room with invalid details results in an error.
2. Update Room - Positive and Negative Flow
Positive Flow: Verifies that an existing room can be updated with valid details.
Negative Flow: Verifies that updating a room with invalid details results in an error.
3. Delete Room :
Verifies that a room can be deleted and ensures the room no longer appears in the list of available rooms.
4. View Room List :
Verifies that the room list is displayed accurately and all room details are consistent.

Page Objects

1. RoomPage: Handles all interactions related to room operations (create, update, delete, view).
2. LoginPage: Manages login actions for the admin user.

Test Data

The test data is managed in the fixtures/roomData.js file, which includes:

1. loginData: Username and password for the admin user.
2. validRoom: Data for creating a room successfully.
3. invalidRoom: Data for creating a room with errors.
4. updatedRoom: Data for updating an existing room.

Configuration

playwright.config.js: The configuration file controls browser settings, base URL, and test reporting.

## Bug Report
- **Bug Report/Bug Report_Hotel Booking.pdf**: Contains 4 different issues which were found during exploratory testing

