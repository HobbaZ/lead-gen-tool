"use client";

import Profile from "../components/Profile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth } from "../lib/firebase";

export default function ProfilePage() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans column-start-2">
        <Header />

        <main className="flex flex-col items-center justify-center flex-column">
          {auth.currentUser !== null ? (
            <>
              <Profile />
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
