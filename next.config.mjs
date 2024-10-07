import { withJuno } from "@junobuild/nextjs-plugin";

export default withJuno({
  juno: { container: true },
  nextConfig: {
    distDir: "dist",
  },
});
