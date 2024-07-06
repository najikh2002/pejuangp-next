import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BlogCard from "@/components/blog-card";
import { NotionService } from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const notionService = new NotionService();
  const { posts, totalPages, currentPage } =
    await notionService.getPublishedBlogPosts(page, 5);

  return {
    props: {
      posts,
      totalPages,
      currentPage,
    },
  };
};

export default function Blog({
  posts,
  totalPages,
  currentPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="pb-6 pt-6">
          <h1 className="md:hidden text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Posts
          </h1>
        </div>

        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
              Lists Tags
            </div>
          </div>
          <div>
            <ul>
              {posts.map((post: BlogPost) => (
                <li className="py-5" key={post.id}>
                  <BlogCard {...post} />
                </li>
              ))}
            </ul>
            <div className="items-center space-y-2 pb-8 pt-6 md:space-y-5">
              <nav className="flex justify-between">
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className={`${
                    currentPage - 1 !== 0 && currentPage <= totalPages
                      ? ""
                      : "pointer-events-none text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Prev
                </Link>
                <div>
                  {currentPage} of {totalPages}
                </div>
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className={`${
                    currentPage < totalPages
                      ? ""
                      : "pointer-events-none text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
