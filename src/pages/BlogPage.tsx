import BlogPostCard from "../components/blog/BlogPostCard";
import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";

const blogPosts = [
  {
    slug: "digital-forensics-in-maritime-disputes",
    title: "Digital Forensics in Maritime Disputes",
    date: "Oct 2, 2025",
    summary: "How satellite imagery, AIS tracking data, and open-source intelligence (OSINT) are used to document and verify events in the WPS.",
  },
  // Add more posts...
];

const BlogPage = () => (
  <AnimatedSection>
    <div className="container mx-auto p-4 font-mono">
      <GlitchText text="Intel Briefs" />
      <div className="mt-8 grid gap-6">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default BlogPage;
