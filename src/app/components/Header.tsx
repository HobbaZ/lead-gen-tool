import Link from "next/link";
import { auth } from "../lib/firebase";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Lead Tool</span>
      </div>
      <nav className="flex gap-4">
        {auth.currentUser === null ? (
          <>
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-sm hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
            <Link href="/upload" className="text-sm hover:underline">
              Upload
            </Link>
            <Link href="/profile" className="text-sm hover:underline">
              Profile
            </Link>
            <Link href="/logout" className="text-sm hover:underline">
              Logout
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
