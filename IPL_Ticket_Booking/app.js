/* =================================
   IPL TICKET BOOKING SYSTEM
   Activity 8: Responsive Layout
================================= */

// 1. Toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}


// 2. Mobile hamburger navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a navigation link.
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// 3. Filter match cards by team
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.getElementById("matchCards");
const noMatches = document.getElementById("noMatches");

function filterMatches() {
    const selectedTeam = teamFilter.value;
    const cards = matchCards.querySelectorAll(".match-card");
    let visibleCount = 0;

    cards.forEach(card => {
        const teams = card.dataset.teams.split(" ");
        const shouldShow = selectedTeam === "all" || teams.includes(selectedTeam);

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    noMatches.hidden = visibleCount !== 0;
}

teamFilter.addEventListener("change", filterMatches);


// 4. Toggle between grid and list views
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

function setMatchView(view) {
    const isList = view === "list";

    matchCards.classList.toggle("list-view", isList);
    gridViewBtn.classList.toggle("active", !isList);
    listViewBtn.classList.toggle("active", isList);

    gridViewBtn.setAttribute("aria-pressed", String(!isList));
    listViewBtn.setAttribute("aria-pressed", String(isList));
}

gridViewBtn.addEventListener("click", () => setMatchView("grid"));
listViewBtn.addEventListener("click", () => setMatchView("list"));


// 5. Select a match from its card
function selectMatch(matchName) {
    document.getElementById("match").value = matchName;
    updateSummary(false);

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    showToast(matchName + " selected! Complete your booking.");
}

document.querySelectorAll(".book-match").forEach(button => {
    button.addEventListener("click", () => {
        selectMatch(button.dataset.match);
    });
});


// 6. Update booking summary
function updateSummary(showNotification = true) {
    const match = document.getElementById("match").value;
    const category = document.getElementById("category").value;
    const quantity = Number(document.getElementById("quantity").value) || 0;

    const price = Number(category) || 0;
    const total = price * quantity;

    let stand = "Not Selected";

    if (category === "1000") {
        stand = "General";
    } else if (category === "2000") {
        stand = "Premium";
    } else if (category === "3000") {
        stand = "VIP";
    }

    document.getElementById("sumMatch").textContent = match || "Not Selected";
    document.getElementById("sumStand").textContent = stand;
    document.getElementById("sumPrice").textContent = price;
    document.getElementById("sumQuantity").textContent = quantity;
    document.getElementById("sumTotal").textContent = total;

    if (showNotification) {
        showToast("Booking summary updated!");
    }
}

document.getElementById("match").addEventListener("change", () => updateSummary());
document.getElementById("category").addEventListener("change", () => updateSummary());
document.getElementById("quantity").addEventListener("input", () => updateSummary());


// 7. Calculate and confirm booking
function calculateBooking(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const match = document.getElementById("match").value;
    const category = document.getElementById("category").value;
    const quantity = Number(document.getElementById("quantity").value);
    const total = Number(category) * quantity;

    let stand = "Not Selected";
    if (category === "1000") stand = "General";
    if (category === "2000") stand = "Premium";
    if (category === "3000") stand = "VIP";

    const tableBody = document.getElementById("bookingTableBody");
    const row = tableBody.insertRow();

    [name, match, stand, quantity, "Rs." + total].forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });

    document.getElementById("noBookings").hidden = true;
    showToast("Ticket booked successfully!");

    document.getElementById("mybookings").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("bookingForm").reset();
    updateSummary(false);
}

document.getElementById("bookingForm").addEventListener("submit", calculateBooking);

// Initialise the summary when the page loads.
updateSummary(false);
