# Personal Finance Manager SaaS

## Application Funcitonality Description

Prsnlmgr (short from Personal Manager) is a Software as a Service application that helps users manage their monthly expenses and provides helpful insights through dynamic charts.

Once user has created account within the system, he can create entries (expenses) in the "Create an entry" tab. Name, amount, date, category and additional information can be entered.

Once the claim has been submitted, it is stored in the database and can be viewed in the "View entries" tab. User can change the amount of entries displayed per page with the help of a dropdow as well as sort them based on amount or date in both ascending and descending orders. By clicking the pencil icon on each individual entry, user can edit any information for the selected record. By clicking on the red button with a trash icon, user can permanently delete the record.

Once "Analytics" tab is selected, dynamic charts can be viewed for different data points.

Finally, by clicking on the user icon in the top right corner, user can either log out of the application, or go to a "Profile" page. There, he can either update the name that is associated with this account, update password, verify email (if not yet verified) by clicking the "Verify" button. And, at the end there is a button that allows to permanently delete user's account.

## Application Technologies Overview

This application is built with React TypeScript and [Redux.js](https://redux.js.org/) as a state management library. [Yup](https://www.npmjs.com/package/yup) is leveraged for custom and complex validation of the forms. Application implements authentication with [Firebase Authentication](https://firebase.google.com/docs/auth). [Firebase Realtime Database](https://firebase.google.com/docs/database) is a database where all the data is stored. [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) is a tool used for writing End-to-End tests. In order to display charts in the Analytics, [react-chartjs-2](https://react-chartjs-2.js.org/) library is leveraged.

## Available Scripts

`npm start` - starts the application in the localhost

`npm test` - starts cypress in the headless mode (needs an active running application in order to succeed)
