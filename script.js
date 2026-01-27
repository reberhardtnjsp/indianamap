// Fetch the travel advisory data from the text file
fetch('https://reberhardtnjsp.github.io/indianamap/data/test.txt')
  .then(res => res.text())  // Get the text content from the file
  .then(data => {
    console.log('Data fetched successfully');
    
    // Split the data by lines
    let lines = data.split('\n');
    
    // Parse the fetched data into a usable object
    let travelStatuses = [];
    
    // Extract each county and status from the data
    lines.forEach(line => {
      if (line.includes('<county>')) {
        let county = line.match(/<county>(.*?)<\/county>/);
        let status = line.match(/<travel_status>(.*?)<\/travel_status>/);
        
        if (county && status) {
          // Convert the county name to lowercase to match the SVG ID
          let countyName = county[1].trim().toLowerCase();  // lowercase county name
          let travelStatus = status[1].trim();
          travelStatuses.push({
            county: countyName,
            status: travelStatus
          });

          // Debugging logs
          console.log(`County: ${countyName}, Status: ${travelStatus}`);
        }
      }
    });

    // Log the parsed data to check
    console.log('Parsed Travel Statuses:', travelStatuses);

    // Now update the county colors based on status
    travelStatuses.forEach(item => {
      let countyElement = document.getElementById(item.county);  // match lowercase county ID
      console.log(`Checking county: ${item.county} (Element found: ${countyElement ? 'Yes' : 'No'})`);
      
      if (countyElement) {
        // Change colors based on the travel status
        switch (item.status.toLowerCase()) {
          case 'warning':
            countyElement.style.fill = 'red';
            break;
          case 'watch':
            countyElement.style.fill = 'orange';
            break;
          case 'advisory':
            countyElement.style.fill = 'yellow';
            break;
          default:
            countyElement.style.fill = '#e6e6e6'; // Default gray if no status
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
