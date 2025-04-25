import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 sm:p-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans">
      <Header />

      <main className="flex flex-col items-center justify-center text-center row-start-2 px-4 gap-6">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Simple Lead Magnet Delivery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Upload a freebie. Share the link. We’ll email it to subscribers—no
          fuss, no bloat.
        </p>
        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-medium transition"
        >
          Get Started Free
        </Link>
      </main>

      <Footer />
    </div>
  );
}
