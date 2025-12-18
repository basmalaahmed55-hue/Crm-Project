const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

// Login
function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            loginPage.classList.add("hidden");
            dashboardPage.classList.remove("hidden");
            loadCustomersFromServer();
        } else {
            alert("Wrong username or password");
        }
    });
}


// Logout
function logout() {
    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
}

// Add Customer
async function addCustomer() {
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;
    const status = document.getElementById("custStatus").value;

    if(name && phone) {
        const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u, password: p })
});


        const data = await res.json();
        if(data.success){
            loadCustomers();
            document.getElementById("custName").value = "";
            document.getElementById("custPhone").value = "";
        } else {
            alert("Failed to add customer");
        }
    } else {
        alert("Please enter name and phone");
    }
}

// Load Customers
function loadCustomersFromServer() {
    fetch("/customers")
    .then(res => res.json())
    .then(customers => {
        const list = document.getElementById("custList");
        list.innerHTML = "";
        customers.forEach(c => {
            const li = document.createElement("li");
            li.textContent = `${c.name} - ${c.phone} (${c.status})`;
            list.appendChild(li);
        });
    });
}

function addCustomer() {
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;
    const status = document.getElementById("custStatus").value;

    fetch("/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, status })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            loadCustomersFromServer();
            document.getElementById("custName").value = "";
            document.getElementById("custPhone").value = "";
        } else {
            alert("Failed to add customer");
        }
    });
}


function toggleMode() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("modeToggle");
    if(document.body.classList.contains("dark")) {
        btn.textContent = "🌑"; 
    } else {
        btn.textContent = "☀️"; 
    }
}

