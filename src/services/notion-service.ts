import { formatDateTime } from "@/lib/utils";
import { BlogPost, PostPage, ProjectPost } from "@/types/schema";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getPublishedBlogPosts(
    page: number = 1,
    postsPerPage: number = 5
  ): Promise<{
    posts: BlogPost[];
    totalPages: number;
    currentPage: number;
    allPosts: BlogPost[];
  }> {
    const database = process.env.NOTION_DATABASE_ID || "";

    let allPosts: BlogPost[] = [];
    let hasMore = true;
    let nextCursor: string | undefined;

    while (hasMore) {
      const response = await this.client.databases.query({
        database_id: database,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: "Created",
            direction: "descending",
          },
        ],
        page_size: 100,
        start_cursor: nextCursor,
      });

      allPosts = allPosts.concat(
        response.results.map(NotionService.pageToBlogTransformer)
      );
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }

    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalPages: totalPages,
      currentPage: currentPage,
      allPosts,
    };
  }

  async getProjectPosts(
    page: number = 1,
    postsPerPage: number = 6
  ): Promise<{
    posts: ProjectPost[];
    totalPages: number;
    currentPage: number;
    allPosts: ProjectPost[];
  }> {
    const database = process.env.NOTION_DATABASE_ID || "";

    let allPosts: ProjectPost[] = [];
    let hasMore = true;
    let nextCursor: string | undefined;

    while (hasMore) {
      const response = await this.client.databases.query({
        database_id: database,
        filter: {
          property: "Project",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: "Created",
            direction: "descending",
          },
        ],
        page_size: 100,
        start_cursor: nextCursor,
      });

      allPosts = allPosts.concat(
        response.results.map(NotionService.pageToProjectTransformer)
      );
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }

    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalPages: totalPages,
      currentPage: currentPage,
      allPosts,
    };
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    let post, markdown, nextUrl, prevUrl;

    const database = process.env.NOTION_DATABASE_ID || "";

    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    if (!response.results[0]) {
      throw "No results available!";
    }

    const page = response.results[0];
    const mdBlock = await this.n2m.pageToMarkdown(page.id);
    markdown = this.n2m.toMarkdownString(mdBlock);
    markdown = markdown.parent;
    post = NotionService.pageToBlogTransformer(page);

    return {
      post,
      markdown,
    };
  }

  private static pageToBlogTransformer(page: any): BlogPost {
    let date,
      cover = page.cover;

    if (cover) {
      switch (cover.type) {
        case "file":
          cover = page.cover.file;
          break;
        case "external":
          cover = page.cover.external;
          break;
        default:
          cover = null;
      }
    }

    date = formatDateTime(page.properties.Created.date.start);

    return {
      id: page.id,
      cover: cover,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: date,
      slug: page.properties.Slug.formula.string,
      author: page.properties.Author.rich_text[0].plain_text,
    };
  }

  private static pageToProjectTransformer(page: any): ProjectPost {
    let date,
      cover = page.cover;

    if (cover) {
      switch (cover.type) {
        case "file":
          cover = page.cover.file;
          break;
        case "external":
          cover = page.cover.external;
          break;
        default:
          cover = null;
      }
    }

    date = formatDateTime(page.properties.Created.date.start);

    return {
      id: page.id,
      cover: cover,
      title: page.properties.Name.title[0].plain_text,
      date: date,
      slug: page.properties.Slug.formula.string,
      author: page.properties.Author.rich_text[0].plain_text,
      link: page.properties.Link.rich_text[0].plain_text,
    };
  }
}
