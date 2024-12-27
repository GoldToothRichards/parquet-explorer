import { withJuno } from "@junobuild/nextjs-plugin";

export default withJuno({
  juno: { container: true },
  nextConfig: {
    distDir: "dist",
    output: "export",
    swcMinify: true,
    compress: true,
    optimizeFonts: true,
  },
});
