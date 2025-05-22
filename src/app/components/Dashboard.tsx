"use client";

import useAuth from "../api/useAuth";
export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-center">Dashboard</h2>
      <p className="text-center">Hello, {user?.displayName || "User"}!</p>
    </>
  );
}
