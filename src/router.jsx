import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePages'

import DashboardPage from './pages/DashboardPage';

import SettingsPage from './Pages/SettingsPage';

import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'

import NotFoundPage from './pages/NotFoundPage';
import NotificationPage from './pages/NotificationPage';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
   
      <Route path="*" element={<NotFoundPage />} /> {/* Fallback route for unmatched URLs */}
    </Routes>
  );
};

export default RouterComponent;
