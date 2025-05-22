"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { emailRegex } from "./EmailRegex";
import useAuth from "../api/useAuth";

export default function GetDownload({}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { user, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);

    try {
      const downloadUrl = ""; //change to dynamic link when accessing database

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          email,
          link: downloadUrl,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      console.log("Email Sent", result);
      setEmailSent(true);
      setInfoMessage("Email sent successfully!");

      setTimeout(() => {
        setEmailSent(false);
        setInfoMessage("");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Email failed: ", error.message);
        setInfoMessage("Email failed to send.");
        setEmailSent(false);
      }

      setTimeout(() => {
        setInfoMessage("");
      }, 3000);
    } finally {
      setSendingEmail(false);
      setSent(true);
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : !user ? (
        <p className="text-center">You must be logged in to upload files.</p>
      ) : (
        <>
          <h1 className="text-2xl mb-4">Get your free guide</h1>
          {sent ? (
            <p className="text-green-600">Check your inbox! 🎉</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-96 mx-auto p-4 rounded-lg shadow space-y-4"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
              />

              <div className="min-h-[1.5rem]">
                {email != "" && email.length > 0 && !email.match(emailRegex) ? (
                  <p className="text-center text-red-500 text-sm p-0 m-0">
                    Needs to be a valid email
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={!email.match(emailRegex)}
                className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition disabled:bg-gray-600"
              >
                Get It
                {sendingEmail ? (
                  "Sending ..."
                ) : emailSent ? (
                  <>Email Sent</>
                ) : (
                  <>Email Failed</>
                )}
              </button>
            </form>
          )}
          {infoMessage && <div className="text-center pt-2">{infoMessage}</div>}
        </>
      )}
    </>
  );
}
