chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sensitiveDataDetected") {
    const notificationId = 'sensitiveDataAlert-' + Date.now();
    
    chrome.notifications.create(notificationId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/warning.png"),
      title: "⚠️ Sensitive Data Detected",
      message: "Potential sensitive data was entered on this page.",
      priority: 1,
      requireInteraction: true
    });   

    console.log("Notification sent:", request.data);
  }
});