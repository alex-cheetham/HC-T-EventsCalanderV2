import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Incorrect role
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="opacity-80">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
