import Share from "@/app/components/Share";
import { CAREER } from "@/app/constant";
import { activityToKorean } from "@/utils/toKorean";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { asset } from "@/utils/basePath";
import Contacts from "./Contacts";

type Props = {
  params: Promise<{ type: keyof typeof CAREER }>;
};

// 정적 export(output: "export")에서는 모든 동적 경로를 빌드 시점에 알아야 한다.
export const dynamicParams = false;

export function generateStaticParams(): { type: string }[] {
  return Object.keys(CAREER).map((type) => ({ type }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const type = (await params).type;

  const result = CAREER[type];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: result.title,
    openGraph: {
      images: [`/result/${type}.png`, ...previousImages],
    },
  };
}

export default async function Result({
  params,
}: {
  params: Promise<{ type: keyof typeof CAREER }>;
}) {
  const { type } = await params;
  const result = CAREER[type];

  if (!result) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-between gap-4 pt-12">
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="flex flex-col items-center gap-1">
          {result.emoji}
          <p className="text-center text-sm font-bold text-primary">
            {result.summary}
          </p>
          <h1 className="font-cute text-3xl font-black">{result.title}</h1>
        </div>

        <div className="w-full max-w-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(result.image)}
            alt={result.title}
            className="object-contain"
          />
        </div>

        <p className="break-keep rounded-lg bg-base-200 px-4 py-2 text-center leading-relaxed">
          <BoldText text={result.description} />
        </p>

        <Share type={type} />

        <div className="flex w-full flex-col items-center">
          <div className="divider font-bold text-primary">
            KUCC에서 진행된 {result.title} 관련 활동
          </div>

          <ul className="flex flex-col gap-2 break-keep px-2">
            {result.activity.map((activity, index) => (
              <li key={index} className="flex flex-col gap-1">
                <div className="flex items-center justify-start gap-1 text-center text-sm font-bold">
                  <div className="badge badge-primary badge-outline badge-sm">
                    {activity.semester} {activityToKorean(activity.type)}
                  </div>
                  {activity.title}
                </div>
                <p className="text-sm">{activity.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Contacts />
    </div>
  );
}

const BoldText = ({ text }: { text: string }): React.ReactNode => {
  const parts = text
    .split(/(\*\*.*?\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <b key={index}>{part.slice(2, -2)}</b>
      ) : (
        part
      ),
    );

  return <span>{parts}</span>;
};
