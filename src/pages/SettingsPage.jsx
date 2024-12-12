import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import Loader from "../components/Loader";
import EmailProviderSelection from "../components/EmailProviderSelection";

const SettingsPage = () => {
  const { preferences, updatePreferences, loading, setLoading } = useNotificationContext();

  // State for user account details
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [emailNotifications, setEmailNotifications] = useState(
    preferences.notificationChannels.includes("email")
  );

  useEffect(() => {
    // Simulate fetching user info (replace with API call if needed)
    setUserInfo({ name: "John Doe", email: "john.doe@example.com" });
    setLoading(false); // Stop the loader after fetching data
  }, [setLoading]);

  // Handle editing user info
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUserInfo = () => {
    setIsEditing(false);
    // Simulate saving the user info (replace with API call if needed)
    console.log("User info saved:", userInfo);
  };

  // Handle changes in email notification preferences
  const handleEmailNotificationChange = (e) => {
    setEmailNotifications(e.target.checked);
    const updatedPreferences = {
      ...preferences,
      notificationChannels: e.target.checked
        ? [...preferences.notificationChannels, "email"]
        : preferences.notificationChannels.filter((channel) => channel !== "email"),
    };
    updatePreferences(updatedPreferences);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Account Settings</h1>
        <p className="text-center text-lg mt-2">Manage your account and notification settings</p>
      </header>

      {/* User Info Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleSaveUserInfo}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg">
                <strong>Name:</strong> {userInfo.name}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {userInfo.email}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit Info
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Email Notification Settings Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Email Notification Setup</h2>
        <p className="text-gray-600 mb-4">
    Receive news updates directly in your inbox. Connect your email to get started.
  </p>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={handleEmailNotificationChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <label className="text-lg">Receive email notifications for news updates</label>
          </div>
        </div>
      </section>

      {/* Integration with External Services */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Integration with External Services</h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <EmailProviderSelection />
        </div>
      </section>

      {loading && <Loader />}
    </div>
  );
};

export default SettingsPage;






