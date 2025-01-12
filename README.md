# WSC Web Tech Portal
_DevOps Essentials (DVOPS) & Full Stack Web Development (FWEB)_

## Overview
This project contains a deliverable for the CIT2C22 DevOps Essentials and CIT2C20 Full Stack Web Development modules at Temasek Polytechnic.

This project contains a WorldSkills Competition Web Tech Portal application.

## Getting Started
1. Clone the repository to your local machine.
   
   ```sh
   git clone https://github.com/PureStupid/dvops-fweb-wsc-web-tech-portal.git
   ```
   
3. Open the project folder.
   
   ```sh
   cd dvops-fweb-wsc-web-tech-portal
   ```
   
5. Use `composer` and `npm` to install dependencies.

   ```sh
   composer install
   npm install
   ```
   
7. Create a `.env` file following the provided `.env.example` and set your environment variables accordingly.

   ```sh
   touch .env
   ```
   
9. Run the application using the provided scripts.
   For example, to run the project in development mode:

    ```sh
    npm start
    ```


## Testing for Add User Functionality
Code coverage reports can be found under `build/coverage`

### Backend using Pest
1. Run backend test
   ```sh
   php artisan test --coverage --min=90  --filter CreateUserTest
   ```
   
### Cypress E2E
1. Start development server for Laravel and React
   ```sh
   npm run serve
   ```

2. Run Cypress Test. For example, to get code coverage:
   ```sh
   npm run cy:coverage
   ```

### Jest and React-testing-library
1. Run test
   ```sh
   npm run test:unit-coverage
   ```
