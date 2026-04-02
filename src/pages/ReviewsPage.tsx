import { motion } from "framer-motion";
import { PageMeta } from "@/components/PageMeta";
import { site } from "@/config/site";

const cases = [
  {
    title: "Развод + ипотечная квартира",
    summary:
      "Стороны спорили о долях и дальнейших платежах. Собрали пакет, выстроили переговоры, согласовали условия без затягивания.",
    result: "Соглашение + регистрация условий",
  },
  {
    title: "Алименты и расходы на ребёнка",
    summary:
      "Нужно было корректно зафиксировать ежемесячные выплаты и дополнительные статьи расходов.",
    result: "Решение суда / соглашение (анонимно)",
  },
  {
    title: "Быстрый развод при отсутствии споров",
    summary: "Подготовка заявления и сопровождение процедуры, минимум бюрократии для клиента.",
    result: "Завершено в согласованные сроки",
  },
];

export function ReviewsPage() {
  return (
    <>
      <PageMeta
        title={`Отзывы и кейсы — ${site.lawyerName}`}
        description="Анонимизированные примеры кейсов по разводу, имуществу и алиментам."
        path="/reviews"
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold text-neutral-900">Отзывы и кейсы</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h2 className="text-lg font-semibold text-neutral-900">{c.title}</h2>
              <p className="mt-3 text-sm text-neutral-600">{c.summary}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">
                Итог: {c.result}
              </p>
            </motion.article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-sand-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Словами клиентов</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-xl border-l-4 border-brand bg-sand-50/80 p-5 text-sm leading-relaxed text-neutral-700">
              «Говорили спокойно, без давления. Понятно объяснили этапы и риски — стало легче принять
              решение.»
              <footer className="mt-3 text-xs font-medium text-neutral-500">Клиентка, раздел имущества</footer>
            </blockquote>
            <blockquote className="rounded-xl border-l-4 border-brand bg-sand-50/80 p-5 text-sm leading-relaxed text-neutral-700">
              «Быстро собрали документы и выдержали переговоры с второй стороной. Сроки совпали с тем,
              что озвучили в начале.»
              <footer className="mt-3 text-xs font-medium text-neutral-500">Клиент, алименты</footer>
            </blockquote>
          </div>
        </section>
      </div>
    </>
  );
}
