
// Function to fetch and parse CSV file
async function fetchCSV() {
    const response = await fetch('software_catalog.csv'); // Assuming the CSV file is in the same directory
    const data = await response.text();
    return parseCSV(data);
}

// Function to parse CSV data into an array of objects, filtering out malformed rows
function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        // Only add rows that contain valid data
        if (currentLine.length === headers.length && currentLine[0]) { // Ensures valid row with name
            headers.forEach((header, index) => {
                obj[header.trim()] = currentLine[index] ? currentLine[index].trim() : "undefined";
            });
            result.push(obj);
        }
    }
    return result;
}

// Function to display data in the main content area
async function displayData() {
    const data = await fetchCSV();

    const softwareList = document.getElementById('software-list');
    softwareList.innerHTML = '';

    data.forEach(item => {
        // Ensure we have a valid entry
        if (item.Name !== "undefined" && item.Description !== "undefined" && item['Download Link'] !== "undefined") {
            const categorySection = document.createElement('div');
            categorySection.classList.add('software-item');

            categorySection.innerHTML = `
                <h2>${item.Name}</h2>
                <p><strong>Description:</strong> ${item.Description}</p>
                <p><strong>Category:</strong> ${item.Category}</p>
                <p><strong>Operating System:</strong> ${item['Operating System']}</p>
                <a href="${item['Download Link']}" target="_blank">Download</a>
                <p><strong>Tags:</strong> ${item.Tags}</p>
            `;

            softwareList.appendChild(categorySection);
        }
    });
}

// Run the function to display data when the page loads
document.addEventListener('DOMContentLoaded', displayData);
