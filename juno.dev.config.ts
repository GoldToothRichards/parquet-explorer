import { defineDevConfig } from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    storage: {
      headers: [
        {
          source: "/files/*",
          headers: [
            ["Access-Control-Allow-Origin", "*"],
            ["Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"],
            ["Access-Control-Allow-Headers", "*"],
          ],
        },
      ],
    },
    collections: {
      datastore: [
        {
          collection: "metadata",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true,
        },
      ],
      storage: [
        {
          collection: "files",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true,
        },
      ],
    },
  },
}));
