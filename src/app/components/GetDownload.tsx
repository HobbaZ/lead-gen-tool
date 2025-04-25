"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function GetDownload({}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

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
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl mb-4">Get your free guide</h1>
      {sent ? (
        <p className="text-green-600">Check your inbox! 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
    </main>
  );
}
