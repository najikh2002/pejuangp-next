import TitlePage from "@/components/title-page";
import { NotionService } from "@/services/notion-service";
import { ProjectPost } from "@/types/schema";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const notionService = new NotionService();
  const { posts, totalPages, currentPage, allPosts } =
    await notionService.getProjectPosts(page, 6);

  return {
    props: {
      posts,
      totalPages,
      currentPage,
      allPosts,
    },
  };
};

export default function Project({
  posts,
  totalPages,
  currentPage,
  allPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <TitlePage
        title="Project"
        description="List project Pejuang Pemrograman member :)"
      />
      <ul className="min-h-[75vh] py-6 flex flex-col md:grid md:grid-cols-2 gap-6">
        {allPosts.map((post: ProjectPost) => (
          <Link
            href={`${post.link}`}
            className="transition duration-300 hover:scale-105"
            key={post.id}
            target="_blank"
          >
            <div
              key={post.title}
              className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800"
            >
              <div className="flex-shrink-0">
                <Image
                  className="h-64 w-full object-fit"
                  src={`${post.cover?.url}`}
                  alt={post.title}
                  height={256}
                  width={500}
                />
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 pt-2 pb-6 px-4 flex flex-col justify-between">
                <div className="flex-1">
                  <span className="block mt-2">
                    <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {post.date}
                    </h4>
                  </span>
                  <span className="block mt-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                  </span>
                  <span className="block mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By {post.author}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
}
