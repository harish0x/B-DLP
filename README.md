# B-DLDP: Browser-based Data Loss Prevention 🛡️

## 🚀 Overview

**B-DLDP (Browser-based Data Loss Prevention)** is an intelligent **browser extension** engineered to be your first line of defense against accidental or unauthorized sharing of Personally Identifiable Information (PII) on the web. 🌐 In our interconnected world, safeguarding sensitive data like credit card numbers, phone numbers, and national IDs is paramount. B-DLDP actively monitors your input and clipboard data, providing instant alerts when it detects common PII patterns, helping to prevent costly data breaches before they happen.

## ✨ Key Features

B-DLDP is built to provide robust PII protection directly within your browsing experience:

* **Real-time PII Detection:** ✍️ Monitors text typed into **input fields** (`<input>`) and **text areas** (`<textarea>`) across any website you visit.

* **Paste Monitoring:** 📋 Catches sensitive data even when it's **pasted** from your clipboard into a web form.

* **Comprehensive PII Coverage (India-Centric):** 🇮🇳 Specifically designed to detect common Indian PII formats, including:

    * **Phone Numbers:** 📱 Detects 10-digit numbers, optionally with `+91` prefix or hyphens/spaces.

    * **Credit Card Numbers:** 💳 Identifies common 13-16 digit credit card patterns (e.g., Visa, MasterCard, Amex, Discover).

    * **PAN Card Numbers:** 🆔 Recognizes the `[A-Z]{5}[0-9]{4}[A-Z]{1}` alphanumeric format.

    * **Aadhar Card Numbers:** 👁️ Flags the 12-digit format, often with spaces (e.g., `1234 5678 9012`).

* **Immediate User Alerts:** ⚠️ Triggers a prominent **native browser alert pop-up** (`alert()`) to instantly notify you if sensitive data is detected.

* **Browser Notifications:** 🔔 Creates a **visual browser notification** (via `chrome.notifications`) for a less intrusive, yet clear, heads-up in the notification center.

* **Console Logging:** 📊 Detailed detection logs, including the type of PII, its masked value, and a timestamp, are printed to your browser's developer console for review.

## 🚧 Current Development Status

B-DLDP is currently in its **active development phase**. Our primary focus is on:

* Refining the accuracy and efficiency of PII detection algorithms.

* Ensuring smooth performance without impacting your browsing speed.

* Preparing the extension for wider testing and deployment.