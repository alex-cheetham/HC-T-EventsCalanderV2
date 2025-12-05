import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import NavBar from "./components/NavBar";
import AdminNavBar from "./components/AdminNavBar";
import Footer from "./components/Footer";

import PublicEvents from "./pages/PublicEvents";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import SettingsPage from "./pages/SettingsPage";
import UserManagement from "./pages/UserManagement";
import EventPage from "./pages/EventPage";
import CalendarView from "./pages/CalendarView";

function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <NavBar />}
      {isAdmin && <AdminNavBar />}

      {children}

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<PublicEvents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/calendar" element={<CalendarView />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["OWNER", "DEVELOPER", "EVENT_MANAGER"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/create"
              element={
                <PrivateRoute roles={["OWNER", "DEVELOPER", "EVENT_MANAGER"]}>
                  <CreateEvent />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/edit/:id"
              element={
                <PrivateRoute roles={["OWNER", "DEVELOPER", "EVENT_MANAGER"]}>
                  <EditEvent />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <PrivateRoute roles={["OWNER", "DEVELOPER"]}>
                  <SettingsPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <PrivateRoute roles={["OWNER"]}>
                  <UserManagement />
                </PrivateRoute>
              }
            />

          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
