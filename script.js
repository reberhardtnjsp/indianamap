// Fetch the travel advisory data from the text file
fetch('test.txt')
  .then(res => res.text())  // Get the text content from the file
  .then(data => {
    console.log('Data fetched successfully');
    // Split the data by lines
    let lines = data.split('\n');
    // Print the first 10 lines to check if data is fetched correctly
    console.log(lines.slice(0, 10));  // Change the number as needed for more lines
    
    // Parse the fetched data into a usable object
    let travelStatuses = [];
    
    // Extract each county and status from the data (you'll need to adjust based on format)
    lines.forEach(line => {
      if (line.includes('<county>')) {
        let county = line.match(/<county>(.*?)<\/county>/);
        let status = line.match(/<travel_status>(.*?)<\/travel_status>/);
        
        if (county && status) {
          travelStatuses.push({
            county: county[1].trim(),
            status: status[1].trim()
          });
        }
      }
    });

    // Log the parsed data to check
    console.log(travelStatuses);

    // Now update the county colors based on status
    travelStatuses.forEach(item => {
      let countyElement = document.getElementById(item.county);
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
