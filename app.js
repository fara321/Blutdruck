document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bloodPressureForm');
    const bloodPressureList = document.getElementById('bloodPressureList');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadInput = document.getElementById('uploadInput');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const systolic = document.getElementById('systolic').value;
      const diastolic = document.getElementById('diastolic').value;
      const date = document.getElementById('date').value;
      
      const bloodPressure = {
        systolic,
        diastolic,
        date
      };
  
      saveBloodPressure(bloodPressure);
      displayBloodPressure();
      
      form.reset();
    });
  
    function saveBloodPressure(bloodPressure) {
      let bloodPressures = JSON.parse(localStorage.getItem('bloodPressures')) || [];
      bloodPressures.push(bloodPressure);
      localStorage.setItem('bloodPressures', JSON.stringify(bloodPressures));
    }
  
    function displayBloodPressure() {
      bloodPressureList.innerHTML = '';
      let bloodPressures = JSON.parse(localStorage.getItem('bloodPressures')) || [];
      bloodPressures.forEach(bp => {
        const li = document.createElement('li');
        li.textContent = `Datum: ${bp.date}, Systolisch: ${bp.systolic}, Diastolisch: ${bp.diastolic}`;
        bloodPressureList.appendChild(li);
      });
    }
  
    downloadBtn.addEventListener('click', () => {
      let bloodPressures = JSON.parse(localStorage.getItem('bloodPressures')) || [];
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bloodPressures));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "blood_pressures.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  
    uploadBtn.addEventListener('click', () => {
      uploadInput.click();
    });
  
    uploadInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const bloodPressures = JSON.parse(e.target.result);
            localStorage.setItem('bloodPressures', JSON.stringify(bloodPressures));
            displayBloodPressure();
          } catch (error) {
            alert('Fehler beim Einlesen der Datei. Stellen Sie sicher, dass es eine gültige JSON-Datei ist.');
          }
        };
        reader.readAsText(file);
      }
    });
  
    displayBloodPressure();
  });