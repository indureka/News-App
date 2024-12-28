import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext.jsx";
import AlertSettingsForm from "../components/AlertSettingsForm.jsx";



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

 
  useEffect(() => {
    // Perform any async initialization or loading when the component mounts
    setLoading(false);
  }, [setLoading]);

 


  

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

    </div>
  );
};

export default DashboardPage;







