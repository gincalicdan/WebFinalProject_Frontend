// Frontend API to add a new user
async function signup(user) {
    fetch('http://localhost:5500/signup/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
}

// Frontend API to login a user
function login(username, password) {
    return fetch('http://localhost:5500/login', {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((token) => {
            // // save token in localstorage
            window.localStorage.setItem('token', token.accessToken)
            console.log("Store token")
            console.log(token)
            return token.accessToken
        })
        .catch((error) => {
            console.error("Error:", error.message) // Handle error
            return null
        });
}

// Frontend API to validate token
function auth(token) {
    if (token) {
        return fetch('http://localhost:5500/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                window.location.href = "index.html"
            });
    } else {
        window.location.href = "index.html"
    }
}

// Frontend API to get all registered users
async function getAllUsers() {
    return fetch('http://localhost:5500/getusers', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}


// Frontend API to get all properties and corresponding details
async function getAllProperties() {
    return fetch('http://localhost:5500/property', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

// Frontend API to get property details based on id
async function getOneProperty(id) {
    return fetch('http://localhost:5500/property/' + id, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
}

// Frontend API to add new property and return the updated list of properties
async function createOneProperty(data) {
    return fetch('http://localhost:5500/property/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
}

// Frontend API to edit a property
async function editOneProperty(id, data) {
    fetch('http://localhost:5500/property/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
        })
};

// Frontend API to delete a property and return the updated list of properties
async function deleteOneProperty(id) {
    return fetch('http://localhost:5500/property/' + id, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
}

// Export API functions
export {
    signup,
    login,
    auth,
    getAllUsers,
    getAllProperties,
    getOneProperty,
    createOneProperty,
    editOneProperty,
    deleteOneProperty
};