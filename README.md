# Expensy - Expenses Tracking Website

Expensy is a expense tracking web application built using **React**, **TypeScript**, **Firebase**, and **Shadcn UI** components. It allows users to easily track their incomes and expenses, view their total balance, and manage transactions with a clean and intuitive interface.

## Features

- **Expense and Income Tracking**:
  - View total expenses, total income, and overall balance on the home page.
  - Add new transactions (income or expense) with title and amount.
- **Authentication**:

  - Email/Password and Google authentication powered by Firebase.
  - Protected routes to ensure that each user can only visit the routes he is meant to.

- **Transactions Page**:

  - View a complete list of all your incomes and expenses.

- **Add Transaction Page**:
  - Easily add a transaction with a title, amount, and type (income/expense).

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **TypeScript**: Strict typing for JavaScript, improving code quality and error detection.
- **Firebase**: Backend for authentication and data storage.
- **Shadcn UI**: Customizable and modular UI components for a modern user experience.

## Run Project

In order to run this project on your device, first download the project and then run following command in the terminal to install all of the necessary dependencies

```
npm install
```

Now create a Firebase project and replace the following env variables with your own.

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDEER_ID
VITE_FIREBASE_APP_ID
```

Now run below command to run the project on your device.

```
npm run dev
```
