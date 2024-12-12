import React, { useState, useEffect } from "react";

const EmailProviderSelection = () => {
  const [emailProvider, setEmailProvider] = useState("nodemailer");
  const [connectionStatus, setConnectionStatus] = useState(false); // To show connected/disconnected status
  const [email, setEmail] = useState("");

  // Load saved email provider preference from localStorage
  useEffect(() => {
    const savedEmailProvider = localStorage.getItem("emailProvider");
    const savedEmail = localStorage.getItem("email");

    if (savedEmailProvider) {
      setEmailProvider(savedEmailProvider);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }

    setConnectionStatus(!!savedEmailProvider); // Assume connected if provider is saved
  }, []);

  // Function to handle email preferences save
  const handleSavePreferences = () => {
    localStorage.setItem("emailProvider", emailProvider);
    localStorage.setItem("email", email);
    setConnectionStatus(true); // Update connection status
    alert("Email connected successfully!");
  };

  // Function to simulate email connection test
  const handleTestConnection = async () => {
    if (!email) {
      alert("Please enter your email before testing the connection.");
      return;
    }

    // Simulated test logic
    try {
      const response = await fetch("http://localhost:5000/api/notifications/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


      const data = await response.json();
    if (data.success) {
      alert(data.message); // Show success message
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error testing connection:", error);
    alert("Unable to connect. Please check your settings.");
  }

  
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold">Email Notifications Setup</h2>
      <p className="text-gray-600">
        Stay updated with the latest notifications. Connect your email provider to receive updates.
      </p>

      {/* Email Input */}
      <div>
        <label className="block text-lg font-medium">
          Your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>
      </div>

    

      {/* Connection Status */}
      <p className="text-lg">
        Status:{" "}
        <span
          className={`font-semibold ${
            connectionStatus ? "text-green-600" : "text-red-600"
          }`}
        >
          {connectionStatus ? "Connected" : "Not Connected"}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save & Connect
        </button>
        <button
          onClick={handleTestConnection}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
};

export default EmailProviderSelection;










// import React, { useState, useEffect } from 'react';

// const EmailProviderSelection = () => {
//   const [emailProvider, setEmailProvider] = useState('nodemailer');
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');

//   // Function to handle email preferences save
//   const handleSavePreferences = () => {
//     localStorage.setItem('emailProvider', emailProvider);
//     alert('Preferences saved');
//   };


//   // Load saved email provider preference from localStorage
//   useEffect(() => {
//     const savedEmailProvider = localStorage.getItem('emailProvider');
//     if (savedEmailProvider) {
//       setEmailProvider(savedEmailProvider);
//     }
//   }, []);

//   // Function to handle email submission
//   const handleEmailSubmit = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/send-notification', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           subject,
//           message
//         })
//       });

//       if (response.ok) {
//         alert('Email sent successfully!');
//       } else {
//         alert('Error sending email');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Connect Email Provider</h2>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="nodemailer"
//             checked={emailProvider === 'nodemailer'}
//             onChange={(e) => setEmailProvider(e.target.value)}
//           />
//           Nodemailer
//         </label>
//         {/* You can add Mailgun and SendGrid here if needed */}
//       </div>

//       <div>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </label>
//       </div>

//       <button onClick={handleEmailSubmit}>Send Notification</button>

//       {/* Add a button to save the email provider preference */}
//       <button onClick={handleSavePreferences}>Save Preferences</button>
//     </div>
//   );
// };

// export default EmailProviderSelection;
