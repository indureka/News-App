import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const AlertSettingsForm = () => {
  const { preferences, updatePreferences, addNotification, setPreferences } = useNotificationContext();
  const {user, setUser} = useAuthContext();

  const [formData, setFormData] = useState({
    categories: preferences?.categories || [],
    frequency: preferences?.frequency || "",
    notificationChannels: preferences?.notificationChannels || [],
  });

  const [email, setEmail] = useState(preferences?.email || ''); // Initialize email state

  const [successMessage, setSuccessMessage] = useState(''); 

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      if (name === "notificationChannels") {
        // Handle notificationChannels as an object
        return {
          ...prevData,
          notificationChannels: {
            ...prevData.notificationChannels,
            [value]: checked, // Update the specific notification channel
          },
        };
      } else if (type === "checkbox") {
        // Handle arrays like categories
        return {
          ...prevData,
          [name]: checked
            ? [...prevData[name], value] // Add the item if checked
            : prevData[name].filter((item) => item !== value), // Remove the item if unchecked
        };
      } else {
        // Handle other types of inputs
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    const updatedFields = [];

    if (formData.frequency !== preferences.frequency) {
      updatedFields.push(`Frequency changed to ${formData.frequency}`);
    }

    if (JSON.stringify(formData.categories) !== JSON.stringify(preferences.categories)) {
      updatedFields.push(`Categories updated to ${formData.categories}`);
    }

    if (updatedFields.length > 0) {
      const message = updatedFields.join(', ');
      console.log('Calling addNotification with message:', message);
      addNotification(message, 'success');

    

      if (!formData.notificationChannels.email) {
        return alert("Please check the email checkbox to receive notifications.");
      }

      // Trigger a backend notification
      try {
        console.log('Sending notification with payload:', {
          message,
          user: {
            // email: email,  // Use the email provided in the email section
            notificationChannels: formData.notificationChannels,
            categories: formData.categories,
          },
          
        });

 



    // const response = await axios.put(`http://localhost:5000/api/preferences/${user.id}`, 

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/preferences/${user.id}`,
     
  {
    notificationChannels: formData.notificationChannels,
    categories: formData.categories,
    frequency: formData.frequency,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Attach token in the header
    }
  }

);

   
if (response.data.message === "Preferences updated successfully.") {
  setSuccessMessage('Preferences updated successfully!');
  setPreferences(response.data.preference); // Update state with new preferences
} else {
  console.error('Error in response:', response.data);
}


        // }
      } catch (error) {
        console.error('Error sending notification:', error);
       
      }
    } else {
      console.log('No changes detected, notification not called');
    }
    
  };



  

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
  <h3 className="text-lg font-semibold">Enable Email Notifications</h3>
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="notificationChannels"
      
      checked={formData.notificationChannels.email} // Check state for "email"
      onChange={handleChange} // Update state on toggle
    />
    <span>Email</span>
  </label>
</div>


   

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






