import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { NotionService } from "../../services/notion-service";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import ProfileCard from "@/components/profile-card";

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={post.description}
        />
        <meta name={"og:title"} title={"og:title"} content={post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.description}
        />
        <meta name={"og:image"} title={"og:image"} content={post.cover} />
      </Head>

      <div className="min-h-screen">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div className="flex items-center justify-center">
            <article>
              <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700 px-3 md:px-0">
                <header className="pt-6 xl:pb-6 border-b border-gray-400">
                  <div className="space-y-1 text-center">
                    <dl className="space-y-10">
                      <div>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 px-0">
                          {post.date}
                        </dd>
                      </div>
                    </dl>
                    <div>
                      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                        {post.title}
                      </h1>
                    </div>
                    <ProfileCard className="flex xl:hidden" />
                  </div>
                </header>
              </div>
              <div className="flex items-center xl:items-start justify-between py-6 md:py-10 mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 dark:text-white">
                <div className="hidden xl:flex flex-col justify-start items-start w-full">
                  <ProfileCard className="hidden xl:flex border-b-[1px] border-gray-400 pr-3 pt-5 pb-10 xl:w-[90%]" />
                </div>
                <div className="prose prose-xl md:p-0 max-w-xl xl:max-w-[75%]">
                  <MarkdownRenderer>{markdown}</MarkdownRenderer>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw "";
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.map((post) => {
    return `/blog/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
