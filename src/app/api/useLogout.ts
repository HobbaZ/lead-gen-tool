import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const [message, setMessage] = useState<string | null>(null);
  const user = auth.currentUser;
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      setMessage(`Logging out, ${user.displayName}`);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          `❌ An error occured when trying to logout: ${error.message}`
        );
      }
    }
  };

  return { logout, message };
}
