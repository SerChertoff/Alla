import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageMeta } from "@/components/PageMeta";
import { site } from "@/config/site";
import { openContactMailto } from "@/lib/mailto";

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  email: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.string().email("Некорректный email").optional()
  ),
  message: z.string().min(10, "Коротко опишите запрос"),
});

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: FormValues) => {
    openContactMailto({
      to: site.email,
      name: data.name,
      email: data.email,
      message: data.message,
    });
  };

  return (
    <>
      <PageMeta
        title={`Контакты — ${site.lawyerName}`}
        description="Телефон, email и офис в Барнауле. Форма обратной связи."
        path="/contact"
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold text-neutral-900">Контакты</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Свяжитесь удобным способом или оставьте сообщение через форму — откроется черновик письма на
          электронную почту.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-sm text-neutral-700">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Телефон
              </p>
              <a
                className="mt-1 inline-block font-semibold text-brand hover:underline"
                href={`tel:${site.phoneTel}`}
              >
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Email</p>
              <a
                className="mt-1 inline-block font-semibold text-brand hover:underline"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Адрес</p>
              <p className="mt-1">{site.address}</p>
            </div>
            <a
              className="inline-flex rounded-lg bg-[#229ED9] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
            >
              Написать в Telegram
            </a>
          </div>

          <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Форма</h2>
            {isSubmitSuccessful ? (
              <p className="mt-4 text-sm text-neutral-700">
                Если почта не открылась, напишите на{" "}
                <a className="font-medium text-brand hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                или позвоните:{" "}
                <a className="font-medium text-brand hover:underline" href={`tel:${site.phoneTel}`}>
                  {site.phoneDisplay}
                </a>
                .
              </p>
            ) : (
              <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="c-name">
                    Имя
                  </label>
                  <input
                    id="c-name"
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="c-email">
                    Email (необязательно)
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="c-msg">
                    Сообщение
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark sm:w-auto sm:px-6"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-sand-200 shadow-sm">
          <iframe
            title="Карта — Барнаул (ориентир)"
            src={site.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="bg-sand-50 px-4 py-2 text-xs text-neutral-500">
            Ориентир на карте. Точную метку можно оформить в{" "}
            <a
              className="text-brand hover:underline"
              href="https://yandex.ru/map-constructor/"
              target="_blank"
              rel="noreferrer"
            >
              конструкторе Яндекс.Карт
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
