// uihub: siso:landing-blog-card
// Blog card: the SISO landing's own hero (eco/features/marketing/components/siso/blog/BlogCard.tsx), shown with its own data.
import BlogCard from "../eco/features/marketing/components/siso/blog/BlogCard"
import { posts } from "../eco/features/marketing/components/siso/blog/posts"

export default function Demo() {
  return <div className="max-w-md"><BlogCard post={posts[0]} featured /></div>
}
