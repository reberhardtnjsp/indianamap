fetch('https://reberhardtnjsp.github.io/indianamap/data/test.txt')
  .then(res => res.text())  // Get the text content from the file
  .then(data => {
    // Split the data by lines
    let lines = data.split('\n');

    // Parse the fetched data into a usable object
    let travelStatuses = [];
    
    // Loop through each line, looking for <county> and <travel_status>
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Check if the current line contains <county>
      if (line.includes('<county>')) {
        let county = line.match(/<county>(.*?)<\/county>/);
        
        // Check the next line for <travel_status>
        let statusLine = lines[i + 1]?.trim();
        let status = null;
        if (statusLine && statusLine.includes('<travel_status>')) {
          status = statusLine.match(/<travel_status>(.*?)<\/travel_status>/);
        }

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

    // Now update the county colors based on status
    travelStatuses.forEach(item => {
      let countyElement = document.getElementById(item.county);  // match lowercase county ID
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

        // Add hover event to show county ID in console
        countyElement.addEventListener('mouseenter', () => {
          console.log(`Hovered over: ${item.county}`);
        });
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
