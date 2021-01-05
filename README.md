## notes

When registering a new user via the “login / password” form, the default avatar is set and the name is not specified. Using the “set avatar” and “what is your name?” buttons, you can specify immediately or change later these values, and they will instantly be displayed on the screen. The link for the avatar should lead directly to the picture (https://example.com/photos/image.jpg). All user data is recorded in the Firebase Realtime Database.

## Application structure:

App.js - home page </br>
Header.js - application header</br>
Dropdown.js - icon with a dropdown menu in the header</br>
LoginForm.js and Login.js - login form</br>
Signup.js - registration form</br>
Articles.js - module for displaying articles</br>
ArticleModal - window for displaying a detailed description of the article</br>
Profile.js - user profile</br>
Modal.js - login window when user ir not signed in</br>

## libraries:

- Firebase for authorization and storage of credentials
- Axios to retrieve API data
- react-modal to display modal windows
- react-router-dom for navigation
- history for redirecting
- react-meta-tags for specifying the "viewport" meta tags on the main page
