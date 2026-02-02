import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TemplateProvider } from './context/TemplateContext';
import ProtectedRoute from './components/ProtectedRoute';
import CardCreatorPage from './pages/CardCreatorPage';
import ManagerPage from './pages/ManagerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TemplateProvider>
          <Routes>
            <Route path="/" element={<CardCreatorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/manager"
              element={
                <ProtectedRoute>
                  <ManagerPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </TemplateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
