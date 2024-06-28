export type Tag = {
  id: string;
  name: string;
  title: string;
};

export type BlogPostList = {
  results: BlogPost[];
  total_pages: number;
  next_url: string | null;
  prev_url: string | null;
};

export type BlogPost = {
  cover?: string | null;
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
  author: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};

export type TitlePageProps = {
  title: string;
  description?: string;
};
