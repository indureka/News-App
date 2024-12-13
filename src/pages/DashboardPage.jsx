import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext.jsx";
import AlertSettingsForm from "../components/AlertSettingsForm.jsx";
import Loader from "../components/Loader.jsx"; // For displaying loading spinner
import NotificationToast from '../components/NotificationToast.jsx'
import EmailProviderSelection from "../components/EmailProviderSelection.jsx";
import NewsAlertForm from "../components/NewsAlertForm.jsx";


const DashboardPage = () => {
  const {
    preferences,
    updatePreferences,
    notifications,
    addNotification,
    loading,
    setLoading,
    emailProviderStatus,
    connectEmailProvider,
  } = useNotificationContext();

  const [submitStatus, setSubmitStatus] = useState(null); // To track form submission status

  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   console.log("Notifications state:", notifications); // Debug log
  // }, [notifications]);

  useEffect(() => {
    // Perform any async initialization or loading when the component mounts
    setLoading(false);
  }, [setLoading]);

 


  

  // const handleEmailSubmit = (e) => {
  //   e.preventDefault();
  
  //   if (!email) {
  //     return alert("Please enter a valid email.");
  //   }
  
  //   // Save the email to the preferences
  //   updatePreferences({ ...preferences, email });
  
  //   alert('Email connected successfully!');
  // };


  // const handlePreferencesSubmit = async (newPreferences) => {
  //   const categoriesMessage = newPreferences.categories.join(", ");
  //   const channelsMessage = newPreferences.notificationChannels.join(", ");
  //   const message = `Preferences updated: Categories - ${categoriesMessage}, Frequency - ${newPreferences.frequency}, Channels - ${channelsMessage}`;
  
  //   addNotification(message, 'success');
  //   updatePreferences(newPreferences);
  
  //   try {

  //     console.log('Payload to backend:', {
  //       message,
  //       user: {
  //         email: newPreferences.email,
  //         phoneNumber: newPreferences.phoneNumber,
  //         deviceToken: newPreferences.deviceToken,
  //         notificationChannels: newPreferences.notificationChannels,
  //       },
  //     });
  //     // Send the preferences update message to the backend
  //     const response = await axios.post('http://localhost:5000/api/notifications/send-notification', {
  //       message,
  //       user: {
  //         email: newPreferences.email,  // Assuming the email is part of newPreferences
  //         phoneNumber: newPreferences.phoneNumber,  // Include the phone number if required
  //         deviceToken: newPreferences.deviceToken,  // Include device token if needed for push
  //         notificationChannels: newPreferences.notificationChannels  // ['email', 'sms', 'push']
  //       }
  //     });
  
  //     if (response.data.success) {
  //       alert('Preferences updated and notification sent!');
  //     }
  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //     alert('Error updating preferences or sending notification.');
  //   }
  // };
  

  



  // const handleConnectEmailProvider = () => {
  //   connectEmailProvider(); // Example method to connect the email provider
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      

      {/* Alert Settings Form */}
      <section id="alert-form" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Manage Notification Preferences
        </h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <AlertSettingsForm
            // preferences={preferences}
            // onSubmit={handlePreferencesSubmit}
          />
          {submitStatus && (
            <div
              className={`mt-4 p-4 rounded-md ${
                submitStatus.success ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>
      </section>

      {/* <NewsAlertForm /> */}

    {/* Notification History Section */}
      {/* <section className="mt-8">
         <h2 className="text-2xl font-semibold mb-4">Notification History</h2>
         <div className="bg-white p-6 shadow-lg rounded-lg">
         {loading ? (
            <Loader /> // Show loader while loading
          ) : notifications.length === 0 ? (
            <p className="text-gray-600">
              No notifications yet. Start by enabling notifications.
            </p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationToast
                  key={notification.id}
                  message={notification.message}
                  type={notification.type}
                  duration={5000}
                />
              ))}
            </div>
          )}
        </div>
      </section>
 */}

    </div>
  );
};

export default DashboardPage;







