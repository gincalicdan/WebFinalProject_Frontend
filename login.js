// ============================================================================================================
// LOGIN PAGE
// ===========================================================================================================

// Import front-end api modules
import {
    signup,
    login,
    auth,
    getAllUsers,
} from './frontend-api.js';

document.getElementById('login').addEventListener('click', async function (event) {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Log-in user and wait token
    const token = await login(email, password)

    // Return token is null if credentials are incorrect
    if (token != null) {
    // Authenticate user details
    const loggedInUser = await auth(token)
    console.log(loggedInUser)
        // Redirect based on user role using if and else statements
        if (loggedInUser.role === 'owner') {
            window.location.href = 'properties.html?name='  + loggedInUser.name;
        } else if (loggedInUser.role === 'coworker') {
            window.location.href = 'coworker.html?name='  + loggedInUser.name;
        } else {
            document.getElementById('login-message').innerText = 'Invalid user role';
            document.getElementById('login-message').style.color = 'red';
        }
        sessionStorage.setItem('name', loggedInUser.name);
    
    } else {
        document.getElementById('login-message').innerText = 'Invalid username or password! Please try again.';
        document.getElementById('login-message').style.color = 'red';
    }
});