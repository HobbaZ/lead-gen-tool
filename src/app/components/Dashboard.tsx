"use client";

import { auth } from "../lib/firebase";
export default function Dashboard() {
  const user = auth.currentUser;
  if (user !== null) {
    return (
      <>
        <h2 className="text-xl font-semibold text-center">Dashboard</h2>
        <p>Hello, {user.displayName}</p>
      </>
    );
  }
}
