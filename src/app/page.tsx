"use client";

import { Auth } from "@/components/auth";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { FileList } from "@/components/list";
import { UploadButton } from "@/components/upload";
import { initSatellite } from "@junobuild/core-peer";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
          <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24">
            Parquet Explorer
          </h1>
          <h2 className="text-white text-2xl font-semibold mt-6 mb-4">
            A browser-based SQL editor for the blockchain
          </h2>
          <ul className="text-white list-disc list-inside space-y-2 mb-8 md:max-w-lg">
            <li>
              Parquet files stored on-chain using{" "}
              <a
                href="https://juno.build/docs/build/storage"
                rel="noopener noreferrer"
                target="_blank"
                className="underline"
              >
                Juno Storage
              </a>
            </li>
            <li>
              Client-side query processing via{" "}
              <a
                href="https://duckdb.org/docs/api/wasm/overview"
                rel="noopener noreferrer"
                target="_blank"
                className="underline"
              >
                DuckDB WASM
              </a>
            </li>
            <li>
              Fully{" "}
              <a
                href="https://github.com/GoldToothRichards/parquet-explorer"
                rel="noopener noreferrer"
                target="_blank"
                className="underline"
              >
                open-source
              </a>{" "}
            </li>
          </ul>

          <Auth>
            <FileList refreshTrigger={refreshTrigger} />
            <UploadButton onUploadComplete={handleUploadComplete} />
          </Auth>
        </main>

        <Footer />
        <Background />
      </div>
    </>
  );
}
