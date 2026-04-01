import { Link, Navigate, useParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { getPostBySlug } from "@/data/blogPosts";
import { formatRuLongDate } from "@/lib/formatDate";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const dateLabel = formatRuLongDate(post.publishedAt);
  const url = `/blog/${post.slug}`;

  return (
    <>
      <PageMeta title={`${post.title} — блог`} description={post.excerpt} path={url} />

      <article className="mx-auto max-w-3xl px-4 py-14">
        <nav className="text-sm text-neutral-500">
          <Link to="/blog" className="font-medium text-brand hover:underline">
            ← Блог
          </Link>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            {dateLabel} · читать ~{post.readMinutes} мин
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
        </header>

        <div className="mt-10 max-w-none">
          {post.sections.map((section, i) => (
            <section key={i} className={i > 0 ? "mt-8" : ""}>
              {section.heading ? (
                <h2 className="text-xl font-semibold text-neutral-900">{section.heading}</h2>
              ) : null}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-12 rounded-2xl border border-sand-200 bg-sand-50/80 p-5 text-sm text-neutral-600">
          Материал носит ознакомительный характер. Для оценки вашей ситуации запишитесь на{" "}
          <Link to="/contact" className="font-medium text-brand hover:underline">
            консультацию
          </Link>
          .
        </footer>
      </article>
    </>
  );
}
