// uihub: siso:landing-blog-header
// Blog header: the SISO landing's own hero (eco/features/marketing/components/siso/blog/BlogHeader.tsx), shown with its own data.
import BlogHeader from "../eco/features/marketing/components/siso/blog/BlogHeader"
import { posts } from "../eco/features/marketing/components/siso/blog/posts"
import { postTopic } from "../eco/features/marketing/components/siso/blog/topics"

const p = posts[0]

export default function Demo() {
  return <BlogHeader title={p.title} topic={postTopic(p)} slug={p.slug} variant="hero" eager />
}
