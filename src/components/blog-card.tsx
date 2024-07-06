import { BlogPost, Tag } from "@/types/schema";
import Link from "next/link";

export default function BlogCard({ ...post }: BlogPost) {
  return (
    <article className="flex flex-col space-y-2 xl:space-y-0 ">
      <dl>
        <dt className="sr-only">Published On</dt>
        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          {post.date}
        </dd>
      </dl>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={`/blog/${post.slug}`}
              className="text-gray-900 dark:text-gray-100"
            >
              {post.title}
            </Link>
          </h2>
          <div className="flex flex-wrap">
            {post.tags.map((tag: Tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.title}`}
                className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
        {post.description}
      </div>
    </article>
  );
}
