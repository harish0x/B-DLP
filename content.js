const sensitiveDataPatterns = {
  phoneNumber: /\b(?:\+?91[-\s]?)?[0-9]{10}\b/g,
  creditCard: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
  panCard: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,
  aadharCard: /\b[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\b/g,
};

function detectSensitiveData(text) {
  const detections = [];
  for (const type in sensitiveDataPatterns) {
    const pattern = new RegExp(sensitiveDataPatterns[type].source, 'g');
    let match;
    while ((match = pattern.exec(text)) !== null) {
      detections.push({
        type: type,
        value: match[0],
        masked: match[0].slice(0, 4) + '****' + match[0].slice(-4),
        timestamp: new Date().toISOString()
      });
    }
  }
  return detections;
}

function showAlert(detections) {
  if (detections.length === 0) return;
  
  let alertMessage = "⚠️ SECURITY WARNING ⚠️\n\n";
  detections.forEach((det, index) => {
    alertMessage += `${index + 1}. ${det.type}: ${det.masked}\n`;
  });
  alertMessage += "\nDo NOT share sensitive information!";
  
  alert(alertMessage);
  console.log("Detected:", detections);
}

// Input monitoring
document.addEventListener('input', (event) => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    const detections = detectSensitiveData(event.target.value);
    if (detections.length > 0) {
      showAlert(detections);
    }
  }
}, true);

// Paste monitoring
document.addEventListener('paste', (event) => {
  const pastedText = (event.clipboardData || window.clipboardData).getData('text');
  const detections = detectSensitiveData(pastedText);
  if (detections.length > 0) {
    showAlert(detections);
  }
}, true);