import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import axios from "axios";

const AlertSettingsForm = () => {
  const { preferences, updatePreferences, addNotification } = useNotificationContext();


  const [formData, setFormData] = useState({
    categories: preferences?.categories || [],
    frequency: preferences?.frequency || "daily",
    notificationChannels: preferences?.notificationChannels || [],
  });

  const [email, setEmail] = useState(preferences?.email || ''); // Initialize email state

  const [successMessage, setSuccessMessage] = useState(''); 


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (notifications.length > 0) {
  //       removeNotification(notifications[0].id);
  //     }
  //   }, 15000);

  //   return () => clearTimeout(timer);
  // }, [notifications, removeNotification]);

  // useEffect(() => {
  //   console.log('Preferences Loaded:', preferences);
  //   if (preferences) {
  //     setFormData({
  //       categories: preferences.categories || [],
  //       frequency: preferences.frequency || "daily",
  //       notificationChannels: preferences.notificationChannels || [],
  //     });
  //     setEmail(preferences.email || ''); 
  //   }
  // }, [preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    const updatedFields = [];

    if (formData.frequency !== preferences.frequency) {
      updatedFields.push(`Frequency changed to ${formData.frequency}`);
    }

    if (JSON.stringify(formData.categories) !== JSON.stringify(preferences.categories)) {
      updatedFields.push('Categories updated');
    }

    if (updatedFields.length > 0) {
      const message = updatedFields.join(', ');
      console.log('Calling addNotification with message:', message);
      addNotification(message, 'success');

      // Include email from the email provider section
      if (!email) {
        return alert("Please enter your email to receive notifications.");
      }

      // Trigger a backend notification
      try {
        console.log('Sending notification with payload:', {
          message,
          user: {
            email: email,  // Use the email provided in the email section
            notificationChannels: formData.notificationChannels,
            categories: formData.categories,
          },
        });

 

  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notifications/subscribe`, {
  
    email: email,
    categories: formData.categories,
  });

   
  


        if (response.data.success) {
          console.log('Notification sent successfully:', response.data.message);
          console.log('Setting success message...');
          setSuccessMessage('Preferences updated successfully!');
         
        } else {
          console.error('Error in response:', response.data);
         
        }
      } catch (error) {
        console.error('Error sending notification:', error);
       
      }
    } else {
      console.log('No changes detected, notification not called');
    }
    
  };



  // const handleEmailSubmit = (e) => {
  //   e.preventDefault();
  
  //   if (!email) {
  //     return alert("Please enter a valid email.");
  //   }
  
  //   // Save the email to the preferences
  //   updatePreferences({ ...preferences, email });
  
  //   alert('Email connected successfully!');
  // };

  // useEffect(() => {
  //   if (successMessage) {
  //     const timer = setTimeout(() => setSuccessMessage(''), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [successMessage]);
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold">Select Categories</h3>
        <div className="flex flex-wrap gap-4">
          {["Sports", "Technology", "Business", "Entertainment"].map(
            (category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={formData.categories.includes(category)}
                  onChange={handleChange}
                />
                <span>{category}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Frequency */}
      <div>
        <h3 className="text-lg font-semibold">Notification Frequency</h3>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Notification Channels */}
      <div>
        <h3 className="text-lg font-semibold">Select Notification Channels</h3>
        <div className="flex flex-wrap gap-4">
          {["email", "sms", "push"].map((channel) => (
            <label key={channel} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notificationChannels"
                value={channel}
                checked={formData.notificationChannels.includes(channel)}
                onChange={handleChange}
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Email Provider Section */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Email Provider</h2>
  <div className="bg-white p-6 shadow-lg rounded-lg">
    <p className="text-lg mb-4">
      Enter your email address to receive notifications.
    </p>
    {/* <form onSubmit={handleEmailSubmit}> */}
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          className="p-3 border rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        
{/*       
    </form>  */}
   
  </div>
</section>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Save Preferences
      </button>

       {/* Success Message */}
  {successMessage && (
    <p style={{ color: 'green', background: '#d4f4dd', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
      {successMessage}
    </p>
  )}

    </form>

  );
};

export default AlertSettingsForm;






