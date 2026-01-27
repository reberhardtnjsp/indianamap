fetch('https://reberhardtnjsp.github.io/indianamap/data/test.txt')
  .then(res => res.text())  // Get the text content from the file
  .then(data => {
    console.log('Data fetched successfully');
    
    // Log the raw data to inspect it
    console.log('Raw Data:', data);
    
    // Split the data by lines (you may need to try '\r\n' or '\n' based on the file type)
    let lines = data.split('\n');
    console.log('Lines Split:', lines.length);  // Log the number of lines to check if split works

    // Parse the fetched data into a usable object
    let travelStatuses = [];
    
    // Loop through each line, but we will be looking ahead to the next line too
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      console.log(`Line ${i + 1}: ${line}`);  // Log each line to inspect it

      // Check if the current line contains <county>
      if (line.includes('<county>')) {
        let county = line.match(/<county>(.*?)<\/county>/);
        
        // Check the next line for <travel_status>
        let statusLine = lines[i + 1]?.trim();  // Get the next line if it exists
        console.log(`Status Line: ${statusLine}`);
        
        let status = null;
        if (statusLine && statusLine.includes('<travel_status>')) {
          status = statusLine.match(/<travel_status>(.*?)<\/travel_status>/);
        }
        
        // Log county and status extraction
        console.log(`Extracted: County - ${county ? county[1] : 'None'}, Status - ${status ? status[1] : 'None'}`);

        // If we have both county and status, process them
        if (county && status) {
          let countyName = county[1].trim().toLowerCase();
          let travelStatus = status[1].trim();
          travelStatuses.push({
            county: countyName,
            status: travelStatus
          });
        }

        // Skip the next line since we've already checked it for status
        i++; 
      }
    }

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
