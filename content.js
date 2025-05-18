
const sensitiveDataPatterns = {
    phoneNumber: /\b(?:\+?91[-\s]?)?[0-9]{10}\b/g, // Basic Indian phone number pattern
    creditCard: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g, // Common credit card patterns (Visa, Mastercard, Amex, Discover)
    panCard: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, // Basic Indian PAN card pattern
    aadharCard: /\b[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\b/g, // Basic Indian Aadhaar card pattern (allows optional spaces)
  };
  
  /**
   * Detects sensitive data within a given text string.
   * @param {string} text - The text to scan for sensitive data.
   * @returns {Array<Object>} An array of detected sensitive data items.
   */
  function detectSensitiveData(text) {
    const detections = [];
    // Iterate over each sensitive data pattern
    for (const type in sensitiveDataPatterns) {
      const pattern = sensitiveDataPatterns[type];
      let match;
      // Find all matches of the pattern in the text
      while ((match = pattern.exec(text)) !== null) {
        detections.push({
          type: type, // Type of sensitive data (e.g., 'phoneNumber', 'creditCard')
          value: match[0], // The matched sensitive data string
          timestamp: new Date().toISOString() // Timestamp of detection
        });
      }
    }
    return detections;
  }
  
  /**
   * Sends a message to the background script indicating sensitive data was detected.
   * @param {Array<Object>} data - The array of detected sensitive data items.
   */
  function notifySecurityTeam(data) {
    chrome.runtime.sendMessage({
      action: "sensitiveDataDetected", // Action to be handled by the background script
      data: data, // The detected data
      url: window.location.href // The URL of the page where detection occurred
    });
  }
  
  // Monitor 'input' events on the document. This captures typing and pasting in input fields and textareas.
  // Using the capturing phase (true as the third argument) allows us to intercept the event early.
  document.addEventListener('input', (event) => {
    const element = event.target;
    // Check if the event target is an input field or a textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const detections = detectSensitiveData(element.value);
      if (detections.length > 0) {
        console.warn("Sensitive data detected:", detections);
        notifySecurityTeam(detections);
      }
    }
  }, true);
  
  // Monitor 'paste' events on the document. This specifically captures data pasted by the user.
  // Using the capturing phase allows us to intercept the event early.
  document.addEventListener('paste', (event) => {
    const pastedText = event.clipboardData.getData('text'); // Get the text from the clipboard
    const detections = detectSensitiveData(pastedText);
    if (detections.length > 0) {
      console.warn("Sensitive data detected from paste:", detections);
      notifySecurityTeam(detections);
    }
  }, true);
  
  // Monitor 'change' events for file input elements.
  // NOTE: Scanning file content within a content script is complex and has limitations.
  // A more robust solution would involve sending the file (or its content) to the background script
  // or a native application for scanning. This is a simplified placeholder.
  document.addEventListener('change', (event) => {
      const element = event.target;
      // Check if the event target is a file input element
      if (element.type === 'file') {
          const files = element.files;
          for (let i = 0; i < files.length; i++) {
              const file = files[i];
              console.warn("File selected for upload:", file.name);
              // In a real scenario, you would read the file content here and scan it.
              // For demonstration, we'll just log the file name and trigger a notification.
              notifySecurityTeam([{ type: 'fileUpload', value: file.name, timestamp: new Date().toISOString() }]);
          }
      }
  }, true);
  