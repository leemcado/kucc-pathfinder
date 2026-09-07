import { asset } from "@/utils/basePath";
import cc from "classcat";
import Image from "next/image";

export default function Process({
  step,
  total,
  back,
}: {
  step: number;
  total: number;
  back: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <div className="relative h-2 w-full rounded-full bg-base-200">
        <div
          className="absolute left-0 top-0 flex h-full items-center justify-end rounded-full bg-primary transition-[width] duration-300"
          style={{
            width: `${(step / total) * 100}%`,
          }}
        >
          <div className="relative size-6 translate-x-1/2">
            <Image src={asset("/mascot.png")} alt="Progress mascot" fill />
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-[1fr_60px_1fr] items-center justify-center gap-4">
        <button
          className={cc([
            "btn btn-ghost justify-self-start",
            step === 0 && "invisible",
          ])}
          onClick={back}
        >
          <img src={asset("/back.svg")} alt="Back" className="size-4" />
        </button>
        <div className="shrink-0 whitespace-nowrap text-xl font-bold text-primary">
          {step + 1} / {total}
        </div>
      </div>
    </div>
  );
}
