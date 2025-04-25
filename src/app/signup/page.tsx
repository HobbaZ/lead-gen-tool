"use client";

import SignupForm from "../components/SignupForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignupPage() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans">
        <Header />

        <main className="row-start-2 flex items-center justify-center">
          <SignupForm />
        </main>
      </div>

      <Footer />
    </>
  );
}
