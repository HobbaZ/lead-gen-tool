"use client";

import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { useState } from "react";

export default function UploadForm() {
  const [uploadFile, setUploadFile] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const maxSize = 5 * 1024 * 1024;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!uploadFile || uploadFile.length === 0) return;

    try {
      for (const file of uploadFile) {
        if (file.size > maxSize) {
          console.warn(`Skipped: ${file.name} (too large)`);
          continue;
        }
        const storageRef = ref(storage, `leadMagnets/${uuid()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log(`Uploaded: ${file.name}, URL: ${url}`);
      }

      setMessage("All files uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload files.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="w-full max-w-96 mx-auto p-4 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Upload your lead</h2>

      <label className="custom-file-upload w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition text-center">
        <input
          name="leads[]"
          type="file"
          multiple
          onChange={(e) =>
            setUploadFile(e.target.files ? Array.from(e.target.files) : null)
          }
        />
        <i className="fa-solid fa-cloud-arrow-up"></i> Choose File/s
      </label>

      <p className="text-center">
        <sub>Maximum file size is 5MB</sub>
      </p>

      {uploadFile?.length > 0 ? (
        <ul>
          {uploadFile?.map((file, index) => (
            <li key={index}>
              {file.size < maxSize ? (
                <>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </>
              ) : (
                <>{file.name} - file is over the maximum file size limit</>
              )}

              <button
                type="button"
                onClick={() => {
                  setUploadFile(
                    (prev) => prev?.filter((_, i) => i !== index) || []
                  );
                }}
                className="pl-3 hover:underline"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No files have been selected</p>
      )}

      <button
        type="submit"
        disabled={loading || !uploadFile || uploadFile?.length === 0}
        className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition disabled:bg-gray-600"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
}
