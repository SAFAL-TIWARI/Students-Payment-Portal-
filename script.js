// Show details section when clicking on a hostel
document.querySelectorAll('.hostel-block').forEach(block => {
    block.addEventListener('click', function () {
        document.getElementById('detailsSection').classList.remove('hidden');
    });
});



// Load the WebAssembly modules
let studentDataModule, studentServerModule;

// Load stu_data.wasm
createStudentDataModule().then((module) => {
    studentDataModule = module;
    console.log("Student Data Module Loaded");
});

// Load stu_server.wasm (if needed)
createStudentServerModule().then((module) => {
    studentServerModule = module;
    console.log("Student Server Module Loaded");
});
// Example data: Replace this with actual data fetching logic (e.g., API or database call)
const scholarData = {
    "35130": 1000,
    "34605": 2000,
    "35193": 1500,
};

function fetchDetails() {
    const scholarNumberInput = document.getElementById("scholar-number");
    const amountInput = document.getElementById("amount");

    // Get the entered scholar number
    const scholarNumber = scholarNumberInput.value.trim();

    // Fetch the amount for the given scholar number
    const amount = scholarData[scholarNumber];

    if (amount !== undefined) {
        // Update the amount block with the fetched value
        amountInput.value = amount;
    } else {
        // Handle case where scholar number is not found
        alert("Scholar number not found. Please check and try again.");
    }
}
    // Parse the result and update the UI
    const lines = result.split("\n");
    const studentData = {};
    lines.forEach(line => {
        const [key, value] = line.split(": ").map((str) => str.trim());
        if (key && value) {
            studentData[key] = value;
        }
    });

    document.getElementById('fullName').textContent = studentData["Full Name"] || "-";
    document.getElementById('branch').textContent = studentData["Branch"] || "-";
    document.getElementById('category').textContent = studentData["Category"] || "-";
    document.getElementById('roomNumber').textContent = studentData["Room Number"] || "-";
    document.getElementById('numberOfDays').textContent = studentData["Number of Days"] || "-";
    document.getElementById('month').textContent = studentData["Month"] || "-";

    // Calculate and display amount
    const dailyCharge = 100; // Example daily charge
    const totalAmount = parseInt(studentData["Number of Days"] || 0) * dailyCharge;
    document.getElementById('amount').value = totalAmount;

    // Show student details
    document.getElementById('studentDetails').style.display = 'block';
};

// Add event listener for button click
document.getElementById('fetchDetails').addEventListener('click', fetchDetails);

// Add event listener for Enter key press
document.getElementById('scholarNumber').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchDetails();
    }
});
