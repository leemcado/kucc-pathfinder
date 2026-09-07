import type { NextConfig } from "next";

/**
 * GitHub Pages는 https://<user>.github.io/<repo>/ 하위 경로로 서비스되므로
 * basePath / assetPrefix를 빌드 시점에 주입한다. (로컬 dev에서는 빈 문자열)
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // GitHub Pages는 정적 호스팅이라 next/image 최적화 서버를 쓸 수 없다.
    unoptimized: true,
  },
};

export default nextConfig;
