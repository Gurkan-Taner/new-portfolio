import { SectionTitle } from "@/components/section-title";
import { BlogCard } from "@/components/blog/blog-card";
import { DATA_BLOG } from "@/data/blog-posts";
import LenisScroller from "@/components/lenis-scroller";
import Footer from "@/components/sections/footer";

export default function BlogPage() {
  return (
    <LenisScroller>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <main className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <header className="mb-20">
            <SectionTitle
              title="Journal Technique"
              subtitle="Partage d'expériences sur le développement et la culture DevOps"
            />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA_BLOG.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </LenisScroller>
  );
}
