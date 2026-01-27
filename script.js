fetch('data/test.txt')
  .then(res => res.text())
  .then(text => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const statuses = xml.querySelectorAll("PLA_BurnBan\\.dbo\\.Status");

    statuses.forEach(s => {
      const county = s.querySelector("county")?.textContent.trim();
      const status = s.querySelector("travel_status")?.textContent.trim();
      if(!county || !status) return;

      const el = document.getElementById(county);
      if(!el) return;

      switch(status) {
        case "Warning": el.style.fill = "red"; break;
        case "Watch": el.style.fill = "orange"; break;
        case "Advisory": el.style.fill = "yellow"; break;
        default: el.style.fill = "#e6e6e6";
      }
    });
  })
  .catch(err => console.error("Error loading travel advisory file:", err));
