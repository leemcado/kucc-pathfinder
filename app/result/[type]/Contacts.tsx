import { asset } from "@/utils/basePath";
import Image from "next/image";
import Link from "next/link";

const CONTACTS = [
  {
    type: "KUCC Website",
    name: "KUCC 홈페이지",
    image: asset("/mascot.png"),
    href: "https://kucc.co.kr/",
  },
  {
    type: "Instagram",
    name: "KUCC 공식 인스타그램",
    image: asset("/logos/instagram.png"),
    href: "https://www.instagram.com/kucc.co.kr/",
  },
];

export default function Contacts() {
  return (
    <div className="flex w-full flex-col items-center gap-2 pb-2">
      <div className="text-sm font-bold">
        KUCC가 궁금하시다면 여기서 확인하세요! 👇
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2">
        {CONTACTS.map((contact) => (
          <Link
            href={contact.href}
            key={contact.type}
            target="_blank"
            className="btn btn-sm"
          >
            <div className="relative size-4">
              <Image src={contact.image} fill alt={contact.name} />
            </div>
            <p className="text-sm font-bold">{contact.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
