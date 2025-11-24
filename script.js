const API_URL = "https://jsonplaceholder.typicode.com/users";

const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const statusMsg = document.getElementById("statusMsg");

// Fetch + display users
async function fetchUsers() {
  try {
    // UI: loading state
    statusMsg.textContent = "Loading users...";
    statusMsg.style.color = "black";
    reloadBtn.disabled = true;
    userContainer.innerHTML = "";

    const response = await fetch(API_URL);

    // Handle HTTP errors (like 404, 500)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json(); // parse JSON

    // Show users on page
    if (users.length === 0) {
      userContainer.innerHTML = "<p>No users found.</p>";
    } else {
      users.forEach((user) => {
        const card = document.createElement("div");
        card.className = "user-card";

        const address = user.address;
        const fullAddress = `${address.suite}, ${address.street}, ${address.city}, ${address.zipcode}`;

        card.innerHTML = `
          <h2>${user.name}</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${fullAddress}</p>
        `;

        userContainer.appendChild(card);
      });
    }

    statusMsg.textContent = "Users loaded successfully ✅";
    statusMsg.style.color = "green";
  } catch (error) {
    console.error("Fetch error:", error);
    statusMsg.textContent = "Failed to load users. Please check your internet and try again.";
    statusMsg.style.color = "red";
    userContainer.innerHTML = "";
  } finally {
    reloadBtn.disabled = false;
  }
}

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Fetch once on page load
fetchUsers();
