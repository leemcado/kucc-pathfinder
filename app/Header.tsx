import { asset } from "@/utils/basePath";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 z-10 flex h-16 w-full max-w-md items-center justify-between bg-base-100 px-6">
      <Link href="/" className="font-cute font-bold">
        나에게 맞는 IT 직군은?
      </Link>
      <div className="relative size-8 shrink-0">
        <Image src={asset("/mascot.webp")} alt="KUCC 마스코트" quality={100} fill />
      </div>
    </header>
  );
}
