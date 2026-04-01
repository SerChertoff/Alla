import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageMeta } from "@/components/PageMeta";

const services = [
  {
    title: "Развод через ЗАГС / суд",
    priceFrom: 15000,
    text: "Подготовка документов, сопровождение процедуры, оценка рисков и сроков.",
  },
  {
    title: "Раздел имущества",
    priceFrom: 25000,
    text: "Ипотека, доли, споры о недвижимости — стратегия переговоров и судебной защиты.",
  },
  {
    title: "Алименты",
    priceFrom: 12000,
    text: "Взыскание, снижение, индексация, изменение порядка взыскания.",
  },
];

export function ServicesPage() {
  const [dispute, setDispute] = useState<"low" | "mid" | "high">("low");
  const [items, setItems] = useState(1);

  const estimate = useMemo(() => {
    const base = services.reduce((s, x) => s + x.priceFrom, 0) * 0.35;
    const mult = dispute === "low" ? 1 : dispute === "mid" ? 1.35 : 1.75;
    const bundle = Math.round(base * mult * Math.min(3, items));
    return { min: Math.max(12000, Math.round(bundle * 0.85)), max: Math.round(bundle * 1.25) };
  }, [dispute, items]);

  return (
    <>
      <PageMeta
        title="Услуги и цены — Алла Иванова"
        description="Развод, раздел имущества, алименты в Барнауле. Ориентиры по стоимости и примерный калькулятор."
        path="/services"
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold text-neutral-900">Услуги</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Цифры ниже — ориентир «от». Итоговая стоимость зависит от сложности, сроков и объёма
          сопровождения.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-lg font-semibold text-neutral-900">{s.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
              <p className="mt-4 text-sm font-semibold text-brand">
                от {s.priceFrom.toLocaleString("ru-RU")} ₽
              </p>
            </motion.article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-sand-200 bg-sand-50 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-neutral-900">Калькулятор примерной стоимости</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Упрощённая модель для первичного понимания. На консультации дам точную смету под ваш кейс.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-neutral-800">Уровень спора</label>
              <select
                className="mt-2 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm"
                value={dispute}
                onChange={(e) => setDispute(e.target.value as typeof dispute)}
              >
                <option value="low">Минимальный (согласие сторон)</option>
                <option value="mid">Средний (частичные споры)</option>
                <option value="high">Высокий (суд, экспертизы, иски)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-800">
                Сколько направлений подключаем (1–3)
              </label>
              <input
                type="range"
                min={1}
                max={3}
                value={items}
                onChange={(e) => setItems(Number(e.target.value))}
                className="mt-4 w-full accent-brand"
              />
              <p className="mt-2 text-xs text-neutral-500">Выбрано направлений: {items}</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-5 shadow-inner">
            <p className="text-sm text-neutral-600">Ориентировочный диапазон</p>
            <p className="mt-2 text-2xl font-bold text-neutral-900">
              {estimate.min.toLocaleString("ru-RU")} — {estimate.max.toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
