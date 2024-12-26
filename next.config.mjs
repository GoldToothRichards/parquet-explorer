import { withJuno } from "@junobuild/nextjs-plugin";

export default withJuno({
  juno: { container: true },
  nextConfig: {
    distDir: "dist",
    swcMinify: true,
    compress: true,
    optimizeFonts: true,
    i18n: {
      locales: ["en"],
      defaultLocale: "en"
    }
  },
});
