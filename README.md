# ReactProjectALK
ReactProjectALK is a web application that allows the user to register a new account, to have access to authorized content through a login process and also to manage other users' accounts.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/PawelTyd/ReactProjectALK.git
```
2. Navigate to the project directory:
```bash
cd ReactProjectALK
```
3. Install dependencies using npm command:
```bash
npm install
```
4. Start the project using npm command:
```bash
npm run dev
```

## Pages descriptions and Happy Path

The project consists of 7 pages:

- HomePage: The very first page of the project. It's the starting point for every new user. To proceed the user should click the button "Let's start"
- LoginPage: The second page that gives access to the dashboard only to authorized users. Relevant message is displayed after wrong login attempt. From this page the user has access to other optional pages like RegisterPage and ResetPasswrodPage
- ResetPasswordPage: Optional page which purpose is resetting password and mocking of sending emails with reset links. If the provided email is the same as during registration, the relevant message will appear (error or success).
- RegisterPage: The page that allows user to create new account/to register. If the registration process is correct, the animation will appear.
- RegisterAnimation: It's an animation, which is displayed only if the registration process is correct. The animation only lasts for 3,5s and after that the user will be redirected to LoginPage
- DashboardPage: The next page, that is only available for logged-in users. It allows the user to pick the module: User Management and Jobs Directory. More about JobsDirectoryPage in the last paragraph (Additional Comments)
- UsersManagementPage: The last page, that displays user details in a tabulated format. This screen is essential for admin users to manage account details efficiently

Happy Path:
1) HomePage:
The user lands on the HomePage.
The user clicks the "Let's start" button to proceed.

2) LoginPage:
The user is redirected to the LoginPage.
The user enters correct login credentials.
The user successfully logs in and gains access to the dashboard.

3) RegisterPage (if the user is not registered):
The user navigates to the RegisterPage.
The user fills out the registration form with valid details.
Upon successful registration, the RegisterAnimation is displayed.
After 3.5 seconds, the user is redirected to the LoginPage.

4) LoginPage (after registration):
The user enters the newly created credentials.
The user successfully logs in and gains access to the dashboard.

5) UsersManagementPage:
The user selects the "User Management" module.
The user is redirected to the UsersManagementPage.
The user views and manages user details in a tabulated format.

## Features and Functions

a) Form state management
- Related features/pages: React-Hook-Form, LoginPage, ResetPasswordPage, RegisterPage

b) Validating user input to ensure all necessary fields (email, password, confirmPassword) are filled during registration/login process. The length of characters, the format of the email, the compatibility of passwords have been checked
- Related features/pages: Yup library, LoginPage, ResetPasswordPage, RegisterPage

c) Additional filtering by user first and second name, email address, ID
- Related features/pages: UsersManagementPage, Zustand store and slices

d) Additional sorting (ID, first and second name, email address)
- Related features/pages: UsersManagementPage, Zustand store and slices

e) Fetching data and displaying it in tabular form
- Related features/pages: custom hook useApi, UsersManagementPage

## Technologies
- React: dynamic functionality and interaction
- MUI: provides a simple, customizable, and accessible library of React components
- React-Router-Dom: routing library for the React
- Zustand: state management library for the React
- Yup: validation library for the React
- React-Hook-Form: performant, flexible and extensible forms with easy-to-use validation
- Vite: frontend tool for building web applications
- LottieFiles: provides Lottie animations
- useEffect hook: to perform side effects in your components
- useState hook: to track state in a function component



## Additional comments
- Jobs directory button is functionless. JobsDirectoryPage is an optional feature to include in future development of this project.
- MUI bundle size was reduced by using tree-shaking technique and by using babel-plugin-import (the .babelrc.js file was created, configured and used in the project)
- Thanks to using slices instead of one store consisted of all states, the modularity and readability were achieved
