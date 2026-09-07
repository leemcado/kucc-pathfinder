"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { asset } from "@/utils/basePath";
import { CAREER } from "../constant";

export default function MainImage({
  speed = 1,
  isLoaded,
  setIsLoaded,
}: {
  speed?: number;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}) {
  const items = useMemo(
    () =>
      Object.values(CAREER)
        .sort(() => Math.random() - 0.5)
        .map((career) => asset(career.image)),
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const preload = (src: string): Promise<void> =>
      new Promise<void>((resolve) => {
        const img = new Image();
        // 실패해도 resolve한다. 이미지 하나 때문에 화면이 멈추면 안 된다.
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    // 첫 장만 기다렸다가 바로 보여주고, 나머지는 배경에서 받는다.
    preload(items[0]).then(() => {
      if (!cancelled) setIsLoaded(true);
    });
    items.slice(1).forEach(preload);

    return () => {
      cancelled = true;
    };
  }, [items, setIsLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    }, 1500 / speed);

    return () => clearInterval(interval);
  }, [isLoaded, items.length, speed]);

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="text-lg font-semibold">잠시만 기다려주세요</div>
        <div className="loading loading-dots text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center gap-4 overflow-visible">
      <AnimatePresence>
        <motion.div
          key={selectedIndex}
          initial={{
            rotate: selectedIndex % 2 === 0 ? -180 : 180,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{
            rotate: selectedIndex % 2 === 0 ? 180 : -180,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute h-full w-full rounded-lg"
        >
          <img
            src={items[selectedIndex]}
            alt="IT 직군 이미지"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
