
// Function to display CSV data in the main content area
function displayCSVData() {
    fetch('software_catalog.csv') // Load CSV file
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const content = document.getElementById('software-list');
            content.innerHTML = ''; // Clear previous content

            for (let i = 1; i < rows.length; i++) {
                const cols = rows[i].split(',');
                if (cols.length > 1) {
                    const softwareDiv = document.createElement('div');
                    softwareDiv.className = 'software-item';

                    softwareDiv.innerHTML = `
                        <h2>${cols[0]}</h2>
                        <p><strong>Description:</strong> ${cols[1]}</p>
                        <p><strong>Category:</strong> ${cols[2]}</p>
                        <p><strong>Operating System:</strong> ${cols[3]}</p>
                        <a href="${cols[4]}" target="_blank">Download</a>
                        <p><strong>Tags:</strong> ${cols[5]}</p>
                    `;

                    content.appendChild(softwareDiv);
                }
            }
        })
        .catch(error => console.error('Error loading CSV:', error));
}

// Run the function to display data when the page loads
document.addEventListener('DOMContentLoaded', displayCSVData);
