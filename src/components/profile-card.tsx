import { BlogPost } from "@/types/schema";
import Image from "next/image";
import Link from "next/link";

export default function ProfileCard({
  className,
  post,
}: {
  className?: string;
  post: BlogPost;
}) {
  return (
    <dl className={`justify-center items-center gap-2 py-2 ${className}`}>
      <Image
        className="w-10 h-10 rounded-full border-[1px] border-gray-400"
        src={`${post.icon?.url}`}
        alt="avatar"
        width={40}
        height={40}
      />
      <div className="whitespace-nowrap text-sm font-medium leading-5 py-1">
        <dt className="sr-only">Authors</dt>
        <dd className="text-gray-900 dark:text-gray-100">{post.author}</dd>
        <dt className="sr-only">Instagram</dt>
        <dd className="flex">
          <Link
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            href={`https://www.instagram.com/${post.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{post.instagram}
          </Link>
        </dd>
      </div>
    </dl>
  );
}
