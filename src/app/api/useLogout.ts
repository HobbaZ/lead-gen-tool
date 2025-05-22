import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export default function useLogout() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      setMessage(`Logging out, ${user?.displayName || "User"}`);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          `❌ An error occurred when trying to logout: ${error.message}`
        );
      }
    }
  };

  return { logout, message };
}
