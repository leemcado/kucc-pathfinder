"use client";

import { CAREER } from "@/app/constant";
import { SITE_URL, asset } from "@/utils/basePath";
import { useCallback } from "react";

export default function Share({ type }: { type: keyof typeof CAREER }) {
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.href = asset(`/result/${type}.png`);
    link.download = `${type}.png`;
    link.click();
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "나에게 맞는 IT 직군은?",
          text: `고려대학교 중앙 컴퓨터 동아리 KUCC에서 나에게 맞는 IT 직군을 찾아보세요.\n\n저는 ${CAREER[type].title} 직군이 제일 적합해요!`,
          url: SITE_URL,
        });
      } catch (error) {
        console.error("공유 실패:", error);
      }
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다. 😢");
    }
  }, []);

  return (
    <div className="flex w-full items-center gap-2 max-[380px]:flex-wrap">
      <button
        className="btn btn-outline btn-primary w-full shrink flex-nowrap whitespace-nowrap"
        onClick={() => downloadImage()}
      >
        <img src={asset("/download.svg")} alt="download" className="size-4" /> 결과
        이미지 다운로드
      </button>
      <button
        className="btn btn-primary w-full shrink flex-nowrap whitespace-nowrap"
        onClick={() => {
          handleShare();
        }}
      >
        <img src={asset("/share.svg")} alt="share" className="size-4" />
        테스트 공유하기
      </button>
    </div>
  );
}
