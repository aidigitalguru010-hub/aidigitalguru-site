async function generatePDF() {
  const { jsPDF } = window.jspdf;

  const cid = document.getElementById("cid").value;
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const date = document.getElementById("date").value;
  const msg = document.getElementById("msg");

  if (!cid || !name || !course || !date) {
    msg.innerText = "❌ Please fill all fields";
    return;
  }

  // 1️⃣ Save certificate to Google Sheet (via existing API)
  addCertificate(); // already in admin.js

  // 2️⃣ Create Landscape PDF
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  // Background
  doc.setFillColor(6, 16, 40);
  doc.rect(0, 0, 297, 210, "F");

  // Border
  doc.setDrawColor(0, 195, 255);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  // Title
  doc.setTextColor(0, 195, 255);
  doc.setFontSize(28);
  doc.text("AI DIGITAL GURU", 148, 35, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Certificate of Completion", 148, 50, { align: "center" });

  // Student Name
  doc.setFontSize(22);
  doc.text(name, 148, 80, { align: "center" });

  doc.setFontSize(14);
  doc.text(`has successfully completed the course`, 148, 95, { align: "center" });

  doc.setFontSize(18);
  doc.text(course, 148, 110, { align: "center" });

  // Details
  doc.setFontSize(12);
  doc.text(`Certificate ID: ${cid}`, 40, 150);
  doc.text(`Issue Date: ${date}`, 40, 162);

  // QR Code
  const verifyURL =
    "https://aidigitalguru.in/certificate.html?id=" + cid;

  const qrURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
    encodeURIComponent(verifyURL);

  const qrImg = await fetch(qrURL).then(r => r.blob());
  const qrBase64 = await blobToBase64(qrImg);

  doc.addImage(qrBase64, "PNG", 220, 120, 50, 50);

  doc.setFontSize(10);
  doc.text("Scan QR to Verify", 245, 178, { align: "center" });

  // Save PDF
  doc.save(`${cid}.pdf`);

  msg.innerText = "✅ Certificate PDF Generated & Saved";
}

// Helper: Blob → Base64
function blobToBase64(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}