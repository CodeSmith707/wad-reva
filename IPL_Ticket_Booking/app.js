
/* =================================
   IPL TICKET BOOKING SYSTEM
   JavaScript Functionality
================================= */


// 1. Reusable Toast Notification Function

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}


// 2. Select Match and Scroll to Booking Form

function selectMatch(matchName) {

    document.getElementById("match").value = matchName;

    updateSummary();

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    showToast(matchName + " selected! Complete your booking.");
}


// 3. Filter Matches by Team

function filterMatches() {

    var filter = document.getElementById("teamFilter").value;

    var table = document.getElementById("matchTable");

    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {

        var teams = rows[i].getElementsByTagName("td")[1].innerHTML;

        if (filter == "all" || teams.includes(filter)) {
            rows[i].style.display = "";
        }
        else {
            rows[i].style.display = "none";
        }
    }
}


// 4. Update Booking Summary

function updateSummary() {

    // Get selected values

    var match = document.getElementById("match").value;

    var category = document.getElementById("category").value;

    var quantity = document.getElementById("quantity").value;


    // Calculate total price

    var total = Number(category) * Number(quantity);


    // Determine stand name

    var stand = "Not Selected";

    if (category == "1000")
        stand = "General";

    else if (category == "2000")
        stand = "Premium";

    else if (category == "3000")
        stand = "VIP";


    // Update Booking Summary

    document.getElementById("sumMatch").innerHTML =
        match || "Not Selected";

    document.getElementById("sumStand").innerHTML = stand;

    document.getElementById("sumPrice").innerHTML =
        category || "0";

    document.getElementById("sumQuantity").innerHTML =
        quantity || "0";

    document.getElementById("sumTotal").innerHTML =
        total || "0";


    // Show notification

    showToast("Booking summary updated!");
}


// 5. Add Change Event Listeners

document.getElementById("match").addEventListener("change", updateSummary);

document.getElementById("category").addEventListener("change", updateSummary);

document.getElementById("quantity").addEventListener("change", updateSummary);


// 6. Calculate and Confirm Booking

function calculateBooking(event) {

    event.preventDefault();

    var name = document.getElementById("name").value;
    var match = document.getElementById("match").value;
    var category = document.getElementById("category").value;
    var quantity = document.getElementById("quantity").value;
    var total = category * quantity;
    var stand = document.getElementById("sumStand").innerHTML;
    var table = document.getElementById("bookingTable");
    var row = table.insertRow();

    row.insertCell(0).innerHTML = name;

    row.insertCell(1).innerHTML = match;

    row.insertCell(2).innerHTML = stand;

    row.insertCell(3).innerHTML = quantity;

    row.insertCell(4).innerHTML = "Rs." + total;

    document.getElementById("noBookings").style.display = "none";

    showToast("Ticket booked successfully!");

    document.getElementById("mybookings").scrollIntoView({
        behavior: "smooth"
    });
}
