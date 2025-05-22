"use client";

import useAuth from "../api/useAuth";
export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center">
        You must be logged in to update your profile.
      </p>
    );
  }

  if (user !== null) {
    return (
      <>
        <h2 className="text-xl font-semibold text-center">User Profile</h2>
        <p>Hello, {user ? user.displayName : "User"}</p>
        <p>{user.email}</p>
        <p>{user.emailVerified}</p>
      </>
    );
  }
}
