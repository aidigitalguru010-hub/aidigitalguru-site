async function generatePDF(studentName, courseName, certId, issueDate) {
    // Iske liye hum 'jspdf' library use karenge
    const doc = new jsPDF('landscape');
    
    // Aapka certificate background image
    const imgData = '1000395846.png'; 
    
    doc.addImage(imgData, 'PNG', 0, 0, 297, 210); // A4 Landscape size
    
    // Adding Text over background
    doc.setFont("times", "bolditalic");
    doc.setFontSize(40);
    doc.setTextColor(230, 241, 255); // Light color match
    doc.text(studentName, 148, 105, { align: "center" }); // Center position
    
    doc.setFontSize(22);
    doc.text(courseName, 148, 145, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(certId, 55, 172);
    doc.text(issueDate, 55, 182);

    doc.save(`Certificate_${certId}.pdf`);
}
