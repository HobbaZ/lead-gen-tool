"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";

export default function UploadPage() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans">
        <Header />

        <main className="flex flex-col items-center justify-center text-center row-start-2 px-4 gap-6">
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <UploadForm />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
