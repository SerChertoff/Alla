import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { formatRuLongDate } from "@/lib/formatDate";
import { blogPosts } from "@/data/blogPosts";

export function BlogPage() {
  return (
    <>
      <PageMeta
        title="Блог — Алла Иванова"
        description="Статьи о разводе, имуществе и алиментах. Материалы носят ознакомительный характер."
        path="/blog"
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold text-neutral-900">Блог</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Короткие материалы о типовых вопросах семейного права. Это не юридическая консультация — для
          оценки вашей ситуации лучше записаться на встречу.
        </p>

        <ul className="mt-10 space-y-4">
          {blogPosts.map((p) => {
            const dateLabel = formatRuLongDate(p.publishedAt);
            return (
              <li key={p.slug}>
                <article className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:border-brand/25 hover:shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {dateLabel} · ~{p.readMinutes} мин
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-neutral-900">
                    <Link to={`/blog/${p.slug}`} className="hover:text-brand">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">{p.excerpt}</p>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
                  >
                    Читать статью
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
