// Function to fetch the data and change circle color based on school status
async function loadSchoolData() {
    // Fetch the JSON file containing school data (wndu.json)
    const response = await fetch('data/wndu.json');
    const data = await response.json();

    // Log the fetched data for debugging purposes
    console.log("Fetched data: ", data);

    // Get all circles in the SVG
    const allCircles = document.querySelectorAll('circle');
    console.log("All circles in the SVG: ", allCircles);

    // Debugging: Loop through each school in the JSON and show its generated circle ID
    data.forEach(school => {
        const schoolName = school.record[0].forced_organization_name;
        const formattedSchoolName = schoolName.replace(/\s+/g, '-').toLowerCase();
        console.log(`School: ${schoolName}, Generated Circle ID: ${formattedSchoolName}`);
    });

    // Iterate over each circle in the SVG
    allCircles.forEach(circle => {
        const circleId = circle.id; // Get the ID of the circle

        // Find the corresponding school data based on circle ID
        const school = data.find(school => {
            const schoolName = school.record[0].forced_organization_name;
            const formattedSchoolName = schoolName.replace(/\s+/g, '-').toLowerCase();
            return formattedSchoolName === circleId;
        });

        // If a matching school is found
        if (school) {
            const status = school.record[0].forced_status_name.toLowerCase();
            let circleColor = 'green'; // Default color (green)

            // Check for eLearning, online, or synchronous status (Blue)
            if (status.includes('elearning') || status.includes('online') || status.includes('synchronous')) {
                circleColor = 'blue';
            }
            // Check for 2-hour delay (Yellow)
            else if (status.includes('2-hour delay') || status.includes('starting 2 hours late')) {
                circleColor = 'yellow';
            }
            // Check for Closed status without eLearning (Red)
            else if (status.includes('closed') && !status.includes('elearning') && !status.includes('online')) {
                circleColor = 'red';
            }

            // Set the color of the circle
            circle.setAttribute('fill', circleColor);
        } else {
            // If no matching school is found, set the circle to green by default
            circle.setAttribute('fill', 'green');
        }
    });
}

// Call the function to load the data and update circle colors when the page loads
window.onload = loadSchoolData;
