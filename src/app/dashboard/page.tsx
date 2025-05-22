"use client";

import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../api/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans column-start-2">
        <Header />

        <main className="flex flex-col items-center justify-center flex-column">
          {user !== null ? (
            <>
              <Dashboard />
            </>
          ) : (
            <p>You need to be logged in to view this page</p>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
