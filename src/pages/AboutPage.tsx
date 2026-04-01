import { motion } from "framer-motion";
import { PageMeta } from "@/components/PageMeta";
import { site } from "@/config/site";
import { LawyerPortrait } from "@/components/LawyerPortrait";

export function AboutPage() {
  return (
    <>
      <PageMeta
        title={`О юристе — ${site.lawyerName}`}
        description="Образование, опыт и подход к семейным делам в Барнауле."
        path="/about"
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LawyerPortrait variant="about" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">{site.lawyerName}</h1>
            <p className="mt-2 text-sm font-medium text-brand">Семейный юрист · Барнаул</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
              <p>
                Я сопровождаю клиентов в бракоразводных процессах и связанных вопросах: раздел
                имущества, алименты, взаимодействие с оппонентом и государственными органами.
              </p>
              <p>
                <span className="font-semibold text-neutral-900">Образование:</span> высшее юридическое
                (Алтайский государственный университет), программы повышения квалификации по гражданскому
                и семейному праву.
              </p>
              <p>
                <span className="font-semibold text-neutral-900">Опыт:</span> более 10 лет сопровождения
                семейных споров: разводы, раздел имущества, алименты, взаимодействие с оппонентами и
                государственными органами.
              </p>
              <blockquote className="rounded-xl border-l-4 border-brand bg-white p-4 text-neutral-800 shadow-sm">
                Помогу пройти этот этап с минимальными потерями — с уважением к вашим границам и
                спокойным темпом, который вы выбираете сами.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
