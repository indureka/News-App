import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/NotificationContext";


const SettingsPage = () => {

  const { addNotification } = useNotificationContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  // Fetch user details on page load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
        // const response = await axios.get("http://localhost:5000/api/user", {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Redirect to login if unauthorized
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchUserDetails();
  }, [navigate]);

  // Handle update submission
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const updates = {};

      if (updatedName) updates.name = updatedName;
      if (updatedPassword) updates.password = updatedPassword;

      // const response = await axios.put("http://localhost:5000/api/auth/update", updates, {

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.message === "User details updated successfully") {
      // alert(response.data.message); // Notify user of success
      setSuccessMessage('Preferences updated successfully!');
      setUserDetails({
        ...userDetails,
        name: response.data.user.name,
      });
      setIsEditing(false);

     
      addNotification("Account details updated", "success");
    } else {
      console.error('Error in response:', response.data);
    }
    
    } catch (error) {
      console.error("Error updating user details:", error);
      // alert("Failed to update user details.");
    }
  };

  return (



    <div className="settings-page container mx-auto mt-10 px-4 max-w-2xl">
  <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Account Settings</h1>
  <div className="settings-container bg-white shadow-lg rounded-lg p-6 space-y-6">

    {/* Email */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Email:
      </label>
      <p className="text-gray-600">{userDetails.email}</p>
    </div>

    {/* Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Name:
      </label>
      {isEditing ? (
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder={userDetails.name}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-gray-600">{userDetails.name}</p>
      )}
    </div>

    {/* Password */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Password:
      </label>
      {isEditing ? (
        <input
          type="password"
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-gray-600">********</p>
      )}
    </div>

    {/* Buttons */}
    <div className="flex justify-end space-x-4">
      {isEditing ? (
        <>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setIsEditing(false); // Reset the editing state
              setUpdatedName(""); // Clear any changes made during editing
              setUpdatedPassword(""); // Clear password changes
            }}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Edit
        </button>
      )}
    </div>
    {successMessage && (
      <div className="mt-4 text-green-600 font-medium text-center">
        {successMessage}
      </div>
    )}
  </div>
  
</div>



  );
};

export default SettingsPage;











// import React, { useState, useEffect } from "react";
// import { useNotificationContext } from "../context/NotificationContext";
// import Loader from "../components/Loader";
// import EmailProviderSelection from "../components/EmailProviderSelection";

// const SettingsPage = () => {
//   const { preferences, updatePreferences, loading, setLoading } = useNotificationContext();

//   // State for user account details
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//   });

//   const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
//   const [emailNotifications, setEmailNotifications] = useState(
//     preferences.notificationChannels.includes("email")
//   );

//   useEffect(() => {
//     // Simulate fetching user info (replace with API call if needed)
//     setUserInfo({ name: "John Doe", email: "john.doe@example.com" });
//     setLoading(false); // Stop the loader after fetching data
//   }, [setLoading]);

//   // Handle editing user info
//   const handleUserInfoChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveUserInfo = () => {
//     setIsEditing(false);
//     // Simulate saving the user info (replace with API call if needed)
//     console.log("User info saved:", userInfo);
//   };

//   // Handle changes in email notification preferences
//   const handleEmailNotificationChange = (e) => {
//     setEmailNotifications(e.target.checked);
//     const updatedPreferences = {
//       ...preferences,
//       notificationChannels: e.target.checked
//         ? [...preferences.notificationChannels, "email"]
//         : preferences.notificationChannels.filter((channel) => channel !== "email"),
//     };
//     updatePreferences(updatedPreferences);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold text-center">Account Settings</h1>
//         <p className="text-center text-lg mt-2">Manage your account and notification settings</p>
//       </header>

//       {/* User Info Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           {isEditing ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-lg font-semibold mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={userInfo.name}
//                   onChange={handleUserInfoChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-semibold mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={userInfo.email}
//                   onChange={handleUserInfoChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <button
//                 onClick={handleSaveUserInfo}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <div>
//               <p className="text-lg">
//                 <strong>Name:</strong> {userInfo.name}
//               </p>
//               <p className="text-lg">
//                 <strong>Email:</strong> {userInfo.email}
//               </p>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Edit Info
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Email Notification Settings Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Email Notification Setup</h2>
//         <p className="text-gray-600 mb-4">
//     Receive news updates directly in your inbox. Connect your email to get started.
//   </p>
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={emailNotifications}
//               onChange={handleEmailNotificationChange}
//               className="form-checkbox h-5 w-5 text-blue-500"
//             />
//             <label className="text-lg">Receive email notifications for news updates</label>
//           </div>
//         </div>
//       </section>

//       {/* Integration with External Services */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Integration with External Services</h2>
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           <EmailProviderSelection />
//         </div>
//       </section>

//       {loading && <Loader />}
//     </div>
//   );
// };

// export default SettingsPage;






