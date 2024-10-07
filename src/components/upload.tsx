import React, { useState } from "react";
import { Button } from "@/components/button";
import { Backdrop } from "@/components/backdrop";
import { FileSelector } from "@/components/select";
import { CloseButton } from "@/components/close";

export const UploadButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-8">
        <Button onClick={() => setShowModal(true)}>Upload Parquet File</Button>

        {showModal && (
          <>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade overflow-auto"
              role="dialog"
            >
              <div className="relative w-full max-w-4xl mx-auto bg-lavender-blue-900 p-6 rounded-lg shadow-lg text-lavender-blue-100">
                <h2 className="text-2xl font-bold mb-4">Upload Parquet File</h2>
                <CloseButton onClick={() => setShowModal(false)} />
                <div className="mb-4">
                  <FileSelector />
                </div>
              </div>
            </div>
            <Backdrop />
          </>
        )}
      </div>
    </>
  );
};
