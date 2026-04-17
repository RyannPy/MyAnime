import Dashboard from "./pages/Dashboard";
import AnimeList from "./pages/AnimeList";
import Auth from "./pages/Auth";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import "./App.css";

// UTILITY
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protection/ProtectedRoute";
import ToastContainer from "./components/notification/ToastContainer";
import { ToastContext } from "./contexts/ToastContexts";
import { useState } from "react";

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <BrowserRouter>
      <ToastContext.Provider value={{ addToast }}>
        {/* semua routes */}
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<Auth />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animes"
            element={
              <ProtectedRoute>
                <AnimeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </ToastContext.Provider>
    </BrowserRouter>
  );
}

export default App;
