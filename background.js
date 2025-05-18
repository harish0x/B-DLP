// background.js
// This script runs in the background and handles messages from the content script.

// Listen for messages from content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check if the message action is 'sensitiveDataDetected'.
    if (request.action === "sensitiveDataDetected") {
      console.log("Sensitive data detected in background:", request.data);
      console.log("On URL:", request.url);
  
      
  
      // Also, create a browser notification to alert the user.
      chrome.notifications.create({
        type: "basic", // Basic notification type
        iconUrl: "icons/warning.png", // Icon to display in the notification
        title: "Sensitive Data Alert", // Title of the notification
        message: "Sensitive data entry detected on this page. An alert has been logged." , // Message body
        priority: 1 // Notification priority (higher number means higher priority)
      });
    }
  });
  