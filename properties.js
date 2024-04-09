// ============================================================================================================
// PROPERTY PAGE
// ============================================================================================================

// Import front-end api modules
import {
    auth,
    getAllProperties,
    getOneProperty,
    createOneProperty,
    editOneProperty,
    deleteOneProperty
} from './frontend-api.js';

var properties = []; // Global variables to store properties data from backend

// Function to display name
document.addEventListener('DOMContentLoaded', function () {
    // // Get the <h2> element
    var emailElement = document.getElementById('owner');
    // Handle invalid or missing user role
    let greeting = 'Hi, ' + sessionStorage.getItem('name');
    emailElement.textContent = greeting;
});

// Validate token for current page
const token = window.localStorage.getItem("token")
await auth(token)

// ============================================================================================================

PopulatePropertyTable(); // Populate table during initial load

// Function to add new property
document.querySelector('#addProperty').addEventListener('click', () => {

    // Create a property object
    let address = document.querySelector('#address');
    let neighborhood = document.querySelector('#neighborhood');
    let squareFeet = document.querySelector('#squareFeet');
    let parking = document.querySelector('#parking');
    let publicTransport = document.querySelector('#publicTransport');

    const property = {
        address: address.value,
        neighborhood: neighborhood.value,
        squareFeet: squareFeet.value,
        parking: parking.value,
        publicTransport: publicTransport.value,
        workspace: [],
    };

    function displayMessage(message) {
        // Container of display message
        let containerDiv = document.createElement('div');
        containerDiv.style.position = 'fixed';
        containerDiv.style.top = '15%';
        containerDiv.style.left = '50%';
        containerDiv.style.transform = 'translate(-50%, -50%)';
        containerDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        containerDiv.style.padding = '20px';
        containerDiv.style.borderRadius = '10px';
        containerDiv.style.textAlign = 'center';
        containerDiv.style.color = 'red';

        // Display message in <p> tag
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        containerDiv.appendChild(messageParagraph);

        // Append container div to the document body
        document.body.appendChild(containerDiv);

        // Set timeout to remove message after specified duration
        setTimeout(() => {
            containerDiv.remove();
        }, 2000);
    }
    // Check if all fields are entered
    if (property.address.trim() == "") {
        displayMessage("Address cannot be empty!");
    } else if (property.neighborhood.trim() == "") {
        displayMessage("Neighborhood cannot be empty!");
    } else if (property.squareFeet.trim() == "") {
        displayMessage("Squarefeet cannot be empty!");
    } else if (property.parking.trim() == "") {
        displayMessage("Parking Garage must be set!");
    } else if (property.publicTransport.trim() == "") {
        displayMessage("Public Transportation must be set!");
    } else if (properties.find(item => JSON.stringify(item) === JSON.stringify(property))) {
        displayMessage("Property already exists!"); // Duplicate property
    } else {

        // Clear form fields
        document.querySelectorAll('.addProperty').forEach(field => {
            field.value = "";
        });

        // Add property to properties array
        AddProperty(property);
    }
})

async function AddProperty(property) {
    properties = await createOneProperty(property);
    PopulatePropertyTable();
}

// Function to populate properties table
async function PopulatePropertyTable() {
    let propertyTable = document.querySelector("#propertyTable");

    // Reset table data
    for (var i = propertyTable.rows.length - 1; i > 0; i--) {
        propertyTable.deleteRow(i);
    }

    properties = await getAllProperties();

    // Update property table with updated data
    properties.forEach((data, index) => {
        let newRow = propertyTable.insertRow(index + 1);
        newRow.insertCell(0).innerHTML = "Property " + (index + 1);
        newRow.insertCell(1).innerHTML = data.address;
        newRow.insertCell(2).innerHTML = data.neighborhood;
        newRow.insertCell(3).innerHTML = data.squareFeet;
        newRow.insertCell(4).innerHTML = data.parking;
        newRow.insertCell(5).innerHTML = data.publicTransport;
        newRow.insertCell(6).innerHTML = '<a href="#" class="editPropertyBtn" title=' + index + '>Edit</a>';
        newRow.insertCell(7).innerHTML = '<a href="#" class="deletePropertyBtn" title=' + index + '>Delete</a>';
    })

    // Get newly created Edit/Delete buttons
    var editPropertyBtn = document.querySelectorAll('.editPropertyBtn');
    var deletePropertyBtn = document.querySelectorAll('.deletePropertyBtn');

    // Add events to created Edit Buttons
    for (let btn of editPropertyBtn) {
        btn.addEventListener('click', () => {
            editProperty(btn.title);
        })
    }

    // Add events to created Delete Buttons
    for (let btn of deletePropertyBtn) {
        btn.addEventListener('click', () => {
            deleteProperty(btn.title);
        })
    }
}

// Function to edit a property
function editProperty(index) {
    window.location.href = 'workspaces.html?id=' + properties[index]._id + '&editindex=' + index + '&name=' + name + '&mode=show';
}

// Function to delete a property
async function deleteProperty(index) {
    // Prompt user for confirmation before deleting the property
    const confirmDelete = confirm('Are you sure you want to delete this property?');
    if (confirmDelete) {
        properties = await deleteOneProperty(properties[index]._id);
        await PopulatePropertyTable();
        alert("Property deleted sucessfully!");
    }
}

// Function to limit numeric values as positive
document.querySelectorAll('.number').forEach(field => {
    field.addEventListener('change', () => {
        if (field.value < 0)
            field.value = 0;
    })
});