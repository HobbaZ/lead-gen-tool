"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";
import useAuth from "../api/useAuth";

export default function UploadPage() {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans">
        <Header />

        <main className="row-start-2 flex items-center justify-center">
          {loading && <p className="text-center">Loading...</p>}
          {user !== null ? (
            <>
              <UploadForm />
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
