// Get modal element
var modal = document.getElementById("rsvp-modal");

// Get button that opens the modal
var confirmButton = document.getElementById("confirm-button");

// Get buttons inside the modal
var attendButton = document.getElementById("attend-button");
var declineButton = document.getElementById("decline-button");

// When the user clicks the confirm button, open the modal
confirmButton.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks "Prídem" (attend), link to the confirmation page
attendButton.onclick = function() {
    window.location.href = "formular.html"; // Link to the existing page
};

// When the user clicks "Neprídem" (decline), link to another form
declineButton.onclick = function() {
    window.location.href = "decline_form.html"; // You will create this page
};

// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
