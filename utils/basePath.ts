/** 빌드 시점에 주입되는 GitHub Pages 하위 경로 (예: "/kucc-pathfinder"). */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** 배포 사이트의 절대 URL (공유 링크, OG 메타데이터용). */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * public/ 자산의 절대 경로에 basePath를 붙인다.
 *
 * next/image와 next/link는 basePath를 자동으로 붙이지만,
 * 순수 <img> 태그나 new Image()에는 직접 붙여야 한다.
 *
 * Args:
 *     path: "/"로 시작하는 public 기준 경로
 *
 * Returns:
 *     basePath가 적용된 경로
 */
export const asset = (path: string): string => `${BASE_PATH}${path}`;
