// ============================================================================================================
// CO-OWNER PAGE
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

var properties = await getAllProperties();

var searchWorkspace = []; // Array to store workspace of matched values
PopulateSearchWorkspaceTable();

// Function to search workspace
document.querySelector('#SearchProperty').addEventListener('click', () => {

    searchWorkspace = []; // Reset searchworkspace array

    // Define UI search controls
    let address = document.querySelector('#searchAddress');
    let neighborhood = document.querySelector('#searchNeighborhood');
    let squareFeet = document.querySelector('#searchSquareFeet');
    let parking = document.querySelector('#SearchParking');
    let publicTransport = document.querySelector('#searchPublicTransport');
    let seatingCapacity = document.querySelector('#searchSeating-capacity');
    let smokingPolicy = document.querySelector('#searchSmoking-policy');
    let availabilityDate = document.querySelector('#searchAvailability-date');
    let leaseTerm = document.querySelector('#searchLease-term');
    let price = document.querySelector('#searchPrice');

    properties.forEach(property => {

        // Check if any property matches the search criteria
        if (((property.address.trim().toLowerCase().includes(address.value.trim().toLowerCase()) || address.value.trim().toLowerCase() == "") &&
                (property.neighborhood.trim().toLowerCase().includes(neighborhood.value.trim().toLowerCase()) || neighborhood.value.trim().toLowerCase() == "") &&
                (parseInt(property.squareFeet) <= parseInt(squareFeet.value) || isNaN(parseInt(squareFeet.value))) &&
                (property.parking.trim().toLowerCase().includes(parking.value.trim().toLowerCase()) || parking.value.trim().toLowerCase() == "none") &&
                (property.publicTransport.trim().toLowerCase() == (publicTransport.value.trim().toLowerCase()) || publicTransport.value.trim().toLowerCase() == "none"))
        ) {
    
            // Property search conditions are met. Check if any workspace matches the search criteria
            property.workspace.forEach(workspace => {
                if (((parseInt(workspace.seatingCapacity) <= parseInt(seatingCapacity.value)) || isNaN(parseInt(seatingCapacity.value))) &&
                    (workspace.smokingPolicy.trim().toLowerCase() == (smokingPolicy.value.trim().toLowerCase()) || smokingPolicy.value.trim().toLowerCase() == "none") &&
                    (workspace.availabilityDate.trim().toLowerCase().includes(availabilityDate.value.trim().toLowerCase()) || availabilityDate.value.trim().toLowerCase() == "none") &&
                    (workspace.leaseTerm.trim().toLowerCase().includes(leaseTerm.value.trim().toLowerCase()) || leaseTerm.value.trim().toLowerCase() == "none") &&
                    (parseFloat(workspace.price) <= parseFloat(price.value) || isNaN(parseFloat(price.value)))
                ) {
                    // Workspace search conditions are met
                    // Create an object to hold the search workspace data
                    const searchWorkspaceData = {
                        address: property.address,
                        neighborhood: property.neighborhood,
                        squareFeet: property.squareFeet,
                        parking: property.parking,
                        publicTransport: property.publicTransport,
                        seatingCapacity: workspace.seatingCapacity,
                        smokingPolicy: workspace.smokingPolicy,
                        availabilityDate: workspace.availabilityDate,
                        leaseTerm: workspace.leaseTerm,
                        price: workspace.price
                    };
    
                    // Insert search object data into array
                    searchWorkspace.push(searchWorkspaceData);
                }
            })
        }
    })

    if (searchWorkspace.length == 0) {
        var searchMessageElement = document.getElementById("searchMessage");
        searchMessageElement.textContent = "There is no matching result!";
        searchMessageElement.style.color = "red";
    
        // Set timeout to hide the message after 2 seconds
        setTimeout(function() {
            searchMessageElement.textContent = ""; // Clear the message
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    // Populate search result table
    PopulateSearchWorkspaceTable();
})

// Function to populate properties table
function PopulateSearchWorkspaceTable() {
    let workspaceTable = document.querySelector("#searchWorkspaceTable");

    // Reset table data
    for (var i = workspaceTable.rows.length - 1; i > 0; i--) {
        workspaceTable.deleteRow(i);
    }

    // Update property table with updated data
    searchWorkspace.forEach((data, index) => {
        let newRow = workspaceTable.insertRow(index + 1);
        newRow.insertCell(0).innerHTML = data.address;
        newRow.insertCell(1).innerHTML = data.neighborhood;
        newRow.insertCell(2).innerHTML = data.squareFeet;
        newRow.insertCell(3).innerHTML = data.parking;
        newRow.insertCell(4).innerHTML = data.publicTransport;
        newRow.insertCell(5).innerHTML = data.seatingCapacity;
        newRow.insertCell(6).innerHTML = data.smokingPolicy;
        newRow.insertCell(7).innerHTML = data.availabilityDate;
        newRow.insertCell(8).innerHTML = data.leaseTerm;
        newRow.insertCell(9).innerHTML = data.price;
    })
}

// Function to limit numeric values as positive
document.querySelectorAll('.number').forEach(field => {
    field.addEventListener('change', () => {
        if (field.value < 0)
            field.value = 0;
    })
});
