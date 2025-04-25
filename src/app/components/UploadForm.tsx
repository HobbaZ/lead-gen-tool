"use client";

import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const storageRef = ref(storage, `leadMagnets/${uuid()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setLink(url);
  };

  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Upload your lead magnet</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Upload
      </button>
      {link && (
        <p className="mt-4 text-green-600">
          Upload successful! Link: <a href={link}>{link}</a>
        </p>
      )}
    </main>
  );
}
