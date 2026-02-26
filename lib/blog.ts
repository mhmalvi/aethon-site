export type BlogPost = {
  title: string;
  description: string;
  url: string;
  date: string;
  content: string;
  categories: string[];
  tags: string[];
  image: string;
};

const BLOG_FEED_URL = "https://insights.aethonautomation.com/index.json";

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(BLOG_FEED_URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const posts: BlogPost[] = await res.json();
    return posts;
  } catch {
    return [];
  }
}
