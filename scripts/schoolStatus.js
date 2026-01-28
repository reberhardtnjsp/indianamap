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
        school.record.forEach(record => {
            const schoolName = record.forced_organization_name;
            const formattedSchoolName = schoolName.replace(/\s+/g, '-').toLowerCase();
            console.log(`School: ${schoolName}, Generated Circle ID: ${formattedSchoolName}`);

            // Try to find the corresponding circle by the generated ID
            const circle = document.getElementById(formattedSchoolName);

            // If the circle exists, we proceed
            if (circle) {
                console.log(`Circle found for ${schoolName}`);
                updateCircleColor(circle, record);
            } else {
                // If no matching circle is found, log it and continue
                console.warn(`No circle found for ${schoolName}`);
            }
        });
    });
}

// Function to update the circle color based on the forced status
function updateCircleColor(circle, record) {
    const status = record.forced_status_name.toLowerCase();
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
}

// Call the function to load the data and update circle colors when the page loads
window.onload = loadSchoolData;
