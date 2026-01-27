// fetch the local test file
fetch('./data/test.txt')
  .then(res => res.text())
  .then(text => {
    // parse the file into county objects
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const statuses = xml.getElementsByTagName('PLA_BurnBan.dbo.Status');

    // loop through each county status
    for (let i = 0; i < statuses.length; i++) {
      const statusElem = statuses[i];
      const countyName = statusElem.getElementsByTagName('county')[0].textContent.trim();
      const travelStatus = statusElem.getElementsByTagName('travel_status')[0].textContent.trim();

      // map travel status to colors
      let color = '#e6e6e6'; // default grey
      if (travelStatus === 'Warning') color = 'red';
      else if (travelStatus === 'Watch') color = 'orange';
      else if (travelStatus === 'Advisory') color = 'yellow';

      // find the SVG path by ID (assumes <path id="Adams"> etc.)
      const countyPath = document.getElementById(countyName);
      if (countyPath) {
        countyPath.style.fill = color;
      }
    }
  })
  .catch(err => console.error('Error loading travel advisory file:', err));
