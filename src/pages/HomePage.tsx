import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import profilePhoto from "../../assets/profile.png";

type HomePageProps = {
  onOpenConsult: () => void;
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько длится развод через суд?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Срок зависит от споров и загрузки суда. На консультации оценим вашу ситуацию и прогноз по этапам.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли развестись без присутствия в суде?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "В ряде случаев возможны упрощённые процедуры. Точный ответ зависит от оснований и наличия споров.",
      },
    },
  ],
};

export function HomePage({ onOpenConsult }: HomePageProps) {
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <>
      <PageMeta
        title={`${site.lawyerName} — семейный юрист в Барнауле`}
        description="Быстрое и этичное решение бракоразводных процессов в Барнауле. Конфиденциально, с опорой на опыт и понятные шаги."
        path="/"
      />
      <JsonLd data={faqLd} />

      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-brand-light text-white">
        <motion.div
          style={{ y: parallax }}
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-white/80">
              Барнаул · семейное право
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Решение бракоразводных процессов без лишнего стресса
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
              Помогу выстроить стратегию: развод, имущество, алименты — с акцентом на конфиденциальность
              и понятный план действий.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenConsult}
                className="rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-brand shadow-lg transition hover:bg-sand-100"
              >
                Записаться на консультацию
              </button>
              <Link
                to="/services"
                className="rounded-xl border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Услуги и цены
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl ring-1 ring-white/10">
              <img
                src={profilePhoto}
                alt={`${site.lawyerName} — семейный юрист, Барнаул`}
                className="aspect-[4/5] h-auto w-full object-cover object-[center_20%]"
                width={640}
                height={800}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-neutral-900">Почему обо мне</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Конфиденциальность",
              d: "Аккуратная коммуникация и бережное отношение к деталям вашей ситуации.",
            },
            {
              t: "Опыт 10+ лет",
              d: "Практика в семейных спорах: от простых случаев до конфликтных сценариев.",
            },
            {
              t: "Понятные шаги",
              d: "Объясняю процесс простым языком: что будет дальше и какие есть варианты.",
            },
            {
              t: "Фокус на результате",
              d: "Стратегия под ваши цели: скорость, безопасность детей, справедливое разделение.",
            },
          ].map((item) => (
            <motion.article
              key={item.t}
              className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-lg font-semibold text-neutral-900">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.d}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-sand-200 bg-sand-100/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Нужна ясность уже сейчас?</h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600">
              Короткий созвон помогает понять, какие документы собрать и какой путь развода вам
              подходит.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsult}
            className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-dark"
          >
            Выбрать время
          </button>
        </div>
      </section>
    </>
  );
}
