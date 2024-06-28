import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NotionService } from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import TitlePage from "@/components/title-page";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = "Pejuang Pemrograman";
  const description = "Belajar Koding Lengkap Bahasa Indonesia.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={description}
        />
      </Head>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <main className="mb-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <TitlePage title="Latest" description={description} />
            <ul>
              {posts.map((post: BlogPost) => (
                <li key={post.id} className="py-12 border-t-[1px] border-gray">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          {post.date}
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
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
                              {post.tags.map((tag) => (
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
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                            {post.description}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
              <div className="flex justify-center items-center">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  All Posts &rarr;
                </Link>
              </div>
            </ul>
          </div>
        </main>
      </section>
    </>
  );
}
