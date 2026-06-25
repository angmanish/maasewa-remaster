import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import JsonLd from "@/components/JsonLd";

// Pre-generate routes at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found | Maa Sewa Healthcare" };

  const BASE_URL = "https://maasewahealthcare.com";

  return {
    title: `${post.title} | Maa Sewa Health Blog`,
    description: post.metaDescription,
    authors: [{ name: post.author }],
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      siteName: "Maa Sewa Healthcare",
      locale: "en_IN",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@MaasewaHealth",
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const BASE_URL = "https://maasewahealthcare.com";

  // Full Article schema for Google News, Knowledge Panels, and AI citations
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: {
      "@type": "ImageObject",
      url: post.image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.author,
      worksFor: {
        "@type": "MedicalOrganization",
        name: "Maa Sewa Healthcare",
        url: BASE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Maa Sewa Healthcare",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article", "h1", "p"],
    },
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      name: "Maa Sewa Healthcare Health Blog",
      url: `${BASE_URL}/blog`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      {/* Article Header */}
      <header className="bg-slate-50 pt-16 pb-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-semibold">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-slate-800 line-clamp-1">{post.title}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5 text-primary">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>By {post.author}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12">
        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-16 border-4 border-white bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
          {/* Article Body */}
          <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-primary-dark">
            {/* Very simple markdown renderer since we don't have react-markdown installed. We assume HTML-like content or standard paragraphs. */}
            <div className="text-slate-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ 
               __html: post.content
                 .replace(/## (.*)/g, '<h2 class="text-3xl font-black mt-12 mb-6 text-slate-900">$1</h2>')
                 .replace(/### (.*)/g, '<h3 class="text-xl font-bold mt-8 mb-4 text-slate-800">$1</h3>')
                 .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                 .replace(/- (.*)/g, '<li class="ml-4 mb-2">$1</li>')
            }} />
          </article>

          {/* Sidebar / Social Share */}
          <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" /> Share this Guide
              </h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-sky-500 hover:bg-sky-50 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl text-white shadow-xl">
               <h3 className="text-xl font-black mb-3">Need Professional Care at Home?</h3>
               <p className="text-sm text-sky-100 mb-6 leading-relaxed">
                 Our ICU-trained nurses are available 24/7 across Pune and Mumbai.
               </p>
               <Link href="/contact" className="block w-full py-3 bg-white text-blue-600 text-center rounded-xl font-bold hover:shadow-lg transition-all">
                 Contact Us Now
               </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
