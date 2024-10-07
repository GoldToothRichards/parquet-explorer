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
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
          <h1 className="dark:text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24">
            Parquet Explorer
          </h1>
          <p className="dark:text-white py-4 md:max-w-lg">
            A browser-based SQL editor for the blockchain. Parquet files are stored on-chain using{" "}
            <a
              href="https://juno.build/docs/build/storage"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Juno Storage
            </a>{" "}
            and queries are processed on the client side via{" "}
            <a
              href="https://duckdb.org/docs/api/wasm/overview"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              DuckDB WASM
            </a>.
            
            This project is completely{" "}
            <a
              href="https://github.com/GoldToothRichards/parquet-explorer"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              open source
            </a>.
          </p>

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
