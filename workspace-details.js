// ============================================================================================================
// WORKSPACE DETAILS PAGE
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

// Validate token for current page
const token = window.localStorage.getItem("token")
await auth(token)

// Get the parameter value from the URL
const params = new URLSearchParams(window.location.search);
const property_id = params.get('id');
const editindex = params.get('editindex');
const workspaceindex = params.get('workspaceindex');

var properties = await getAllProperties();

let selectedworkspace = properties[editindex].workspace[workspaceindex];

let seatingCapacity_details = document.querySelector('#seating-capacity_details');
let smokingPolicy_details = document.querySelector('#smoking-policy_details');
let availabilityDate_details = document.querySelector('#availability-date_details');
let leaseTerm_details = document.querySelector('#lease-term_details');
let price_details = document.querySelector('#price_details');

// Display details of the selected workspace
seatingCapacity_details.value = selectedworkspace.seatingCapacity;
smokingPolicy_details.value = selectedworkspace.smokingPolicy;
availabilityDate_details.value = selectedworkspace.availabilityDate;
leaseTerm_details.value = selectedworkspace.leaseTerm;
price_details.value = selectedworkspace.price;

// Function to save modified workspace data
document.querySelector('#saveWorkspace').addEventListener('click', () => {

    // Save details in workspace variable
    selectedworkspace.seatingCapacity = seatingCapacity_details.value;
    selectedworkspace.smokingPolicy = smokingPolicy_details.value;
    selectedworkspace.availabilityDate = availabilityDate_details.value;
    selectedworkspace.leaseTerm = leaseTerm_details.value;
    selectedworkspace.price = price_details.value;

    let matchitem = (properties[editindex].workspace.findIndex(item => JSON.stringify(item) === JSON.stringify(selectedworkspace)))
    if ((matchitem == workspaceindex) || (matchitem == -1)) {
        // Display message in <p> tag and go to properties page
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = "Workspace Updated successfully!";
        document.body.appendChild(messageParagraph);
        window.location.href = 'workspaces.html?id=' + properties[editindex]._id +
            '&editindex=' + editindex +
            '&selectedworkspace=' + JSON.stringify(selectedworkspace) +
            '&workspaceindex=' + workspaceindex +
            '&mode=update';
    } else {
        // Display message in <p> tag
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = "Workspace already exist";
        document.body.appendChild(messageParagraph);
    }
})

// Function to cancel modified workspace data changes
document.querySelector('#cancelWorkspace').addEventListener('click', () => {
    window.location.href = 'workspaces.html?id=' + properties[editindex]._id + '&editindex=' + editindex + '&mode=show';
})

// Function to limit numeric values as positive
document.querySelectorAll('.number').forEach(field => {
    field.addEventListener('change', () => {
        if (field.value < 0)
            field.value = 0;
    })
});