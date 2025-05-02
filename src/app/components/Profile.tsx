"use client";

import { auth } from "../lib/firebase";
export default function Profile() {
  const user = auth.currentUser;
  if (user !== null) {
    return (
      <>
        <h2 className="text-xl font-semibold text-center">User Profile</h2>
        <p>Hello, {user.displayName}</p>
        <p>{user.email}</p>
        <p>{user.emailVerified}</p>
      </>
    );
  }
}
