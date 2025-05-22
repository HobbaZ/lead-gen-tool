"use client";

import { useState, useEffect } from "react";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import useAuth from "../api/useAuth";

export default function UploadForm() {
  const [uploadFile, setUploadFile] = useState<File[] | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileMessage, setFileMessage] = useShowFileMessage(2500);
  const maxSize = 5 * 1024 * 1024;
  const fileLimit = 5;
  const { user, loading } = useAuth();

  function useShowFileMessage(
    duration = 2500
  ): [string, (msg: string) => void] {
    const [message, setMessage] = useState("");

    const showMessage = (msg: string) => {
      setMessage(msg);
    };

    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage("");
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [message, duration]);

    return [message, showMessage];
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setFileLoading(true);

    if (!uploadFile || uploadFile.length === 0) {
      setMessage("Please select files to upload.");
      setFileLoading(false);
      return;
    }

    if (uploadFile.length > fileLimit) {
      setFileMessage("❌ You can only upload up to 5 files.");
      setUploadFile(uploadFile.slice(0, fileLimit)); // limit the files once
      setFileLoading(false);
      return;
    }

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

      setMessage("✅ All valid files uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to upload files.");
    } finally {
      setFileLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : !user ? (
        <p className="text-center">You must be logged in to upload files.</p>
      ) : (
        <form
          onSubmit={handleUpload}
          className="w-full max-w-96 mx-auto p-4 rounded-lg shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">
            Upload your lead
          </h2>

          <label className="custom-file-upload w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition text-center cursor-pointer">
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (!e.target.files) return;
                const newFiles = Array.from(e.target.files);

                setUploadFile((prev) => {
                  const existingFiles = prev || [];
                  const combinedFiles = [...existingFiles, ...newFiles];

                  const fileMap = new Map();
                  const uniqueFiles: File[] = [];
                  let hasDuplicate = false;

                  for (const file of combinedFiles) {
                    const key = `${file.name}-${file.size}`;
                    if (!fileMap.has(key)) {
                      fileMap.set(key, true);
                      uniqueFiles.push(file);
                    } else {
                      hasDuplicate = true;
                      setFileMessage(
                        `❌ Duplicate file ${file.name} not added.`
                      );
                    }
                  }

                  if (uniqueFiles.length > fileLimit) {
                    setFileMessage("❌ You can only upload up to 5 files.");
                    return uniqueFiles.slice(0, fileLimit);
                  }

                  if (!hasDuplicate && uniqueFiles.length <= fileLimit) {
                    setFileMessage("");
                  }

                  return uniqueFiles;
                });

                e.target.value = "";
              }}
            />
            <i className="fa-solid fa-cloud-arrow-up"></i> Choose File/s
          </label>

          <p className="text-center">
            <sub>Maximum file size is 5MB. Up to 5 files allowed.</sub>
          </p>

          {uploadFile && uploadFile.length > 0 ? (
            <>
              <ul className="text-sm">
                {uploadFile.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {file.name} –{" "}
                      {file.size > maxSize ? (
                        <span className="text-red-500">
                          too large ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      ) : (
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setUploadFile((prev) => {
                          if (!prev) return [];

                          const updated = prev.filter((_, i) => i !== index);

                          if (updated.length <= fileLimit) {
                            setFileMessage("");
                          }

                          return updated;
                        })
                      }
                      className="ml-2 text-red-600 hover:underline"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>

              <p className="text-center"> {fileMessage}</p>
            </>
          ) : (
            <p className="text-center">No files selected.</p>
          )}

          <button
            type="submit"
            disabled={
              fileLoading || loading || !uploadFile || uploadFile.length === 0
            }
            className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition disabled:bg-gray-600"
          >
            {fileLoading ? "Uploading..." : "Upload"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}
        </form>
      )}
    </>
  );
}
