// Function to fetch the data and change circle color based on school status
async function loadSchoolData() {
    // Fetch the JSON file containing school data (wndu.json)
    const response = await fetch('data/wndu.json');
    const data = await response.json();

    // Log the fetched data for debugging purposes
    console.log("Fetched data: ", data);

    // Iterate through the data and update circle colors based on the forced_status_name
    data.forEach(school => {
        const schoolName = school.record[0].forced_organization_name;
        const status = school.record[0].forced_status_name.toLowerCase();

        // Generate the circle ID based on the school name (replace spaces with hyphens)
        const circleId = schoolName.replace(/\s+/g, '-').toLowerCase();

        console.log(`Circle ID: ${circleId}`);  // Log the generated circle ID

        // Find the corresponding circle by the generated ID
        const circle = document.getElementById(circleId);

        if (circle) {
            console.log(`Found circle for ${schoolName}`);  // Log if the circle was found

            // Default color (Green) if no specific condition is met
            let circleColor = 'green';

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
            console.log(`No circle found for ${schoolName}`);  // Log if no circle was found for the school
        }
    });
}

// Call the function to load the data and update circle colors
window.onload = loadSchoolData;
