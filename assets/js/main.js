function verifyCertificate() {
    const inputId = document.getElementById('certInput').value.trim().toUpperCase();
    const resultArea = document.getElementById('resultArea');
    
    // LocalStorage se data nikalna
    const allCerts = JSON.parse(localStorage.getItem('adg_certificates')) || [];
    const found = allCerts.find(c => c.certId === inputId);

    if(found) {
        resultArea.innerHTML = `
            <div style="border: 2px solid #c5a059; padding: 20px; border-radius: 10px; background: #112240;">
                <h2 style="color: #c5a059;">VERIFIED STUDENT</h2>
                <p><strong>Name:</strong> ${found.name}</p>
                <p><strong>Course:</strong> ${found.course}</p>
                <p><strong>Date:</strong> ${found.date}</p>
                <p style="color: green;">Status: Official & Authentic</p>
            </div>
        `;
    } else {
        resultArea.innerHTML = `<p style="color: red;">Invalid Certificate ID. Please check and try again.</p>`;
    }
}
